import { useMemo } from "preact/hooks";

import { DateTuple } from "@/types/card";
import { isFuture } from "@/utils/date";

import { useEntries } from "./useEntries";
import { cardToSlug } from "./useRouting";

const getDTValue = (dt: DateTuple): number => {
    return (dt[0] * 12 + dt[1]) * 31 + dt[2];
};

export const useTimeline = () => {
    const entries = useEntries();
    const sortedEntries = useMemo(
        () =>
            [...entries].sort((a, b) => {
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
            }),
        [entries],
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
