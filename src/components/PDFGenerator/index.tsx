import { getCardColor } from "../Card/getColor";
import { Getter, Setter, atom, useAtom, useSetAtom } from "jotai";
import { FunctionalComponent } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";

import { useSettings } from "@/hooks";
import { Icon } from "@/icons";
import { Color } from "@/types";
import { classBuilder } from "@/utils";

import { useTheme } from "@/hooks/useTheme";
import { settingsDataBase } from "@/state/settings";
import { CardType, cardTypeKeys, cardTypes } from "@/types/card";

import "./style.css";

import { PDFGeneratorButton } from "./button";
import { convert } from "./converter";
import { PDFSection } from "./section";

export const classname = classBuilder("pdf-generator");
const section = classname.element("section");

export type PDFSettings = {
    light: boolean;
    contrast: boolean;
    lowercase: boolean;
    monospace: boolean;
    sections: CardType[];
    compensation: string;
    plans: boolean;
    compact: boolean;
    filename: string;
    card_colors: boolean;
    configurable: boolean;
};

const pdfSettingsAtomBase = atom<PDFSettings | undefined>(undefined);
export const pdfSettingsAtom = atom(
    (get) => get(pdfSettingsAtomBase),
    <K extends keyof PDFSettings>(
        get: Getter,
        set: Setter,
        key: K,
        value: PDFSettings[K],
    ) => {
        const currentSettings = get(pdfSettingsAtomBase);

        if (!currentSettings) {
            return;
        }

        set(pdfSettingsAtomBase, {
            ...currentSettings,
            [key]: value,
        });
    },
);

const paramsToObject = (entries: IterableIterator<[string, any]>) => {
    const result: Record<string, any> = {};

    for (let [key, value] of entries) {
        switch (value) {
            case "True": {
                value = true;
                break;
            }
            case "False": {
                value = false;
                break;
            }
            case "None": {
                value = null;
                break;
            }
        }
        switch (key) {
            case "sections": {
                value = value
                    .slice(1, -1)
                    .split(",")
                    .map((x: string) => x.trim());
            }
        }

        result[key] = value;
    }

    if (result["theme"]) {
        result["light"] = result["theme"].includes("light");
        result["contrast"] = result["theme"].includes("contrast");
    }

    return result;
};

const currentParams = paramsToObject(
    new URLSearchParams(window.location.search.slice(1)).entries(),
);

export const PDFGenerator: FunctionalComponent = () => {
    const initPdfSettings = useSetAtom(pdfSettingsAtomBase);
    const [pdfSettings, setPdfSettings] = useAtom(pdfSettingsAtom);
    const [compensationError, setCompensationError] = useState(false);
    const [format, setFormat] = useState("pdf");
    const [preview, setPreview] = useState(false);
    const [settings] = useSettings();
    const theme = useTheme();

    useEffect(() => {
        return () => initPdfSettings(undefined);
    }, []);

    useEffect(() => {
        if (!pdfSettings) {
            initPdfSettings({
                ...theme,
                lowercase: settings.lowercase,
                monospace: settings.monospace,
                compensation: "3000",
                filename: "Dmitry_Gritsenko.pdf",
                sections: ["position", "stack"],
                plans: true,
                compact: settings.compact,
                card_colors: settings.colorful,
                configurable: true,
                ...currentParams,
            });
        }
    }, [pdfSettings]);

    const compensation = pdfSettings?.compensation;

    useEffect(() => {
        if (!compensation) {
            return;
        }
        const compensationInt = parseInt(compensation);

        if (isNaN(compensationInt) || compensationInt < 3000) {
            setCompensationError(true);
        }
    }, [compensation]);

    useEffect(() => {
        if (!pdfSettings) {
            return;
        }
        setPdfSettings(
            "filename",
            pdfSettings.filename.replace(/\.\w+$/, `.${format}`),
        );
    }, [format]);

    if (!pdfSettings) {
        return <div></div>;
    }

    const key = convert(pdfSettings);

    const link = useMemo(() => {
        const filename = pdfSettings.filename;

        return `https://evtn.me/api/${format}/${key}/${encodeURIComponent(
            filename,
        )}`;
    }, [key, pdfSettings, format]);

    const shareData = {
        url: link,
        title: pdfSettings.filename,
    };

    const isShareAvailable = navigator.canShare?.(shareData);

    const buttonSection = (
        <div
            className={section.build(
                classname.element("submit-panel").build(),
                compensationError && "disabled",
            )}
        >
            <PDFGeneratorButton
                color="purple"
                onClick={() => setPreview((x) => !x)}
                text={`${preview ? "Hide" : "Show"} preview`}
                icon="play"
            />
            <PDFGeneratorButton
                onClick={(e) => {
                    navigator?.clipboard?.writeText?.(link);
                }}
                text="Copy URL"
                icon="copy"
                color="green"
            />

            {isShareAvailable ? (
                <PDFGeneratorButton
                    onClick={(e) => {
                        e.preventDefault();
                        () => navigator.share(shareData);
                    }}
                    text="Share"
                    icon="share"
                    color="orange"
                />
            ) : undefined}

            <a href={link} download={pdfSettings.filename}>
                <PDFGeneratorButton
                    text={`Download ${format.toUpperCase()}`}
                    icon="download"
                    color="blue"
                />
            </a>
        </div>
    );

    const heading = [
        <h2>CV PDF Builder</h2>,
        <p>
            Edit the configuration as you wish, or just go further with the
            default values
        </p>,
    ];

    if (preview) {
        return (
            <div className={classname.build()}>
                {heading}
                <img src={link.replaceAll(format, "png")} />
                {buttonSection}
            </div>
        );
    }

    const compensationSection = (
        <label
            className={section
                .color(compensationError ? "red" : "green")
                .build(compensationError && "invalid")}
        >
            <p>
                Compensation
                <span className="transparent">
                    , $/month, gross, rounded to nearest 100
                </span>
            </p>
            <div
                className={classBuilder("text-field-wrapper").build(
                    classname.card,
                )}
            >
                <Icon iconKey="dollar" />
                <input
                    type="text"
                    inputMode="numeric"
                    pattern="\d{5,}|[3-9]\d{3}"
                    title="an integer more than 3000"
                    value={pdfSettings.compensation}
                    className={classname.element("text-field").build()}
                    onInput={(e) => {
                        const validity = e.currentTarget.validity;
                        console.log(validity);
                        setPdfSettings("compensation", e.currentTarget.value);
                        setCompensationError(!validity.valid);
                    }}
                    required
                />
            </div>
        </label>
    );

    const themeColor = pdfSettings.light ? "orange" : "purple";

    const themeSection = (
        <PDFSection
            color={themeColor}
            disabled={compensationError}
            heading="Theme"
            switches={[
                {
                    label: pdfSettings.light ? "Light" : "Dark",
                    active: true,
                    configKey: "light",
                    color: themeColor,
                    value: pdfSettings.light,
                    description: "Tip: if you want to print, use Light theme",
                },
                {
                    label: "High Contrast",
                    configKey: "contrast",
                    color: "red",
                    value: pdfSettings.contrast,
                    description: settingsDataBase.colors.description,
                },
            ]}
        />
    );

    const toggleSection = (sectionKey: CardType) => {
        const add = !pdfSettings.sections.includes(sectionKey);

        const newValue = [
            ...pdfSettings.sections.filter((key) => key != sectionKey),
        ];

        if (add) {
            newValue.push(sectionKey);
        }

        setPdfSettings("sections", newValue);
    };

    const sections = pdfSettings.sections;

    const sectionsSection = (
        <PDFSection
            heading={[
                "Included sections ",
                <span className="transparent">
                    (only&nbsp;full‑size&nbsp;layout)
                </span>,
            ]}
            color="blue"
            disabled={compensationError || pdfSettings.compact}
            switches={cardTypeKeys.map((key) => ({
                label: cardTypes[key],
                setter: toggleSection,
                configKey: key,
                color: getCardColor(key),
                value: sections.includes(key),
                key: key,
                description: `Include ${key} section in the document`,
            }))}
            warning={
                sections.length < 1 && !pdfSettings.compact
                    ? "By excluding all sections you will get the ultra-compact layout with my contact info (includes stack anyway, sorry)"
                    : undefined
            }
        />
    );

    const layoutColors: Color[] = ["cyan", "green"];

    const layoutSection = (
        <PDFSection
            heading="Layout"
            color={layoutColors[+pdfSettings.compact]}
            disabled={compensationError}
            switches={[
                {
                    label: "Full-size",
                    setter: (key, value) => {
                        setPdfSettings(key, !value);
                        if (value) {
                            setFormat("pdf");
                        }
                    },
                    configKey: "compact",
                    color: layoutColors[0],
                    value: !pdfSettings.compact,
                    description:
                        "This will include detailed descriptions of everything",
                },
                {
                    label: "Compact",
                    configKey: "compact",
                    color: layoutColors[1],
                    value: pdfSettings.compact,
                    description:
                        "One-page layout, includes stack and positions",
                },
            ]}
        />
    );

    const otherSection = (
        <PDFSection
            color="orange"
            disabled={compensationError}
            heading="Other Settings"
            switches={[
                {
                    label: "Monospace",
                    configKey: "monospace",
                    color: "orange",
                    value: pdfSettings.monospace,
                    description: settingsDataBase.monospace.description,
                },
                {
                    label: "Lowercase",
                    configKey: "lowercase",
                    color: "blue",
                    value: pdfSettings.lowercase,
                    description: settingsDataBase.lowercase.description,
                },
                {
                    label: "Colorful",
                    configKey: "card_colors",
                    color: "cyan",
                    value: pdfSettings.card_colors,
                    description: settingsDataBase.colorful.description,
                },
                {
                    label: "Plans",
                    configKey: "plans",
                    color: "pink",
                    value: pdfSettings.plans,
                    description: "Include planned cards",
                },
                {
                    label: "Configurable",
                    configKey: "configurable",
                    color: "purple",
                    value: pdfSettings.configurable,
                    description: "Include a link to this builder",
                },
            ]}
        />
    );

    const formatSection = (
        <PDFSection
            heading={<span>File Format (only for compact&nbsp;layout)</span>}
            color="red"
            disabled={compensationError || !pdfSettings.compact}
            switches={[
                {
                    label: "PDF",
                    setter: setFormat,
                    configKey: "pdf",
                    color: "red",
                    value: format == "pdf",
                },
                {
                    label: "PNG",
                    setter: setFormat,
                    configKey: "png",
                    color: "green",
                    value: format == "png",
                },
            ]}
        />
    );

    const filenameSection = (
        <label
            className={section
                .color("text")
                .build(compensationError && "disabled")}
        >
            <p>Filename</p>
            <div
                className={classBuilder("text-field-wrapper").build(
                    classname.card,
                )}
            >
                <input
                    type="text"
                    value={pdfSettings.filename}
                    className={classname.element("text-field").build()}
                    onBlur={(e) =>
                        setPdfSettings("filename", e.currentTarget.value)
                    }
                />
            </div>
        </label>
    );

    return (
        <div className={classname.build()}>
            {heading}
            <form>
                {[
                    compensationSection,
                    themeSection,
                    layoutSection,
                    sectionsSection,
                    formatSection,
                    otherSection,
                    filenameSection,
                    buttonSection,
                ]}
            </form>
        </div>
    );
};
