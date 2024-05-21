import { classname } from ".";
import { FunctionalComponent } from "preact";

import { Icon } from "@/icons";

import { IconKey } from "@/icons/base";

type SidebarEntryButtonProps = {
    className?: string;
    href?: string;
    label?: string;
    onClick?: () => void;
    icon: IconKey;
    text?: string;
    fullsize?: boolean;
};

export const SidebarEntryButton: FunctionalComponent<
    SidebarEntryButtonProps
> = ({ className, href, label, children, onClick, icon, text, fullsize }) => {
    const LinkComponent = href ? "a" : "button";

    return (
        <LinkComponent
            className={classname
                .element("button")
                .add(className)
                .add(fullsize && "fullsize")
                .build(classname.button)}
            href={href}
            onClick={onClick}
            aria-label={label || undefined}
        >
            <Icon
                iconKey={icon}
                className={classname.element("icon").build()}
            />
            {text ? (
                <p>
                    {text
                        .split(/(\/)/g)
                        .map((e, i) =>
                            i % 2 ? <span className="alpha"> / </span> : e,
                        )}
                </p>
            ) : null}
            {children}
        </LinkComponent>
    );
};
