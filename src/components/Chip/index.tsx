import { FunctionalComponent } from "preact";
import "./style.scss";

export const Chip: FunctionalComponent<{ color: string }> = ({
  color,
  children,
}) => {
  return <span className={`chip chip-${color}`}>{children}</span>;
};
