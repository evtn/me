import { atomWithStorage } from "jotai/utils";

export type Settings = Record<string, boolean>;

export const settingsAtom = atomWithStorage<Settings>("settings", {
    Colors: true,
    Lowercase: false,
    Monospace: false,
});
