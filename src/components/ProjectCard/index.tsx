import { FunctionalComponent } from "preact";
import { useMemo } from "preact/hooks";

import { classBuilder } from "@/utils";

import { cardToSlug, gotoCard } from "@/hooks/useRouting";
import { useTimeline } from "@/hooks/useTimeline";
import { CardData } from "@/types/card";

import { getCardColor } from "../Card/getColor";
import { ProjectCardDescription } from "./description";
import { ProjectCardHeader } from "./header";
import "./style.css";
import { ProjectCardVersions } from "./versions";

export type ProjectCardProps = {
    data: CardData;
};

export const classname = classBuilder("project-card");
const changeButtonClass = classBuilder("cardchange-button");

export const ProjectCard: FunctionalComponent<ProjectCardProps> = (
    { data },
) => {
    const slug = cardToSlug(data);
    const { sortedEntries, slugs } = useTimeline();
    const entryIndex = useMemo(
        () => slugs.findIndex((entrySlug) => entrySlug === slug),
        [data],
    );

    const prevCard = sortedEntries[entryIndex - 1];
    const nextCard = sortedEntries[entryIndex + 1];

    return (
        <>
            {prevCard && (
                <button
                    className={changeButtonClass
                        .color(getCardColor(prevCard.type))
                        .build(classname.card)}
                    onClick={() => gotoCard(prevCard)}
                >
                    &lt;
                </button>
            )}
            <div className={classname.color(getCardColor(data.type)).build()}>
                <ProjectCardHeader data={data} />
                <ProjectCardVersions data={data} />
                <ProjectCardDescription data={data} />
            </div>
            {nextCard && (
                <button
                    className={changeButtonClass
                        .color(getCardColor(nextCard.type))
                        .build(classname.card)}
                    onClick={() => gotoCard(nextCard)}
                >
                    &gt;
                </button>
            )}
        </>
    );
};
