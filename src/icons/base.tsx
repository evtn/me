import { FunctionalComponent } from "preact";

export type IconProps = { className?: string; size?: number };
export type IconComponent = FunctionalComponent<IconProps>;

export const iconKeys = [
    "at",
    "briefcase",
    "briefcaseOff",
    "bulb",
    "bulbOff",
    "calendar",
    "calendarOff",
    "chevrondoubleright",
    "circle",
    "code",
    "colors",
    "colorsOff",
    "contrast",
    "contrastOff",
    "copy",
    "copyCheck",
    "desktop",
    "dollar",
    "download",
    "earth",
    "epam",
    "expand",
    "external",
    "file",
    "filter",
    "github",
    "gitmerge",
    "image",
    "intetics",
    "javascript",
    "jotai",
    "kartuli",
    "link",
    "linkedin",
    "locate",
    "location",
    "logo",
    "lowercase",
    "mcc",
    "minimize",
    "monospace",
    "moon",
    "normalcase",
    "normalsort",
    "package",
    "packageOff",
    "pdf",
    "plane",
    "play",
    "plus",
    "preact",
    "proportional",
    "python",
    "react",
    "reactNative",
    "refreshalt",
    "reversedsort",
    "rgx",
    "settings",
    "settingsOff",
    "share",
    "snow",
    "source",
    "stack",
    "stackOff",
    "sunglasses",
    "tab",
    "telegram",
    "typescript",
    "users",
    "wrongReceipt",
    "x",
] as const;

export type IconKey = (typeof iconKeys)[number];
export type SwitchableIcon<T extends IconKey> = T extends IconKey
    ? `${T}Off` extends IconKey
        ? T
        : never
    : never;

export const iconOff = (key: SwitchableIcon<IconKey>): [IconKey, IconKey] => {
    return [`${key}Off`, key];
};
