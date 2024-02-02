import { ProjectCardProps, classname } from ".";
import { FunctionalComponent } from "preact";

import { CardIcon, CardTitle, Filler } from "@/components";
import { Icon } from "@/icons";

import { CardSubtitle, buildDateRange } from "@/components/Card/subtitle";
import { stackColors, stackNames } from "@/types/card";

import { ProjectCardLink } from "./link";

export const ProjectCardHeader: FunctionalComponent<ProjectCardProps> = (
    { data },
) => {
    const dateRange = buildDateRange(data);

    return (
        <>
            <div className={classname.element("header").build()}>
                <CardIcon data={data} />
                <CardTitle data={data} />
                {data.stack && (
                    <div className={classname.element("stack-bar").build()}>
                        {data.stack.map((techKey) => (
                            <div
                                className={classname
                                    .element("stack-icon")
                                    .color(stackColors[techKey])
                                    .build(classname.card)}
                                aria-label={stackNames[techKey]}
                                key={techKey}
                            >
                                <Icon iconKey={techKey} />
                            </div>
                        ))}
                    </div>
                )}

                <Filler />

                <div className={classname.element("links").build()}>
                    {data.repo && (
                        <ProjectCardLink
                            href={`https://github.com/${data.repo}`}
                        >
                            <Icon iconKey="github" />
                        </ProjectCardLink>
                    )}

                    {data.href && (
                        <ProjectCardLink href={data.href}>
                            <Icon iconKey="external" />
                        </ProjectCardLink>
                    )}
                </div>
            </div>
            <CardSubtitle data={data} precise />
        </>
    );
};
