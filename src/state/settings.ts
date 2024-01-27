import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type Settings = Record<string, boolean>;

const colorsAtom = atomWithStorage<boolean>("colors", true);
const lowercaseAtom = atomWithStorage<boolean>("lowercase", true);
const monospaceAtom = atomWithStorage<boolean>("monospace", true);
const neonAtom = atomWithStorage<boolean>("neon", false);

const atoms = {
    Colors: colorsAtom,
    Lowercase: lowercaseAtom,
    Monospace: monospaceAtom,
    Neon: neonAtom,
};

export const settingsAtom = atom(
    (get) => {
        let result: Settings = {};

        Object.entries(atoms).forEach(([key, atom]) => {
            result[key] = get(atom);
        });
        return result;
    },
    (_, set, key: keyof typeof atoms, value: boolean) => {
        set(atoms[key], value);
    },
);
