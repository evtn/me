import { WritableAtom, atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { getEntries } from "@/utils";

import { colorShiftHack } from "@/utils/classname";

export type Settings = Record<SettingKey, boolean>;

export type SettingKey =
    | "contrast"
    | "lowercase"
    | "monospace"
    | "compact"
    | "colorful"
    | "neon"
    | "reversed";

type SettingsAtom = WritableAtom<boolean, [boolean], void>;

const makeSetting = <T extends SettingKey>(
    key: T,
    defaultValue: boolean = false,
): Setting => {
    const setting: Setting = {
        ...settingsDataBase[key],
        atom: atomWithStorage<boolean>(key, defaultValue),
    };

    return setting;
};

type SettingData = {
    name: string;
    description: string;
};

export const settingsDataBase: Record<SettingKey, SettingData> = {
    contrast: {
        name: "Contrast",
        description: "Get a high-contrast b&w experience",
    },
    lowercase: {
        name: "lowercase",
        description: "get rid of UPPERCASE",
    },
    monospace: {
        name: "Monospace",
        description: "Use monospace font",
    },
    compact: {
        name: "Compact",
        description: "Make everything compact",
    },
    colorful: {
        name: "Colors",
        description: "More colors!",
    },
    neon: {
        name: "Neon",
        description: "Immersive transitions and animations",
    },
    reversed: {
        name: "Reverse",
        description: "Reverse the timeline",
    },
};

type Setting = {
    atom: SettingsAtom;
} & SettingData;

export const settingsData: Record<SettingKey, Setting> = {
    contrast: makeSetting("contrast", false),
    lowercase: makeSetting("lowercase"),
    monospace: makeSetting("monospace"),
    compact: makeSetting("compact"),
    colorful: makeSetting("colorful", false),
    neon: makeSetting("neon", true),
    reversed: makeSetting("reversed", true),
};

export const settingsAtom = atom(
    (get) => {
        let result: Settings = {} as Settings;

        getEntries(settingsData).forEach(([key, atom]) => {
            result[key] = get(atom.atom);
        });

        return result;
    },
    (_, set, key: SettingKey, value: boolean) => {
        set(settingsData[key].atom, value);
    },
);

const colorShiftAtomBase = atom(0);

export const colorShiftAtom = atom(
    (get) => get(colorShiftAtomBase),
    (_, set, reset?: boolean) => {
        if (reset) {
            colorShiftHack.shift = 0;
        } else {
            colorShiftHack.shift++;
        }
        set(colorShiftAtomBase, colorShiftHack.shift);
    },
);

export const baseCompensationAtom = atom(3000);
