import { ComponentProps, FunctionalComponent } from "preact";

import { Color } from "@/types";
import { classBuilder } from "@/utils";

import { Icon, IconKey } from "@/icons/icon";

type PDFButtonProps = {
    color: Color;
    icon: IconKey;
    text: string;
} & ComponentProps<"button">;

const classname = classBuilder("pdf-generator");
const buttonClassName = classname.element("submit-button");

export const PDFGeneratorButton: FunctionalComponent<PDFButtonProps> = (
    { color, icon, text, className, ...rest },
) => {
    return (
        <button
            className={buttonClassName
                .color(color)
                .build(buttonClassName.card, className)}
            {...rest}
        >
            <Icon iconKey={icon} />
            {text}
        </button>
    );
};
