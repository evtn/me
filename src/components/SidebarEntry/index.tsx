import { getClassName } from "@/utils/classname";
import { CopyIcon, Icon } from "@primer/octicons-react";
import { ComponentChildren, FunctionalComponent } from "preact";

export type SidebarEntryData = (
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
  onClick?: () => void;
  copy?: boolean;
};

type SidebarEntryProps = {
  data: SidebarEntryData;
  children?: ComponentChildren;
};

export const SidebarEntry: FunctionalComponent<SidebarEntryProps> = ({
  data,
  children,
}) => {
  const textToCopy = data.copyLink ? data.href : data.text;
  const copy = data.copy === undefined ? true : data.copy;

  const contents = (
    <>
      <data.icon className="sidebar-entry__icon" />
      <p>{data.text}</p>
    </>
  );

  const LinkComponent = data.href ? "a" : "button";

  return (
    <div
      className={getClassName(
        "sidebar-entry",
        `colored-${data.color || "text"}`,
      )}
    >
      <LinkComponent
        className="sidebar-entry__link"
        href={data.href}
        onClick={data.onClick}
      >
        {contents}
      </LinkComponent>
      {copy ? (
        <button
          className="sidebar-entry__button"
          onClick={() => navigator.clipboard.writeText(textToCopy)}
        >
          <CopyIcon />
        </button>
      ) : undefined}
      {children}
    </div>
  );
};
