import { route } from "preact-router";
import { useEffect, useMemo } from "preact/hooks";

import { PDFGenerator, ProjectCard, Story, usePopup } from "@/components";
import { useEntries } from "@/hooks";

import { renderTitle } from "@/components/Card/title";
import { CardData } from "@/types/card";

type MatchChildrenProps = {
    matches: boolean;
    url: string;
    path: string;
};

export const cardToSlug = (card: CardData) => {
    const title = renderTitle(card)
        .toLowerCase()
        .replace("@", "at")
        .replace(/[^\w.]/g, "-");
    if (card.startDate) {
        return `${title}-${card.startDate.join("-")}`;
    }
    return title;
};

const findTimelineCard = (slug: string, entries: CardData[]) => {
    return entries.find((entry) => cardToSlug(entry) === slug);
};

export const gotoCard = (data: CardData) => {
    route(`/timeline/${cardToSlug(data)}`);
};

const getPathParts = (url: string) => {
    return url.split("#")[0].split("?")[0].split("/").filter(Boolean);
};

export const useRouting = ({ matches, path, url }: MatchChildrenProps) => {
    const setPopupContents = usePopup();
    const entries = useEntries();

    const setter = (value: any) => {
        console.log("setter", value);
        setPopupContents(value);
    };

    const pathParts = useMemo(() => getPathParts(url), [url]);

    console.log("routing");

    useEffect(() => {
        console.log(pathParts);
        switch (pathParts[0]) {
            case "timeline": {
                const card = findTimelineCard(pathParts[1], entries);
                if (card) {
                    setter(<ProjectCard data={card} />);
                }
                break;
            }
            case "logo": {
                console.log("story!");
                setter(<Story />);
                break;
            }
            case "pdf": {
                setter(<PDFGenerator />);
                break;
            }
            default: {
                setter(undefined);
            }
        }
    }, [...pathParts, entries]);

    console.log(matches, path, url);
    return undefined;
};
