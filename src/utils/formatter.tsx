import { JSXInternal } from "preact/src/jsx";

import { Highlighter } from "@/components";
import { Color } from "@/types";

import { CardData } from "@/types/card";

import { classBuilder } from "./classname";
import { getDynamicLink } from "./getDynamicLink";

type FormattedTextType =
    | "bold"
    | "italic"
    | "transparent"
    | "monospace"
    | "spoiler";

type RichText<T extends RichTextType> = {
    bold: FormattedText;
    italic: FormattedText;
    transparent: FormattedText;
    monospace: FormattedText;
    spoiler: FormattedText;
    link: Link;
    timeline: TimelineLink;
    highlight: Highlight;
}[T];

type FormattedText = {
    content: Description;
    type: FormattedTextType;
};

type Link = {
    content: Description;
    color: Color;
    type: "link";
} & ({ ln: string } | { href: string });

export type TimelineLink = {
    content?: Description;
    filter: Partial<CardData>;
    type: "timeline";
    color?: Color;
};

type Highlight = {
    content: Description;
    type: "highlight";
    color?: Color;
};

type RichTextType = FormattedTextType | "link" | "timeline" | "highlight";

type DescriptionPart = string | RichText<RichTextType>;
export type Description = string | DescriptionPart[];

type Wrapper<T extends RichTextType> = (
    data: RichText<T>,
) => JSXInternal.Element;

const linkClassName = classBuilder("link");

const wrappers: { [K in RichTextType]: Wrapper<K> } = {
    bold: (data) => <b>{format(data.content)}</b>,
    italic: (data) => <i>{format(data.content)}</i>,
    transparent: (data) => (
        <span className="transparent">{format(data.content)}</span>
    ),
    monospace: (data) => (
        <code className={linkClassName.card}>{format(data.content)}</code>
    ),
    spoiler: (data) => <span className="spoiler">{format(data.content)}</span>,
    link: (data) => {
        const link = "ln" in data ? getDynamicLink(data.ln) : data.href;

        return (
            <a
                className={linkClassName
                    .color(data.color)
                    .build(linkClassName.card)}
                href={link}
                aria-label={`External link: ${link}`}
            >
                {format(data.content)}
            </a>
        );
    },
    highlight: (data) => (
        <span
            className={classBuilder("highlight")
                .color(data.color || "text")
                .build(linkClassName.card)}
        >
            {format(data.content)}
        </span>
    ),
    timeline: (data) => <Highlighter {...data} />,
};

const renderPart = <T extends RichTextType>(part: RichText<T> | string) => {
    if (typeof part === "string") {
        return part;
    }
    const type = part.type as T;
    return wrappers[type](part);
};

export const format = (content: Description) => {
    if (typeof content === "string") {
        return content;
    }
    return <>{content.map(renderPart)}</>;
};

export const markup = {
    bold: (content: Description): DescriptionPart => ({
        type: "bold",
        content,
    }),
    italic: (content: Description): DescriptionPart => ({
        type: "italic",
        content,
    }),
    monospace: (content: Description): DescriptionPart => ({
        type: "monospace",
        content,
    }),
    transparent: (content: Description): DescriptionPart => ({
        type: "transparent",
        content,
    }),
    spoiler: (content: Description): DescriptionPart => ({
        type: "spoiler",
        content,
    }),
    timeline: (
        content: Description,
        filter: Partial<CardData>,
        color?: Color,
    ): DescriptionPart => ({
        type: "timeline",
        content,
        color,
        filter,
    }),
    highlight: (content: Description, color?: Color): DescriptionPart => ({
        type: "highlight",
        content,
        color,
    }),
};
