import { FunctionalComponent } from "preact";

import { classBuilder } from "@/utils";

import { SidebarEntryProps } from "@/data/sidebar";
import { Icon } from "@/icons/icon";
import { getDynamicLink } from "@/utils/getDynamicLink";

import "./style.css";

const classname = classBuilder("sidebar-entry");

export const SidebarEntry: FunctionalComponent<SidebarEntryProps> = (
    { data, children },
) => {
    const copy = data.copy === undefined || data.copy;

    const contents = (
        <>
            <Icon
                iconKey={data.icon}
                className={classname.element("icon").build()}
            />
            <p>
                {data.text
                    .split(/(\/)/g)
                    .map((e, i) =>
                        i % 2 ? <span className="alpha"> / </span> : e,
                    )}
            </p>
        </>
    );

    const href = data.ln ? getDynamicLink(data.ln) : data.href;
    const textToCopy = data.copyLink && href ? href : data.text;

    const LinkComponent = href ? "a" : "button";
    const color = data.color || "text";

    return (
        <div className={classname.color(color).build()}>
            <LinkComponent
                className={classname.element("link").build(classname.card)}
                href={href}
                onClick={data.onClick}
                aria-label={data.label || undefined}
            >
                {contents}
            </LinkComponent>
            {children}
            {copy ? (
                <button
                    className={classname
                        .element("button")
                        .build(classname.card)}
                    onClick={() => navigator.clipboard.writeText(textToCopy)}
                    aria-label={
                        data.copyLink ? "Copy link" : `Copy "${textToCopy}"`
                    }
                >
                    <Icon iconKey="copy" />
                </button>
            ) : undefined}
        </div>
    );
};
