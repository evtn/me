import { useSettings } from "./useSettings";

type Theme = {
    light: boolean;
    contrast: boolean;
};

export const useTheme = (): Theme => {
    const [{ colors }] = useSettings();

    return {
        contrast: !colors,
        light: false,
    };
};
