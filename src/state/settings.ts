import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type Settings = Record<SettingKey, boolean>;

const colorsAtom = atomWithStorage<boolean>("colors", true);
const lowercaseAtom = atomWithStorage<boolean>("lowercase", true);
const monospaceAtom = atomWithStorage<boolean>("monospace", true);
const neonAtom = atomWithStorage<boolean>("neon", false);

export type SettingKey = keyof typeof atoms;

const atoms = {
    Colors: colorsAtom,
    Lowercase: lowercaseAtom,
    Monospace: monospaceAtom,
    Neon: neonAtom,
};

export const settingsAtom = atom(
    (get) => {
        // @ts-ignore
        let result: Settings = {};

        Object.entries(atoms).forEach(([key, atom]) => {
            result[key as SettingKey] = get(atom);
        });
        return result;
    },
    (_, set, key: SettingKey, value: boolean) => {
        set(atoms[key], value);
    },
);
