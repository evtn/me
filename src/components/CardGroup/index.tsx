import { ComponentProps, FunctionalComponent } from "preact";
import { Card, CardData } from "@/components";
import "./style.scss";
import { getClassName } from "@/utils/classname";

export type CardGroupProps = {
  headerCards: CardData[];
  contentCards?: CardData[];
  className?: string;
} & ComponentProps<"div">;

export const CardGroup: FunctionalComponent<CardGroupProps> = ({
  headerCards,
  contentCards,
  className,
  ...rest
}) => {
  return (
    <div className={getClassName("card-group", className)} {...rest}>
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

export const CardSubsection: FunctionalComponent = ({ children }) => {
  return <div class="card-subsection">{children}</div>;
};
