import { ComponentChildren, ComponentType, FunctionalComponent } from "preact";
import "./style.scss";
import "../icons/style.scss";
import { ImportantContent } from "../Popup/veryImportant";
import { usePopup } from "../Popup";

export type CardIconData = {
  color?: string;
  invertColor?: boolean;
  icon: ComponentType<{ className: string }>;
};

export type CardData = (
  | {
      title: ComponentChildren;
      text?: ComponentChildren;
    }
  | {
      title?: ComponentChildren;
      text: ComponentChildren;
    }
) & { icon?: CardIconData; subtitle?: ComponentChildren };

const CardIcon: FunctionalComponent<{ data: CardIconData }> = ({ data }) => {
  const primaryColor = data.color || "var(--text)";
  const backgroundColor = data.invertColor ? primaryColor : "var(--background)";
  const iconColor = data.invertColor ? "var(--background)" : primaryColor;

  const setPopupContents = usePopup();

  return (
    <div
      className="card__icon"
      style={{
        "--icon-color": iconColor,
        "--icon-background": backgroundColor,
      }}
      onClick={() => setPopupContents(ImportantContent)}
    >
      <data.icon className="card__icon-main" />
    </div>
  );
};

export const Card: FunctionalComponent<{ data: CardData }> = ({ data }) => {
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

  return (
    <div className="card">
      {data.title ? header : null}
      {data.text ? <p className="card__text">{data.text}</p> : null}
    </div>
  );
};
