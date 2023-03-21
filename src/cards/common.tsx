import { ComponentChild, FunctionalComponent } from "preact";
import { Chip } from "../components/Chip";

export const getColor = (stack: string, isColored: boolean): string => {
  return isColored ? stackColors[stack.toLowerCase()] || "green" : "text";
};

export const paintStack = (
  stack: string,
  isColored: boolean,
  filled: boolean = false
): ComponentChild => {
  return isColored ? (
    <Chip color={getColor(stack, isColored)} filled={filled}>
      {stack}
    </Chip>
  ) : (
    stack
  );
};

const stackColors: Record<string, string> = {
  typescript: "purple",
  javascript: "orange",
  python: "blue",
  react: "yellow",
  preact: "yellow",
};

export const StackList: FunctionalComponent<{
  stack: string[];
  isColored?: boolean;
  filled?: boolean;
}> = ({ stack, isColored = true, filled = false }) => {
  if (!stack.length) {
    return <></>;
  }
  return (
    <span>
      {stack.map((e, i) => {
        const element = paintStack(e, isColored, filled);
        if (i + 1 < stack.length && !filled) {
          return [element, " · "];
        }
        return element;
      })}
    </span>
  );
};
