import { ComponentChild, FunctionalComponent } from "preact";
import { Chip } from "@/components";

import "./style.scss";

export const getColor = (stack: string): string => {
  return stackColors[stack.toLowerCase()] || "text";
};

export const paintStack = (stack: string): ComponentChild => {
  return <Chip color={getColor(stack)}>{stack}</Chip>;
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
}> = ({ stack }) => {
  return <span class="stack-list">{stack.map((e) => paintStack(e))}</span>;
};
