import { getCardColor } from "../Card/getColor";
import { Getter, Setter, atom, useAtom, useSetAtom } from "jotai";
import { FunctionalComponent } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";

import { useSettings } from "@/hooks";
import { Icon } from "@/icons";
import { Color } from "@/types";
import { classBuilder } from "@/utils";

import { useTheme } from "@/hooks/useTheme";
import { IconKey } from "@/icons/icon";
import { iconList } from "@/icons/iconPack";
import { settingsDataBase } from "@/state/settings";
import { CardType, cardTypeKeys, cardTypes } from "@/types/card";

import "./style.css";

import { PDFGeneratorButton, PDFGeneratorLink } from "./button";
import { ConfigSwitch } from "./configSwitch";
import { convert } from "./converter";
import { PDFSection } from "./section";

export const classname = classBuilder("pdf-generator");
const section = classname.element("section");
const configBar = classname.element("config-bar");

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
    reversed: boolean;
    hide_compensation: boolean;
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
const nonViableIcons: IconKey[] = [
    "epam",
    "intetics",
    "javascript",
    "jotai",
    "kartuli",
    "logo",
    "mcc",
    "preact",
    "proportional",
    "python",
    "react",
    "reactNative",
    "rgx",
    "typescript",
];
const viableIcons: IconKey[] = (Object.keys(iconList) as IconKey[]).filter(
    (x) => !nonViableIcons.includes(x),
);

export const PDFGenerator: FunctionalComponent = () => {
    const initPdfSettings = useSetAtom(pdfSettingsAtomBase);
    const [pdfSettings, setPdfSettings] = useAtom(pdfSettingsAtom);
    const [compensationError, setCompensationError] = useState(false);
    const [format, setFormat] = useState("pdf");
    const [preview, setPreview] = useState(false);
    const [settings] = useSettings();
    const theme = useTheme();
    const [copied, setCopied] = useState(false);
    const [currentIcon, setIcon] = useState<IconKey>("file");

    useEffect(() => {
        const interval = setInterval(() => {
            const iconKey =
                viableIcons[Math.floor(Math.random() * viableIcons.length)];
            setIcon(iconKey);
        }, 1000);

        return () => {
            initPdfSettings(undefined);
            clearInterval(interval);
        };
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
                reversed: settings.reversed,
                hide_compensation: false,
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
                onClick={() => {
                    navigator?.clipboard?.writeText?.(link);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                }}
                text="Copy URL"
                icon={copied ? "copyCheck" : "copy"}
                color="green"
            />

            {isShareAvailable ? (
                <PDFGeneratorButton
                    onClick={() => navigator.share(shareData)}
                    text="Share"
                    icon="share"
                    color="orange"
                />
            ) : undefined}

            <PDFGeneratorLink
                download={pdfSettings.filename}
                href={link}
                text={`Download ${format.toUpperCase()}`}
                icon="download"
                color="blue"
            />
        </div>
    );

    const heading = [
        <h2>
            <div aria-label={`This is ${currentIcon}`}>
                <Icon iconKey={currentIcon} />
            </div>
            CV PDF Builder
        </h2>,
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
                .build(
                    compensationError && "invalid",
                    pdfSettings.hide_compensation && "hidden",
                )}
        >
            <p>
                Compensation
                <span className="transparent">, $/month, gross</span>
            </p>
            <div className={configBar.build()}>
                <div
                    className={classBuilder("text-field-wrapper").build(
                        classname.card,
                    )}
                >
                    <Icon
                        iconKey={compensationError ? "wrongReceipt" : "dollar"}
                    />
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="\d{5,}|[3-9]\d{3}"
                        title="an integer more than 3000"
                        value={pdfSettings.compensation}
                        className={classname.element("text-field").build()}
                        onInput={(e) => {
                            const validity = e.currentTarget.validity;
                            setPdfSettings(
                                "compensation",
                                e.currentTarget.value,
                            );
                            setCompensationError(!validity.valid);
                        }}
                        required
                    />
                </div>
                <ConfigSwitch
                    label="Do not include in CV"
                    configKey="hide_compensation"
                    color="green"
                    value={pdfSettings.hide_compensation}
                    description="Hide compensation value from the PDF"
                    icon={
                        pdfSettings.hide_compensation
                            ? "wrongReceipt"
                            : "dollar"
                    }
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
                    icon: pdfSettings.light ? "sunglasses" : "moon",
                },
                {
                    label: "High Contrast",
                    configKey: "contrast",
                    color: "red",
                    value: pdfSettings.contrast,
                    description: settingsDataBase.colors.description,
                    icon: pdfSettings.contrast ? "contrast" : "contrastOff",
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

    const sectionIcons = {
        position: "briefcase",
        project: "package",
        stack: "stack",
        history: "calendar",
    } as const;

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
                key,
                description: `Include ${key} section in the document`,
                icon: sections.includes(key)
                    ? sectionIcons[key]
                    : `${sectionIcons[key]}Off`,
            }))}
            warning={
                sections.length < 1 && !pdfSettings.compact
                    ? "When you exclude all sections you get the ultra-compact layout"
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
                    icon: pdfSettings.monospace ? "monospace" : "proportional",
                },
                {
                    label: "Lowercase",
                    configKey: "lowercase",
                    color: "blue",
                    value: pdfSettings.lowercase,
                    description: settingsDataBase.lowercase.description,
                    icon: pdfSettings.lowercase ? "lowercase" : "normalcase",
                },
                {
                    label: "Colorful",
                    configKey: "card_colors",
                    color: "cyan",
                    value: pdfSettings.card_colors,
                    description: settingsDataBase.colorful.description,
                    icon: pdfSettings.card_colors ? "colors" : "colorsOff",
                },
                {
                    label: "Plans",
                    configKey: "plans",
                    color: "pink",
                    value: pdfSettings.plans,
                    description: "Include planned cards",
                    icon: pdfSettings.plans ? "calendar" : "calendarOff",
                },
                {
                    label: "Configurable",
                    configKey: "configurable",
                    color: "purple",
                    value: pdfSettings.configurable,
                    description: "Include a link to this builder",
                    icon: pdfSettings.configurable ? "settings" : "settingsOff",
                },
                {
                    label: "Reversed",
                    configKey: "reversed",
                    color: "purple",
                    value: pdfSettings.reversed,
                    description: "Reverse the order",
                    icon: pdfSettings.reversed ? "reversedsort" : "normalsort",
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
                    icon: "pdf",
                },
                {
                    label: "PNG",
                    setter: setFormat,
                    configKey: "png",
                    color: "green",
                    value: format == "png",
                    icon: "image",
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
                <Icon iconKey="file" />
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
