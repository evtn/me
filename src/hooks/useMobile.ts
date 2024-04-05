import { useEffect, useState } from "preact/hooks";

const mediaQuery = matchMedia("(orientation: portrait), (max-width: 28rem)");

export const useMobile = () => {
    const [isMobile, setIsMobile] = useState(mediaQuery.matches);

    useEffect(() => {
        const updateTheme = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches);
        };

        mediaQuery.addEventListener("change", updateTheme);

        return () => {
            mediaQuery.removeEventListener("change", updateTheme);
        };
    });

    return isMobile;
};
