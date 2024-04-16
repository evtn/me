import { useAtom } from "jotai";

import { useSettings } from "@/hooks";

import { getCardColor } from "@/components/Card/getColor";
import { SettingsBar, SwitchData } from "@/components/Settings";
import { type IconKey, iconOff } from "@/icons/base";
import { timelineFiltersAtom } from "@/state/timeline";
import { CardType, cardTypeKeys, cardTypes } from "@/types/card";

const sectionIcons = {
    history: "calendar",
    position: "briefcase",
    project: "package",
    stack: "stack",
} as const satisfies Record<CardType, IconKey>;

export const TimelineFilters = () => {
    const [filters, setFilter] = useAtom(timelineFiltersAtom);
    const [{ compact }] = useSettings();

    const getSwitch = (key: CardType): SwitchData<CardType> => {
        const value = filters[key];

        return {
            name: cardTypes[key],
            key,
            value: value,
            color: getCardColor(key),
            icons: iconOff(sectionIcons[key]),
            description: compact ? `${key} section` : undefined,
        };
    };

    const switches = cardTypeKeys.map(getSwitch);

    return (
        <SettingsBar
            data={switches}
            onClick={setFilter}
            title="Filters"
            icons={["filter", "filter"]}
        />
    );
};
