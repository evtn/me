import {
  NumberIcon,
  PaintbrushIcon,
  ReplyIcon,
  TypographyIcon,
} from "@primer/octicons-react";
import { ComponentChildren, FunctionalComponent } from "preact";
import { CardIconData } from "../components/Card";
import { makePaddedIcon } from "../components/Card/paddedIcon";
import { CardGroup, CardGroupProps } from "../components/CardGroup";
import { Chip } from "../components/Chip";

type Interest = {
  title: string;
  description: ComponentChildren;
  icon: CardIconData;
};

const interests: Interest[] = [
  {
    title: "Graphics",
    description:
      "From vector to ML generative art, I find all kinds of graphics interesting and can spend hours working on it",
    icon: {
      icon: makePaddedIcon(PaintbrushIcon),
      invertColor: true,
    },
  },
  {
    title: "Math",
    description:
      "As long as it's not mathematical analysis and such, I'm in, right after finishing with graphics",
    icon: {
      icon: makePaddedIcon(NumberIcon),
      invertColor: true,
    },
  },
  {
    title: "Languages",
    description:
      "I speak English (advanced) and Russian (native), but I also have some little understanding of French and Georgian. Estonian or Finnish are also in my plans",
    icon: {
      icon: makePaddedIcon(TypographyIcon),
      invertColor: true,
    },
  },
  {
    title: "Urban Planning",
    description:
      "Although now it's limited to arguing in chatrooms, playing Cities:Skylines and watching NotJustBikes, it would be great to improve real cities",
    icon: {
      icon: makePaddedIcon(ReplyIcon),
      invertColor: true,
    },
  },
];

const interestToCardGroup = (interests: Interest[]): CardGroupProps => {
  return {
    headerCards: interests.map((interest) => ({
      title: interest.title,
      icon: interest.icon,
      text: interest.description,
    })),
  };
};

export const Interests: FunctionalComponent = () => {
  const pairCount = Math.floor(interests.length / 2) + (interests.length % 2);

  return (
    <div className="card-section">
      <h2>Interests</h2>
      {[...Array(pairCount).keys()].map((e) => (
        <CardGroup
          {...interestToCardGroup(interests.slice(e * 2, (e + 1) * 2))}
        />
      ))}
    </div>
  );
};
