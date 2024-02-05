import { ComponentChildren } from "preact";

import { Color } from "@/types";

import { IconKey } from "@/icons/icon";

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

export type SidebarEntryData = (LinkedEntry | NonLinkedEntry) & {
    text: string;
    icon: IconKey;
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
        icon: "location",
        color: "red",
        copy: false,
        label: "That's where I am",
    },
    {
        href: "/pdf",
        text: "Get a PDF",
        icon: "file",
        copy: false,
        color: "orange",
        label: "PDF Generator",
    },
    {
        ln: "github/me",
        text: "Source",
        icon: "code",
        copyLink: true,
        color: "pink",
        label: "Source of this website",
    },
    {
        ln: "telegram",
        text: "aternative",
        icon: "telegram",
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
        icon: "github",
        copyLink: true,
        color: "text",
        label: "GitHub",
    },
    {
        ln: "linkedin",
        text: "qevitta",
        icon: "linkedin",
        copyLink: true,
        color: "blue",
        label: "LinkedIn",
    },
];
