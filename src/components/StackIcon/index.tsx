import { FunctionalComponent } from "preact";

import { Icon } from "@/icons";
import { classBuilder } from "@/utils";

import { StackKey, stackColors, stackNames } from "@/types/card";

import "./style.css";

type StackIconProps = {
    iconKey: StackKey;
};

const classname = classBuilder("stack-icon");

export const StackIcon: FunctionalComponent<StackIconProps> = ({ iconKey }) => {
    return (
        <div
            className={classname.color(stackColors[iconKey]).build()}
            data-key={iconKey}
            aria-label={stackNames[iconKey]}
        >
            <Icon iconKey={iconKey} />
        </div>
    );
};
