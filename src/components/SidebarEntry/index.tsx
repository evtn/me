import { FunctionalComponent } from "preact";

import { useSettings } from "@/hooks";
import { classBuilder } from "@/utils";

import { SidebarEntryProps } from "@/data/sidebar";
import { getDynamicLink } from "@/utils/getDynamicLink";

import "./style.css";

import { SidebarEntryButton } from "./button";

export const classname = classBuilder("sidebar-entry");

export const SidebarEntry: FunctionalComponent<SidebarEntryProps> = (
    { data, children },
) => {
    const [{ compact }] = useSettings();

    const copy = data.copy === undefined || data.copy;
    const href = data.ln ? getDynamicLink(data.ln) : data.href;
    const buttonText = compact
        ? data.text
        : [data.beforeText, data.text, data.afterText].join("");

    const textToCopy = data.copyLink && href ? href : buttonText;
    const color = data.color || "text";

    return (
        <div className={classname.color(color).build()}>
            <SidebarEntryButton
                href={href}
                onClick={data.onClick}
                label={data.label || undefined}
                icon={data.icon || data.ln}
                text={data.text}
                fullsize
                beforeText={data.beforeText}
                afterText={data.afterText}
            />
            {children}
            {copy ? (
                <SidebarEntryButton
                    onClick={() => navigator.clipboard.writeText(textToCopy)}
                    label={data.copyLink ? "Copy link" : `Copy "${textToCopy}"`}
                    icon="copy"
                />
            ) : undefined}
        </div>
    );
};
