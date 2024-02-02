import { useAtom } from "jotai";

import { getCardColor } from "@/components/Card/getColor";
import { SettingsBar } from "@/components/Settings";
import { timelineFiltersAtom } from "@/state/timeline";
import { cardTypeKeys, cardTypes } from "@/types/card";

export const TimelineFilters = () => {
    const [filters, setFilter] = useAtom(timelineFiltersAtom);
    const switches = cardTypeKeys.map((key) => ({
        name: cardTypes[key],
        key,
        value: filters[key],
        color: getCardColor(key),
    }));

    return <SettingsBar data={switches} onClick={setFilter} title="Filters" />;
};
