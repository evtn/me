import { useSettings } from "./useSettings";

type Theme = {
    light: boolean;
    contrast: boolean;
};

export const useTheme = (): Theme => {
    const [{ contrast }] = useSettings();

    return {
        contrast,
        light: false,
    };
};
