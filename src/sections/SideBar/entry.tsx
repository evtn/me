import {
  CodeIcon,
  CopyIcon,
  FileIcon,
  Icon,
  LinkIcon,
  LocationIcon,
  MarkGithubIcon,
  MentionIcon,
} from "@primer/octicons-react";
import { useAtom } from "jotai";
import { ComponentChildren, FunctionalComponent } from "preact";
import { TGIcon } from "../../components/icons/TGIcon";
import { colorfulAtom } from "../../state/colorful";

type SidebarEntryData = (
  | {
      href: string;
      copyLink?: boolean;
    }
  | {
      href?: string;
      copyLink?: false;
    }
) & {
  text: string;
  icon: Icon;
  color?: string;
};

export const entries: SidebarEntryData[] = [
  {
    href: "https://en.wikipedia.org/wiki/Tbilisi",
    text: "Tbilisi, Georgia",
    icon: LocationIcon,
    color: "var(--red)",
  },
  {
    href: "mailto:j@evtn.me",
    text: "j@evtn.me",
    icon: MentionIcon,
    color: "var(--purple)",
  },
  {
    href: "https://t.me/aternative",
    text: "aternative",
    icon: TGIcon,
    color: "var(--blue)",
  },
  {
    href: "https://github.com/evtn",
    text: "evtn",
    icon: MarkGithubIcon,
    copyLink: true,
    color: "var(--text)",
  },
  {
    href: "https://evtn.me",
    text: "Link here",
    icon: LinkIcon,
    copyLink: true,
    color: "var(--green)",
  },
  {
    href: "https://evtn.me/cv",
    text: "PDF Version",
    icon: FileIcon,
    copyLink: true,
    color: "var(--orange)",
  },
  {
    href: "https://github.com/evtn/me",
    text: "Source",
    icon: CodeIcon,
    copyLink: true,
    color: "var(--pink)",
  },
];

type SidebarEntryProps = {
  data: SidebarEntryData;
  children?: ComponentChildren;
};

export const SidebarEntry: FunctionalComponent<SidebarEntryProps> = ({
  data,
  children,
}) => {
  const [isColorful] = useAtom(colorfulAtom);

  const textToCopy = data.copyLink ? data.href : data.text;

  return (
    <div
      className="sidebar-entry"
      style={{ "--icon-color": (isColorful && data.color) || "var(--text)" }}
    >
      <a className="sidebar-entry__link" href={data.href}>
        <data.icon className="sidebar-entry__icon" />
        <p>{data.text}</p>
      </a>
      <button
        className="sidebar-entry__button"
        onClick={() => navigator.clipboard.writeText(textToCopy)}
      >
        <CopyIcon />
      </button>
      {children}
    </div>
  );
};
