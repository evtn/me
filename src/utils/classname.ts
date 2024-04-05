import { Color } from "@/types";

import { random } from "./random";

const classFilter = (parts: ClassNameLike[]) => {
    return parts.filter(Boolean) as Exclude<ClassNameLike, undefined>[];
};

const joiner: BuildFunc = (...args) => {
    return args
        .filter(Boolean)
        .map((x) => x?.toString())
        .join(" ");
};

type ClassData = {
    root: string;
    element?: ClassNameLike;
    modifiers: ClassNameLike[];
    additional: ClassNameLike[];
};

type ClassNameLike = { toString: () => string } | undefined;

type BuildFunc = (...args: ClassNameLike[]) => string;

type ClassBuilder = {
    build: BuildFunc;
    element: (element: ClassNameLike) => ClassBuilder;
    modify: (modifier: ClassNameLike) => ClassBuilder;
    color: (color: Color) => ClassBuilder;
    add: (additional: ClassNameLike) => {};
    card: string;
};

export const build = (data: ClassData, extra: ClassNameLike[]): string => {
    const parts = [];

    let base = data.root;

    if (data.element) {
        base = `${base}__${data.element}`;
    }

    parts.push(base);

    classFilter(data.modifiers).forEach((modifier) =>
        parts.push(`${base}_${modifier}`),
    );

    parts.push(...classFilter(data.additional));
    parts.push(...classFilter(extra));

    return parts.map((x) => x.toString()).join(" ");
};

const colors: Color[] = [
    "blue",
    "red",
    "green",
    "orange",
    "purple",
    "yellow",
    "pink",
    "cyan",
];

export const colorShiftHack = {
    shift: 0,
};

const getColor = (color: Color): Color => {
    if (color === "text") {
        return "text";
    }

    const oldIndex = colors.indexOf(color);
    const newIndex =
        ~~(
            random(colorShiftHack.shift + oldIndex) *
            colors.length *
            colorShiftHack.shift
        ) + oldIndex;

    return colors[newIndex % colors.length];
};

const classBuilderFromData = (data: ClassData): ClassBuilder => {
    return {
        build: (...extra: ClassNameLike[]) => build(data, extra),
        element: (element) =>
            classBuilderFromData({
                ...data,
                element,
            }),
        modify: (modifier) =>
            classBuilderFromData({
                ...data,
                modifiers: [...data.modifiers, modifier],
            }),
        color: (color) =>
            classBuilderFromData({
                ...data,
                additional: [...data.additional, `colored-${getColor(color)}`],
            }),
        add: (additional) =>
            classBuilderFromData({
                ...data,
                additional: [...data.additional, additional],
            }),
        card: "colored-card",
    };
};

export const classBuilder = (root: string): ClassBuilder => {
    return classBuilderFromData({
        root,
        element: undefined,
        modifiers: [],
        additional: [],
    });
};
