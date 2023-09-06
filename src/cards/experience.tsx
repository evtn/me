import { GlobeIcon } from "@primer/octicons-react";
import { FunctionalComponent } from "preact";
import {
  CardIconData,
  makePaddedIcon,
  CardGroup,
  CardGroupProps,
  StackList,
} from "@/components";
import { EpamLogo, InteticsLogo, MCCLogo } from "@/icons";
import { formatDateRange } from "@/utils/date";

type ExperiencePiece = {
  companyName: string;
  companyDescription: string;
  icon: CardIconData;
  stack: string[];

  startDate: Date;
  endDate?: Date;
  description: string;
};

export const experiences: ExperiencePiece[] = [
  {
    companyName: "EPAM Systems",
    companyDescription:
      "EPAM Systems is a B2B company that provides software development services.",
    icon: {
      color: "blue",
      invertColor: true,
      icon: EpamLogo,
    },
    stack: ["TypeScript", "React", "Jotai"],

    startDate: new Date(2022, 4, 7), // april 2018
    endDate: new Date(2022, 10, 22),

    description:
      "Developed UI components for a UI system used in internal projects.",
  },
  {
    companyName: "MCC Soft",
    companyDescription:
      "MCC Soft is a small software studio. It's mostly focused on backend and mobile software.",
    icon: {
      color: "green",
      invertColor: true,
      icon: MCCLogo,
    },
    stack: ["TypeScript", "React", "Redux"],

    startDate: new Date(2021, 10, 8), // april 2018
    endDate: new Date(2022, 3, 26),

    description:
      "Worked on a mobile app for a portable therapy device. Added a dark theme support and reworked some screens.",
  },
  {
    companyName: "Intetics",
    companyDescription:
      "Intetics is also a B2B company that provides software development services.",
    icon: {
      color: "orange",
      invertColor: true,
      icon: makePaddedIcon(InteticsLogo),
    },
    stack: ["JavaScript", "React"],

    startDate: new Date(2021, 2, 25),
    endDate: new Date(2021, 10, 8),

    description:
      "Worked on the UI of an online education service called Area9 Lyceum, components and some pages",
  },
  {
    companyName: "Freelance",
    companyDescription: "Freelance is...well, it is not a company.",
    icon: {
      color: "purple",
      invertColor: true,
      icon: makePaddedIcon(() => <GlobeIcon size={24} />),
    },
    stack: ["TypeScript", "Python", "React"],

    startDate: new Date(2018, 3, 16), // april 2018
    endDate: new Date(2021, 2, 25),

    description:
      "Built many frontend and backend projects, sometimes did simple UI/UX design and other tasks",
  },
];

const experienceToCardGroup = (experience: ExperiencePiece): CardGroupProps => {
  const dateRange = formatDateRange(experience.startDate, experience.endDate);

  return {
    headerCards: [
      {
        title: experience.companyName,
        icon: experience.icon,
        subtitle: <StackList stack={experience.stack} />,
        cardType: "experience",
      },
      {
        title: dateRange.duration,
        subtitle: (
          <span className="card__subtitle-alpha">{dateRange.range}</span>
        ),
        cardType: "time",
      },
    ],
    contentCards: [
      { text: experience.description },
      { text: experience.companyDescription },
    ],
  };
};

export const Experience: FunctionalComponent = () => {
  return (
    <div className="card-section">
      <h2>Experience</h2>
      {experiences.map((exp) => (
        <CardGroup {...experienceToCardGroup(exp)} />
      ))}
    </div>
  );
};
