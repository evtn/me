import { classname, pdfSettingsAtom } from ".";
import { useSetAtom } from "jotai";
import { FunctionalComponent } from "preact";

import { Switch } from "@/components";
import { Color } from "@/types";

import { IconKey } from "@/icons/base";

export type ConfigSwitchSetter = (key: any, value: boolean) => void;

export type ConfigSwitchProps = {
    configKey: any;
    setter?: ConfigSwitchSetter;
    label: string;
    color: Color;
    value: boolean;
    active?: boolean;
    description?: string;
    icons?: [IconKey, IconKey];
};

export const ConfigSwitch: FunctionalComponent<ConfigSwitchProps> = (
    { configKey, setter, label, color, value, active, description, icons },
) => {
    const setPDFSettings = useSetAtom(pdfSettingsAtom);
    if (active === undefined) {
        active = value;
    }

    const switchSetter = (setter || setPDFSettings) as ConfigSwitchSetter;

    return (
        <Switch
            label={label}
            icons={icons}
            currentValue={active}
            onSwitch={() => switchSetter(configKey, !value)}
            className={classname.element("switch").color(color).build()}
            aria-label={description}
        />
    );
};
