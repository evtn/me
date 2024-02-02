import { ProjectCardProps } from ".";
import { getCardColor } from "../Card/getColor";
import { FunctionalComponent } from "preact";
import { Link } from "preact-router";
import { useMemo } from "preact/hooks";

import { CardTitle } from "@/components";
import { cardToSlug, useEntries } from "@/hooks";
import { Icon } from "@/icons";
import { classBuilder } from "@/utils";

const classname = classBuilder("versionlist");

export const ProjectCardVersions: FunctionalComponent<ProjectCardProps> = (
    { data },
) => {
    const entries = useEntries();

    const otherVersions = useMemo(() => {
        if (!data.version) {
            return [];
        }
        const versions = entries
            .filter(
                (entry) =>
                    entry.name === data.name &&
                    entry.version &&
                    entry.version !== data.version,
            )
            .sort((e1, e2) => e1.version! - e2.version!);
        return versions;
    }, [data]);

    if (!otherVersions.length) {
        return null;
    }

    return (
        <ul className={classname.build(classname.card)}>
            <b className="versionlist-header">
                Other versions of this {data.type}
            </b>
            {otherVersions.map((version) => {
                return (
                    <li
                        className={classBuilder("versionlist-version")
                            .color(getCardColor(version.type))
                            .build()}
                        key={version.version}
                    >
                        <Link
                            href={`/timeline/${cardToSlug(version)}`}
                            className={classname.card}
                        >
                            <CardTitle data={version} />
                            <Icon iconKey="tab" />
                        </Link>
                        {version.startDate ? undefined : (
                            <span className="transparent"> (planned)</span>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};
