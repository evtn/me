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
        beforeText?: string;
        afterText?: string;
    };

export type SidebarEntryProps = {
    data: SidebarEntryData;
    children?: ComponentChildren;
};

export const entries: SidebarEntryData[] = [
    {
        ln: "location",
        text: "Tbilisi",
        color: "red",
        copy: false,
        label: "That's where I am",
        afterText: " or Relocate / Remote",
    },
    {
        ln: "github/me",
        text: "Source",
        icon: "source",
        copyLink: true,
        color: "pink",
        label: "Source of this website",
        afterText: " on GitHub",
    },
    {
        ln: "telegramwork",
        icon: "telegram",
        text: "evitanreta",
        copyLink: true,
        color: "cyan",
        label: "Telegram",
        beforeText: "t.me/",
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
        beforeText: "github.com/",
    },
    {
        ln: "linkedin",
        text: "qevitta",
        copyLink: true,
        color: "blue",
        label: "LinkedIn",
        beforeText: "linkedin.com/in/",
    },
];
