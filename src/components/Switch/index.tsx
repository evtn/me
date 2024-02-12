import { ComponentProps, FunctionalComponent } from "preact";
import { useRef } from "preact/hooks";

import { classBuilder } from "@/utils";

import "./style.css";

type SwitchProps = {
    label: string;
    onSwitch?: (state: boolean) => void;
    currentValue?: boolean;
    className?: string;
} & ComponentProps<"label">;

const classname = classBuilder("switch");

export const Switch: FunctionalComponent<SwitchProps> = (
    { label, onSwitch, currentValue, className, ...rest },
) => {
    let ref = useRef(null);

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
            <p className="switch-label">{label}</p>
        </label>
    );
};
