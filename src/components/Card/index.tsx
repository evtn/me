import { FunctionalComponent } from "preact";

import { Filler } from "@/components";
import { cardToSlug, gotoCard } from "@/hooks";
import { Icon } from "@/icons";
import { CardData } from "@/types";
import { classBuilder, format } from "@/utils";

import { cleanHref } from "@/utils/link";

import "./style.css";

import { getCardColor } from "./getColor";
import { CardIcon } from "./icon";
import { CardSubtitle } from "./subtitle";
import { CardTitle } from "./title";

export type CardComponent = FunctionalComponent<{ data: CardData }>;

export const classname = classBuilder("card");
const element = classname.element;

export const Card: FunctionalComponent<{
    data: CardData;
    isVisible: boolean;
}> = ({ data, isVisible }) => {
    const entryType = data.type || "project";
    const entryColor = getCardColor(entryType);

    const cardContent = data.description && (
        <div className={element("content").build()}>
            <span className={element("description").build()}>
                {format(data.description)}
            </span>
        </div>
    );

    const cardHref = `/timeline/${cardToSlug(data)}`;

    return (
        <div
            className={classname.color(entryColor).build(classname.card)}
            data-visible={isVisible}
        >
            <div className={element("header").build()}>
                <CardIcon data={data} />
                <a href={cardHref}>
                    <div className={element("header-text").build()}>
                        <CardSubtitle data={data} />
                        <CardTitle data={data} />
                    </div>
                </a>
                <Filler />
                {data.repo && (
                    <a
                        className={classname
                            .element("card-button")
                            .build(classname.card)}
                        href={`https://github.com/${data.repo}`}
                        aria-label={`GitHub Repo: ${data.repo}`}
                    >
                        <Icon iconKey="github" />
                    </a>
                )}
                {data.href && (
                    <a
                        className={classname
                            .element("card-button")
                            .build(classname.card)}
                        href={data.href}
                        aria-label={`External link: ${cleanHref(data.href)}`}
                    >
                        <Icon iconKey="external" />
                    </a>
                )}
                <a
                    className={classname
                        .element("card-button")
                        .build(classname.card)}
                    href={cardHref}
                    aria-label="Expand / Link to this card"
                >
                    <Icon iconKey="expand" />
                </a>
            </div>
            {cardContent}
        </div>
    );
};

export { CardTitle, CardSubtitle, CardIcon };
