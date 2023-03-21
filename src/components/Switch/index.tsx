import { ComponentProps, FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import "./style.scss";

type SwitchProps = {
  label: string;
  onSwitch?: (state: boolean) => void;
  defaultState?: boolean;
  externalClassName?: string;
} & ComponentProps<"button">;

export const Switch: FunctionalComponent<SwitchProps> = ({
  label,
  onSwitch,
  defaultState,
  externalClassName,
  ...rest
}) => {
  const [state, setState] = useState<boolean>(defaultState || false);
  const className = ["switch", ...(externalClassName || "").split(" ")]
    .filter((x) => x)
    .join(" ");

  return (
    <button
      onClick={() => {
        onSwitch && onSwitch(!state);
        setState((state) => !state);
      }}
      data-active={state}
      {...rest}
      className={className}
    >
      <div className="switch__element">
        <div className="switch__element-mover" />
        <div className="switch__element-circle" />
      </div>
      <p>{label}</p>
    </button>
  );
};
