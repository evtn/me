import { CardComponent, classname } from ".";

import { CardData } from "@/types/card";

const element = classname.element;

const atSeparator = "@ ";
const versionSeparator = "v";

const getSuffix = (data: CardData) => {
    const parts: string[] = [];

    const suffix = data.where || data.version;

    if (!suffix) {
        return;
    }

    if (data.where) {
        parts.push(atSeparator);
    } else {
        parts.push(versionSeparator);
    }

    parts.push(suffix.toString());

    return parts.join("").replace(" ", " ");
};

export const renderTitle = (data: CardData) => {
    let parts = [data.name];

    const suffix = getSuffix(data);

    if (suffix) {
        parts.push(" ");
        parts.push(suffix);
    }

    return parts.join("");
};

export const CardTitle: CardComponent = ({ data }) => {
    const nameSuffix = getSuffix(data);

    return (
        <h2 className={element("title").build()}>
            <span className={element("name").build()}>
                {data.name.replace(" ", " ").replace("-", "‑")}{" "}
            </span>
            {nameSuffix && (
                <span className={element("suffix").build()}>{nameSuffix}</span>
            )}
        </h2>
    );
};
