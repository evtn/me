import { Switch } from "../Switch";
import { useState } from "preact/hooks";

import { useSettings } from "@/hooks";
import { Color } from "@/types";

import { useMobile } from "@/hooks/useMobile";
import { IconKey } from "@/icons/base";
import { Icon } from "@/icons/icon";
import { classBuilder } from "@/utils/classname";

import "./style.css";

const classname = classBuilder("settings");

export type SwitchData<T extends string> = {
    name: string;
    key: T;
    value: boolean;
    color: Color;
    shown?: boolean;
    description?: string;
    icons?: [IconKey, IconKey];
};

type SettingsBarProps<T extends string> = {
    onClick: (key: T, value: boolean) => void;
    data: SwitchData<T>[];
    title?: string;
    icons?: [IconKey, IconKey];
};
export const SettingsBar = <T extends string>(
    { onClick, data, title, icons }: SettingsBarProps<T>,
) => {
    const isMobile = useMobile();
    const [isActive, setIsActive] = useState(() => !isMobile);
    const [{ compact }] = useSettings();

    const content = data
        .filter((entry) => entry.shown !== false)
        .map((entry) => {
            return (
                <Switch
                    label={entry.name}
                    className={classname
                        .element("setting")
                        .color(entry.color)
                        .build()}
                    currentValue={entry.value}
                    onSwitch={(state: boolean) => onClick(entry.key, state)}
                    aria-label={entry.description}
                    icons={entry.icons}
                />
            );
        });

    return (
        <div className={classname.build()} data-active={isActive}>
            <button
                className={classname
                    .element("header")
                    .build(isMobile && classname.button)}
                onClick={() => isMobile && setIsActive((x) => !x)}
            >
                {compact && icons ? <Icon iconKey={icons[+isActive]} /> : title}
            </button>

            {isActive ? content : undefined}
        </div>
    );
};
