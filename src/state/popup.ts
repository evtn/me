import { atom } from "jotai";
import { ComponentChildren } from "preact";

import { Color } from "@/types";

export const popupAtom = atom<ComponentChildren>(undefined);
