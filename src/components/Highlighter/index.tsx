import { useAtom } from "jotai";
import { FunctionalComponent } from "preact";
import { useMemo } from "preact/hooks";

import { classBuilder } from "@/utils";

import { getCardColor } from "@/components/Card/getColor";
import { renderTitle } from "@/components/Card/title";
import { gotoCard } from "@/hooks/useRouting";
import { useTimeline } from "@/hooks/useTimeline";
import { timelineFiltersAtom } from "@/state/timeline";
import { CardData } from "@/types/card";
import { TimelineLink, format } from "@/utils/formatter";

const linkClassName = classBuilder("link");

export const Highlighter: FunctionalComponent<TimelineLink> = (
    { content, filter, color },
) => {
    const { sortedEntries, futureEdge } = useTimeline();
    const [filters, setFilters] = useAtom(timelineFiltersAtom);
    const isCard = window.location.pathname.includes("timeline");

    let highlightIndex = useMemo(
        () =>
            sortedEntries.findIndex((entry) => {
                for (const key of Object.keys(filter)) {
                    const keyHack = key as keyof CardData;
                    if (entry[keyHack] != filter[keyHack]) {
                        return false;
                    }
                }
                return true;
            }),
        [sortedEntries, filter],
    );
    const cardType = sortedEntries[highlightIndex].type || "project";
    const cardVisible = filters[cardType];

    const highlightBase = () => {
        const index = highlightIndex + +(futureEdge <= highlightIndex);
        const timelineElement = document.querySelector(".timeline")!;

        const child = timelineElement.children[index] as HTMLDivElement;

        child.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });

        child.classList.add("card-highlighted");

        const onAnimationEnd = () => {
            child.classList.remove("card-highlighted");
            child.removeEventListener("animationend", onAnimationEnd);
        };

        child.addEventListener("animationend", onAnimationEnd);
    };

    const highlight = () => {
        if (isCard) {
            gotoCard(sortedEntries[highlightIndex]);
            return;
        }

        if (!cardVisible) {
            setFilters(cardType, true);
            setTimeout(highlightBase, 500);
            return;
        }

        highlightBase();
    };

    const entry = sortedEntries[highlightIndex];
    const cardTitle = renderTitle(entry);

    if (!content) {
        content = cardTitle;
    }

    return (
        <a
            className={linkClassName
                .color(color || getCardColor(entry.type))
                .build(linkClassName.card)}
            onClick={highlight}
            aria-label={`${
                cardVisible ? "" : "(filtered) "
            }Linked card: ${cardTitle}`}
            data-visible={cardVisible}
        >
            <span>{format(content)}</span>
        </a>
    );
};
