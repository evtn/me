import { FunctionalComponent } from "preact";

import { classBuilder, formatDateRange } from "@/utils";

import { CardData, cardTypes } from "@/types/card";

const classname = classBuilder("card");
const element = classname.element;

export const buildDateRange = (data: CardData) => {
    const entryType = data.type || "project";

    let continuous: boolean;

    if (data.continuous === undefined) {
        if (["position", "stack"].includes(entryType)) {
            continuous = true;
        } else {
            continuous = false;
        }
    } else {
        continuous = data.continuous;
    }

    if (data.endDate) {
        continuous = true;
    }

    const endDate = continuous ? data.endDate : data.startDate;
    return formatDateRange(data.startDate, endDate);
};

export const CardSubtitle: FunctionalComponent<{
    data: CardData;
    precise?: boolean;
}> = ({ data, precise = false }) => {
    const entryType = data.type || "project";

    const dateRange = buildDateRange(data);

    return (
        <span className={element("subtitle").build()}>
            <span className={element("type").build()}>
                {cardTypes[entryType]}
            </span>
            ,{" "}
            <span aria-label={dateRange.preciseRange}>
                {precise ? dateRange.preciseRange : dateRange.range}{" "}
            </span>
            {dateRange.durationMs ? (
                <span className={element("suffix").build()}>
                    ({dateRange.duration.replace(" ", " ")})
                </span>
            ) : undefined}
        </span>
    );
};
