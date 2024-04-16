import { ComponentProps, FunctionalComponent } from "preact";
import { useRef } from "preact/hooks";

import { useSettings } from "@/hooks";
import { classBuilder } from "@/utils";

import { IconKey } from "@/icons/base";
import { Icon } from "@/icons/icon";

import "./style.css";

type SwitchProps = {
    label: string;
    onSwitch?: (state: boolean) => void;
    currentValue?: boolean;
    className?: string;
    icons?: [IconKey, IconKey];
} & Omit<ComponentProps<"label">, "icon">;

const classname = classBuilder("switch");

export const Switch: FunctionalComponent<SwitchProps> = (
    { label, onSwitch, currentValue, className, icons, ...rest },
) => {
    let ref = useRef(null);
    const [{ compact }] = useSettings();

    return (
        <label
            {...rest}
            className={classname.build(className, classname.button)}
            data-active={currentValue}
        >
            <input
                ref={ref}
                onChange={(e) => onSwitch && onSwitch(e.currentTarget.checked)}
                role="switch"
                aria-checked={currentValue}
                type="checkbox"
                checked={currentValue}
            />
            {icons ? <Icon iconKey={icons[+!!currentValue]} /> : undefined}
            {icons && compact ? undefined : (
                <p className="switch-label">{label}</p>
            )}
        </label>
    );
};
