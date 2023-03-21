import { FunctionalComponent } from "preact";
import { Card, CardData } from "../Card";
import "./style.scss";

export type CardGroupProps = {
  headerCards: CardData[];
  contentCards?: CardData[];
};

export const CardGroup: FunctionalComponent<CardGroupProps> = ({
  headerCards,
  contentCards,
}) => {
  return (
    <div className="card-group">
      <div className="card-group__header">
        {headerCards.map((cardData) => (
          <Card data={cardData} />
        ))}
      </div>
      {contentCards?.length ? (
        <div className="card-group__content">
          {contentCards.map((cardData) => (
            <Card data={cardData} />
          ))}
        </div>
      ) : null}
    </div>
  );
};
