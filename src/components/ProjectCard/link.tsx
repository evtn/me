import { FunctionalComponent } from "preact";

import { classBuilder } from "@/utils";

type ProjectCardLinkProps = {
    href: string;
    text?: string;
};

const classname = classBuilder("project-card");

export const ProjectCardLink: FunctionalComponent<ProjectCardLinkProps> = (
    { href, children, text },
) => {
    return (
        <a
            className={classname.element("link").build(classname.card)}
            href={href}
        >
            {children}
        </a>
    );
};
