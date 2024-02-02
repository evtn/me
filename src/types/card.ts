import { Color } from "@/types";

import { IconKey } from "@/icons/icon";
import { Description } from "@/utils/formatter";

export const stackColors: Record<StackKey, Color> = {
    typescript: "blue",
    javascript: "orange",
    python: "blue",
    react: "yellow",
    preact: "purple",
    reactNative: "cyan",
    jotai: "text",
};

export const stackNames = {
    python: "Python",
    javascript: "JavaScript",
    typescript: "TypeScript",
    react: "React",
    preact: "Preact",
    reactNative: "React Native",
    jotai: "Jotai",
} as const;

export type StackKey = keyof typeof stackNames;

export const cardTypes = {
    position: "Position",
    project: "Project",
    stack: "Stack",
    history: "History",
} as const;

export const cardTypeKeys = Object.keys(cardTypes) as CardType[];

export type CardType = keyof typeof cardTypes;

export type DateTuple = [number, number, number];

export type CardData = {
    continuous?: boolean;
    description: Description;
    endDate?: DateTuple;
    href?: `https://${string}`;
    icon: IconKey;
    name: string;
    repo?: `${string}/${string}`;
    stack?: StackKey[];
    startDate?: DateTuple;
    type?: CardType;
    version?: number;
    where?: string;
    subtitle?: string;
};
