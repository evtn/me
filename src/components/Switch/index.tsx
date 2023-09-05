import { ComponentProps, FunctionalComponent } from "preact";
import { useRef } from "preact/hooks";
import {
  AriaSwitchProps,
  useFocusRing,
  useSwitch,
  VisuallyHidden,
} from "react-aria";
import { useToggleState } from "react-stately";
import { getClassName } from "../../utils/classname";
import "./style.scss";

type SwitchProps = {
  label: string;
  onSwitch?: (state: boolean) => void;
  currentValue?: boolean;
  className?: string;
} & ComponentProps<"label">;

export const Switch: FunctionalComponent<SwitchProps> = ({
  label,
  onSwitch,
  currentValue,
  className,
  ...rest
}) => {
  const props: AriaSwitchProps = {
    children: (
      <>
        <div className="switch__element" aria-hidden="true">
          <div className="switch__element-mover" />
          <div className="switch__element-circle" />
        </div>
        <p>{label}</p>
      </>
    ),
    onChange: onSwitch,
    isSelected: currentValue,
  };

  const state = useToggleState(props);
  let ref = useRef(null);
  const { inputProps } = useSwitch(props, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <label
      {...rest}
      data-focused={isFocusVisible}
      className={getClassName("switch", className)}
      data-active={state.isSelected}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      {props.children}
    </label>
  );
};
