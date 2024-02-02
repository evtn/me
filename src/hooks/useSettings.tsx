import { useAtom } from "jotai";
import { useMemo } from "preact/hooks";

import { settingsAtom } from "@/state/settings";

export const useSettings = () => {
    return useAtom(settingsAtom);
};

export const useSettingsDataset = () => {
    const [settings] = useSettings();
    return useMemo(
        () =>
            Object.fromEntries(
                Object.entries(settings).map(([key, value]) => [
                    `data-${key.toLowerCase()}`,
                    String(value),
                ]),
            ),
        [settings],
    );
};
