import { Icon } from "@primer/octicons-react";
import { useAtom } from "jotai";
import { FunctionalComponent } from "preact";
import { makePaddedIcon } from "../components/Card/paddedIcon";
import { CardGroup, CardGroupProps } from "../components/CardGroup";
import { JSLogo, TSLogo } from "../components/icons/CornerLogo";
import { PythonLogo } from "../components/icons/PythonLogo";
import { ReactLogo } from "../components/icons/ReactLogo";
import { colorfulAtom } from "../state/colorful";
import { formatDateRange } from "../utils/date";
import { getColor, paintStack, StackList } from "./common";

type StackData = {
  main: string;
  extra: string[];
  icon: {
    icon: Icon;
    invertColor?: boolean;
  };
  startDate: Date;
};

const stacks: StackData[] = [
  {
    main: "Python",
    extra: ["FastAPI", "NumPy", "aiohttp"],
    icon: {
      invertColor: true,
      icon: makePaddedIcon(PythonLogo),
    },
    startDate: new Date(2018, 2, 1),
  },
  {
    main: "JavaScript",
    extra: [],
    icon: {
      invertColor: true,
      icon: JSLogo,
    },
    startDate: new Date(2020, 8, 1),
  },
  {
    main: "React",
    extra: ["Redux", "Jotai", "React Native"],
    icon: {
      invertColor: true,
      icon: makePaddedIcon(ReactLogo),
    },
    startDate: new Date(2020, 10, 1),
  },
  {
    main: "TypeScript",
    extra: ["Webpack", "Jest", "SCSS"],
    icon: {
      invertColor: true,
      icon: TSLogo,
    },
    startDate: new Date(2021, 8, 1),
  },
];

const stackToCardGroup = (stack: StackData): CardGroupProps => {
  const [isColored] = useAtom(colorfulAtom);
  const title = paintStack(stack.main, isColored);
  const dateRange = formatDateRange(stack.startDate);

  return {
    headerCards: [
      {
        icon: {
          ...stack.icon,
          color: `var(--${getColor(stack.main, isColored)})`,
          invertColor: isColored,
        },
        title: title,
        subtitle: <StackList stack={stack.extra} isColored={false} />,
      },
      {
        title: dateRange.duration,
        subtitle: (
          <span className="card__subtitle-alpha">{dateRange.range}</span>
        ),
      },
    ],
  };
};

export const Stack: FunctionalComponent = () => {
  return (
    <div className="card-section">
      <h2>Tech Stack</h2>
      {stacks
        .slice(0)
        .reverse()
        .map((e) => (
          <CardGroup {...stackToCardGroup(e)} />
        ))}
    </div>
  );
};
