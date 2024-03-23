import { useMemo } from "preact/hooks";

import { CardData, DateTuple } from "@/types/card";
import { isFuture } from "@/utils/date";

import { useEntries } from "./useEntries";
import { cardToSlug } from "./useRouting";
import { useSettings } from "./useSettings";

const getDTValue = (dt: DateTuple): number => {
    return (dt[0] * 12 + dt[1]) * 31 + dt[2];
};

const sortCards = (a: CardData, b: CardData, reversed: boolean) => {
    const sortBase = (a: CardData, b: CardData) => {
        const aDate = a.startDate;
        const bDate = b.startDate;

        if (aDate) {
            if (bDate) {
                return getDTValue(aDate) - getDTValue(bDate);
            }
            return -1;
        }
        if (bDate) {
            return 1;
        }
        return 0;
    };

    const result = sortBase(a, b);

    if (reversed) {
        return -result;
    }
    return result;
};

export const useTimeline = (doFetch: boolean = false) => {
    const [{ reversed }] = useSettings();
    const entries = useEntries(doFetch);
    const sortedEntries = useMemo(
        () => [...entries].sort((a, b) => sortCards(a, b, reversed)),
        [entries, reversed],
    );

    const futureEdge = useMemo(
        () =>
            sortedEntries.findIndex((entry, i) => {
                const previous = sortedEntries[i - 1];
                const date = entry.startDate;

                return (
                    isFuture(date) &&
                    !(previous && isFuture(previous.startDate))
                );
            }),
        [entries],
    );

    const slugs = useMemo(() => sortedEntries.map(cardToSlug), []);

    return {
        sortedEntries,
        futureEdge,
        slugs,
    };
};
