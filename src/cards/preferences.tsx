import {
  NumberIcon,
  OrganizationIcon,
  PencilIcon,
  TypographyIcon,
} from "@primer/octicons-react";
import { ComponentChildren, FunctionalComponent } from "preact";
import { CardIconData } from "../components/Card";
import { makePaddedIcon } from "../components/Card/paddedIcon";
import {
  CardGroup,
  CardGroupProps,
  CardSubsection,
} from "../components/CardGroup";

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
      icon: makePaddedIcon(() => <PencilIcon size={24} />),
      color: "blue",
      invertColor: true,
    },
  },
  {
    title: "Math",
    description:
      "As long as it's not mathematical analysis and such, I'm in, right after finishing with graphics",
    icon: {
      icon: makePaddedIcon(() => <NumberIcon size={24} />),
      color: "red",
      invertColor: true,
    },
  },
  {
    title: "Languages",
    description:
      "I speak English (advanced) and Russian (native), but I also have some little understanding of French and Georgian. Estonian or Finnish are also in my plans",
    icon: {
      icon: makePaddedIcon(() => <TypographyIcon size={24} />),
      color: "orange",
      invertColor: true,
    },
  },
  {
    title: "Urban Planning",
    description:
      "Although now it's limited to arguing in chatrooms, playing Cities:Skylines and watching NotJustBikes, it would be great to improve real cities",
    icon: {
      icon: makePaddedIcon(() => <OrganizationIcon size={24} />),
      color: "green",
      invertColor: true,
    },
  },
];

const interestToCardGroup = (interest: Interest): CardGroupProps => {
  return {
    headerCards: [
      {
        title: interest.title,
        icon: interest.icon,
      },
    ],
    contentCards: [
      {
        text: interest.description,
      },
    ],
  };
};

export const Interests: FunctionalComponent = () => {
  const pairCount = Math.ceil(interests.length / 2);

  return (
    <div className="card-section">
      <h2>Interests</h2>

      {[...Array(pairCount).keys()].map((e) => (
        <CardSubsection>
          {interests.slice(e * 2, (e + 1) * 2).map((interest) => (
            <CardGroup {...interestToCardGroup(interest)} />
          ))}
        </CardSubsection>
      ))}
    </div>
  );
};
