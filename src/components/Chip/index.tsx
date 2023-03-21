import { useAtom } from "jotai";
import { FunctionalComponent } from "preact";
import { colorfulAtom } from "../../state/colorful";
import "./style.scss";

export const Chip: FunctionalComponent<{ color: string; filled: boolean }> = ({
  color,
  children,
  filled,
}) => {
  const [isColorful] = useAtom(colorfulAtom);

  if (!isColorful) {
    return <>{children}</>;
  }

  return (
    <span className={`chip chip-${color}`} is-filled={filled}>
      {children}
    </span>
  );
};
