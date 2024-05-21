import { ComponentChildren } from "preact";

import { Color } from "@/types";

import { type IconKey } from "@/icons/base";

type LinkedBase =
    | {
          href: string;
          ln?: string;
      }
    | {
          ln: string;
          href?: string;
      };

type NonLinkedBase = {
    ln?: undefined;
    href?: undefined;
};

type LinkedEntry = {
    copyLink?: boolean;
} & LinkedBase;

type NonLinkedEntry = {
    copyLink?: false;
} & (LinkedBase | NonLinkedBase);

export type SidebarEntryData = (LinkedEntry | NonLinkedEntry) &
    (
        | {
              icon: IconKey;
          }
        | {
              ln: IconKey;
              icon?: IconKey;
          }
    ) & {
        text: string;
        color?: Color;
        onClick?: () => void;
        copy?: boolean;
        description?: string;
        label: string;
    };

export type SidebarEntryProps = {
    data: SidebarEntryData;
    children?: ComponentChildren;
};

export const entries: SidebarEntryData[] = [
    {
        ln: "location",
        text: "Tbilisi / Relocate / Remote",
        color: "red",
        copy: false,
        label: "That's where I am",
    },
    {
        ln: "github/me",
        text: "Source",
        icon: "source",
        copyLink: true,
        color: "pink",
        label: "Source of this website",
    },
    {
        ln: "telegram",
        text: "aternative",
        copyLink: true,
        color: "cyan",
        label: "Telegram",
    },
    {
        ln: "mail",
        text: "j@evtn.me",
        icon: "at",
        color: "purple",
        label: "E-Mail",
    },
    {
        ln: "github",
        text: "evtn",
        copyLink: true,
        color: "text",
        label: "GitHub",
    },
    {
        ln: "linkedin",
        text: "qevitta",
        copyLink: true,
        color: "blue",
        label: "LinkedIn",
    },
];
