import {
  CodeIcon,
  FileIcon,
  LinkIcon,
  LocationIcon,
  MarkGithubIcon,
  MentionIcon,
} from "@primer/octicons-react";
import { TGIcon } from "@/icons/TGIcon";
import { SidebarEntryData } from "@/components/SidebarEntry";

export const entries: SidebarEntryData[] = [
  {
    href: "https://en.wikipedia.org/wiki/Tbilisi",
    text: "Tbilisi, Georgia",
    icon: LocationIcon,
    color: "red",
  },
  {
    href: "mailto:j@evtn.me",
    text: "j@evtn.me",
    icon: MentionIcon,
    color: "purple",
  },
  {
    href: "https://t.me/aternative",
    text: "aternative",
    icon: TGIcon,
    color: "blue",
  },
  {
    href: "https://github.com/evtn",
    text: "evtn",
    icon: MarkGithubIcon,
    copyLink: true,
    color: "text",
  },
  {
    href: "https://evtn.me",
    text: "Link here",
    icon: LinkIcon,
    copyLink: true,
    color: "green",
  },
  {
    href: "https://evtn.me/cv",
    text: "PDF Version",
    icon: FileIcon,
    copyLink: true,
    color: "orange",
  },
  {
    href: "https://github.com/evtn/me",
    text: "Source",
    icon: CodeIcon,
    copyLink: true,
    color: "pink",
  },
];
