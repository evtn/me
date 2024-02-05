import { useAtom } from "jotai";
import { useMemo } from "preact/hooks";
import { JSXInternal } from "preact/src/jsx";

import { Card } from "@/components";
import { useTimeline } from "@/hooks";
import { classBuilder } from "@/utils";

import { timelineFiltersAtom } from "@/state/timeline";

import "./style.css";

import { TimelineFilters } from "./filter";

const classname = classBuilder("timeline");

export const Timeline = () => {
    const [filters] = useAtom(timelineFiltersAtom);
    const { sortedEntries, futureEdge } = useTimeline();

    const timelinePieces: JSXInternal.Element[] = useMemo(() => {
        let futureCardsVisible = 0;
        const timelinePieces: JSXInternal.Element[] = [];

        sortedEntries.forEach((data, i) => {
            const entryType = data.type || "project";
            const cardVisible = filters[entryType];

            timelinePieces.push(
                <Card key={i} data={data} isVisible={cardVisible} />,
            );

            if (i === futureEdge) {
                timelinePieces.push(
                    <span
                        key="edge"
                        className={classBuilder("timeline-future-edge")
                            .color("text")
                            .build(classname.card)}
                    >
                        Plans
                    </span>,
                );
            }

            if (i > futureEdge && cardVisible) {
                futureCardsVisible++;
            }
        });

        if (!futureCardsVisible) {
            timelinePieces.splice(futureEdge + 1, 1);
        }

        return timelinePieces;
    }, [sortedEntries, futureEdge, filters]);

    return (
        <div
            className={classBuilder("timeline-wrapper").build("scroll-portal")}
        >
            <TimelineFilters />
            <section className={classname.build()}>{timelinePieces}</section>
        </div>
    );
};
