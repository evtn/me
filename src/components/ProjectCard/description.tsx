import { FunctionalComponent } from "preact";

import { Description, format } from "@/utils/formatter";

import { ProjectCardProps, classname } from ".";

export const ProjectCardDescription: FunctionalComponent<ProjectCardProps> = (
    { data },
) => {
    const description: Description = data.description;

    return (
        <p className={classname.element("description").build(classname.card)}>
            {format(description)}
        </p>
    );
};
