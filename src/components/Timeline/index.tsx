import { useAtom } from "jotai";
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

    const timelinePieces: JSXInternal.Element[] = [];

    sortedEntries.forEach((data, i) => {
        const entryType = data.type || "project";

        timelinePieces.push(
            <Card key={i} data={data} isVisible={filters[entryType]} />,
        );

        if (i === futureEdge) {
            timelinePieces.push(
                <span
                    key="edge"
                    className={classBuilder("timeline-future-edge").build(
                        classname.card,
                    )}
                >
                    Plans
                </span>,
            );
        }
    });

    return (
        <div
            className={classBuilder("timeline-wrapper").build("scroll-portal")}
        >
            <TimelineFilters />
            <section className={classname.build()}>{timelinePieces}</section>
        </div>
    );
};
