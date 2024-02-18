import { useAtom } from "jotai";

import { useSettings } from "@/hooks";

import { getCardColor } from "@/components/Card/getColor";
import { SettingsBar } from "@/components/Settings";
import { IconKey } from "@/icons/icon";
import { timelineFiltersAtom } from "@/state/timeline";
import { CardType, cardTypeKeys, cardTypes } from "@/types/card";

const sectionIcons: Record<CardType, (value: boolean) => IconKey> = {
    history: (value) => (value ? "calendar" : "calendarOff"),
    position: (value) => (value ? "briefcase" : "briefcaseOff"),
    project: (value) => (value ? "package" : "packageOff"),
    stack: (value) => (value ? "stack" : "stackOff"),
};

export const TimelineFilters = () => {
    const [filters, setFilter] = useAtom(timelineFiltersAtom);
    const [{ compact }] = useSettings();

    const switches = cardTypeKeys.map((key) => ({
        name: cardTypes[key],
        key,
        value: filters[key],
        color: getCardColor(key),
        icon: sectionIcons[key](filters[key]),
        description: compact ? `${key} section` : undefined,
    }));

    return (
        <SettingsBar
            data={switches}
            onClick={setFilter}
            title="Filters"
            icon="filter"
        />
    );
};
