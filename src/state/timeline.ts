import { WritableAtom, atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { CardType, cardTypeKeys } from "@/types/card";

export type TimelineFilters = Record<CardType, boolean>;

type AtomMap = Record<CardType, WritableAtom<boolean, [boolean], void>>;

// maybe I could use Partial<...> but that seems wrong since I would actually populate all the keys.
const atoms = {} as AtomMap;

const defaultEnabled: CardType[] = ["position"];

cardTypeKeys.forEach((key) => {
    atoms[key] = atomWithStorage<boolean>(
        `timeline-filter-${key}`,
        defaultEnabled.includes(key),
    );
});

export const timelineFiltersAtom = atom(
    (get) => {
        let result = {} as TimelineFilters;

        Object.entries(atoms).forEach(([key, atom]) => {
            result[key as CardType] = get(atom);
        });

        return result;
    },
    (get, set, key: CardType, value: boolean) => {
        const currentSettings = get(timelineFiltersAtom);

        currentSettings[key] = value;

        if (
            cardTypeKeys.some(
                (otherKey) => currentSettings[otherKey as CardType],
            )
        ) {
            set(atoms[key], value);
        } else {
            cardTypeKeys.forEach((otherKey) =>
                set(atoms[otherKey as CardType], otherKey !== key),
            );
        }
    },
);
