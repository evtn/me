import { Color } from "@/types";

import { classBuilder } from "./classname";

type LinkData = {
    text: string;
    color: Color;
};

export const links: Record<string, LinkData> = {
    telegram: {
        text: "Telegram",
        color: "cyan",
    },
    linkedin: {
        text: "LinkedIn",
        color: "blue",
    },
    mail: {
        text: "e-mail",
        color: "purple",
    },
};

export const getDynamicLink = (lnKey: string) => {
    return `https://ln.evtn.me/${lnKey}`;
};
