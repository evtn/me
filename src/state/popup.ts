import { atom } from "jotai";
import { ComponentChildren } from "preact";

export const popupAtom = atom<ComponentChildren>(undefined);
