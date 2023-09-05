import { ComponentChildren, ComponentType, FunctionalComponent } from "preact";
import "./style.scss";
import { ImportantContent } from "../Popup/veryImportant";
import { usePopup } from "../Popup";
import { getClassName } from "@/utils/classname";
import { JSXInternal } from "preact/src/jsx";

export { makePaddedIcon } from "./paddedIcon";

export type CardIconData = {
  color?: string;
  invertColor?: boolean;
  icon: ComponentType<{ className: string }>;
};

type CardType = "common" | "time" | "experience";

export type CardData = (
  | {
      title: ComponentChildren;
      text?: ComponentChildren;
    }
  | {
      title?: ComponentChildren;
      text: ComponentChildren;
    }
) & {
  icon?: CardIconData;
  subtitle?: ComponentChildren;
  cardType?: CardType;
  href?: string;
};

const getCardIconColors = (data: CardIconData) => {
  const primaryColor = data.color || "text";
  const backgroundColor = data.invertColor ? primaryColor : "background";
  const iconColor = data.invertColor ? "background" : primaryColor;

  return {
    primaryColor,
    backgroundColor,
    iconColor,
  };
};

const CardIcon: FunctionalComponent<{ data: CardIconData }> = ({ data }) => {
  const { primaryColor } = getCardIconColors(data);

  const setPopupContents = usePopup();

  return (
    <div
      className={getClassName(
        "card__icon",
        `colored-${primaryColor}`,
        data.invertColor ? "icon-inverted" : undefined,
      )}
      onClick={() => setPopupContents(ImportantContent)}
    >
      <data.icon className="card__icon-main" />
    </div>
  );
};

export const Card: FunctionalComponent<{ data: CardData }> = ({ data }) => {
  let backgroundColor: string = "dark";

  if (data.icon) {
    backgroundColor = getCardIconColors(data.icon).backgroundColor;
  }

  const header = (
    <div className="card__header">
      {data.icon && <CardIcon data={data.icon} />}
      <div className="card__header-text">
        {data.title ? <h2 className="card__title">{data.title}</h2> : null}
        {data.subtitle ? (
          <h3 className="card__subtitle">{data.subtitle}</h3>
        ) : null}
      </div>
    </div>
  );

  const props = {
    className: getClassName("card", `colored-${backgroundColor}`),
    "data-text": !!data.text,
    "data-type": data.cardType || "common",
    href: data.href,
    children: [
      data.title ? header : null,
      data.text ? <p className="card__text">{data.text}</p> : null,
    ],
  };

  if (data.href) {
    return <a {...props} />;
  }

  return <div {...props} />;
};
