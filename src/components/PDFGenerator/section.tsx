import { ComponentChildren, FunctionalComponent } from "preact";

import { Color } from "@/types";
import { classBuilder } from "@/utils";

import { ConfigSwitch, ConfigSwitchProps } from "./configSwitch";

type SectionProps = {
    disabled?: boolean;
    color: Color;
    switches: ConfigSwitchProps[];
    heading: ComponentChildren;
    warning?: string;
};

const classname = classBuilder("pdf-generator");
const configBar = classname.element("config-bar");

export const PDFSection: FunctionalComponent<SectionProps> = (
    { disabled, color, switches, heading, warning },
) => {
    return (
        <div
            className={classname
                .element("section")
                .color(color)
                .build(disabled && "disabled")}
        >
            <p>{heading}</p>
            <div className={configBar.build()}>
                {switches.map((switchData) => (
                    <ConfigSwitch
                        {...switchData}
                        key={`${switchData.label}-${switchData.value}`}
                    />
                ))}
            </div>
            {warning ?? (
                <p className={classname.element("warning").build()}>
                    {warning}
                </p>
            )}
        </div>
    );
};
