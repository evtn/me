import { useEffect, useState } from "preact/hooks";

import { useSettings } from "./useSettings";

type Theme = {
    light: boolean;
    contrast: boolean;
};

export const useTheme = (): Theme => {
    const [{ colors }] = useSettings();
    const [light, setLight] = useState(false);

    useEffect(() => {
        const media = matchMedia("(prefers-color-scheme: light)");

        const updateTheme = (event: MediaQueryListEvent) => {
            setLight(event.matches);
        };

        media.addEventListener("change", updateTheme);
        return () => {
            media.removeEventListener("change", updateTheme);
        };
    }, []);

    return {
        contrast: !colors,
        light,
    };
};
