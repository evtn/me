import { ComponentProps, FunctionalComponent } from "preact";
import { useRef } from "preact/hooks";

import { useSettings } from "@/hooks";
import { classBuilder } from "@/utils";

import { Icon, IconKey } from "@/icons/icon";

import "./style.css";

type SwitchProps = {
    label: string;
    onSwitch?: (state: boolean) => void;
    currentValue?: boolean;
    className?: string;
    icon?: IconKey;
} & ComponentProps<"label">;

const classname = classBuilder("switch");

export const Switch: FunctionalComponent<SwitchProps> = (
    { label, onSwitch, currentValue, className, icon, ...rest },
) => {
    let ref = useRef(null);
    const [{ compact }] = useSettings();

    return (
        <label
            {...rest}
            className={classname.build(className, classname.card)}
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
            {icon ? <Icon iconKey={icon} /> : undefined}
            {icon && compact ? undefined : (
                <p className="switch-label">{label}</p>
            )}
        </label>
    );
};
