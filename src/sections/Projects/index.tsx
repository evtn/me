import { ComponentChildren, FunctionalComponent } from "preact";
import {
  CardGroup,
  CardIconData,
  Logo,
  SidebarEntry,
  StackList,
} from "@/components";
import "./style.scss";
import { range } from "@/utils/range";
import { CardSubsection } from "@/components";
import {
  ArrowUpRightIcon,
  DeviceDesktopIcon,
  DotFillIcon,
  GitCompareIcon,
  MarkGithubIcon,
  NorthStarIcon,
  PersonIcon,
} from "@primer/octicons-react";
import { getClassName } from "@/utils/classname";
import { settingsAtom } from "@/state/settings";
import { useAtom } from "jotai";

type Project = {
  title: string;
  description?: string;
  stack: string[];
  href?: string;
  repo?: string;
  icon?: CardIconData;
};

const projects: Project[] = [
  {
    title: "evtn.me",
    description: "This website",
    icon: {
      icon: () => <Logo />,
      color: "purple",
    },
    stack: ["TypeScript", "Preact"],
    href: "https://evtn.me",
    repo: "https://github.com/evtn/me",
  },
  {
    title: "MonCalc",
    description:
      "Monitor specs calculator (soon to be rewritten and opensourced)",
    icon: {
      icon: () => <DeviceDesktopIcon size="24" />,
      color: "blue",
    },
    stack: ["TypeScript", "Preact"],
    href: "https://moncalc.evtn.me",
  },
  {
    title: "Kartuli",
    description: "A basic guide to Georgian alphabet (in Russian)",
    icon: {
      icon: () => <h3>ჭ</h3>,
      color: "pink",
    },
    stack: ["TypeScript", "Preact"],
    href: "https://kartuli.evtn.me",
  },
  {
    title: "New Year Countdown",
    description:
      "A simple countdown page with some snow (only snows in winter)",
    icon: {
      icon: () => <NorthStarIcon size="24" />,
      color: "green",
    },
    stack: ["TypeScript", "Preact"],
    href: "https://newyear.evtn.me",
    repo: "https://github.com/evtn/newyear",
  },
  {
    title: "soda",
    description: "Fast XML/SVG builder in Python",
    icon: {
      icon: () => <code>&lt;svg&gt;</code>,
      color: "purple",
    },
    stack: ["Python"],
    href: "https://github.com/evtn/soda",
  },
  {
    title: "rgx",
    description: "Typed regexp builder in Python",
    icon: {
      icon: () => <code>/a+/</code>,
      color: "red",
    },
    stack: ["Python"],
    href: "https://github.com/evtn/rgx",
  },
  {
    title: "gekkota",
    description: "Python code generation in Python",
    icon: {
      icon: () => <code>.py</code>, // &#123;&#125;
      color: "orange",
    },
    stack: ["Python"],
    href: "https://github.com/courage-tci/gekkota",
  },
  {
    title: "easypoint",
    description: "Minimal general-purpose vector / matrix arithmetics library ",
    icon: {
      icon: () => <DotFillIcon size="24" />,
      color: "green",
    },
    stack: ["Python"],
    href: "https://github.com/evtn/easypoint",
  },
  {
    title: "tomata",
    description: "Generic stateful event-based flow framework",
    icon: {
      icon: () => <GitCompareIcon size={24} />,
      color: "red",
    },
    stack: ["Python"],
    href: "https://github.com/evtn/tomata",
  },
];

const frontEndProjects: Project[] = projects.filter((project) =>
  project.stack.includes("TypeScript"),
);

const pythonProjects: Project[] = projects.filter((project) =>
  project.stack.includes("Python"),
);

const getGHRegexp = () => /https:\/\/github.com\/([\w.-]+\/[\w.-]+)/;

const isGithub = (project: Project) => {
  return !!(project.href && getGHRegexp().test(project.href));
};

const getRepoText = (repo: string): string => {
  const match = repo.match(getGHRegexp());
  if (!match) {
    return "repo";
  }

  return match[1];
};

const ProjectRepo: FunctionalComponent<{ repo: string; color?: string }> = ({
  repo,
  color,
}) => {
  const colorClass = color ? `colored-${color}` : undefined;
  return (
    <a
      href={`https://github.com/${repo}`}
      class={getClassName("project__repo", colorClass)}
    >
      <MarkGithubIcon className="repo-icon" />
      <code>{repo}</code>
    </a>
  );
};

const Project: FunctionalComponent<{ project: Project }> = ({ project }) => {
  const isGH = isGithub(project);
  const href = isGH ? undefined : project.href;
  const repo = isGH ? project.href : project.repo;
  const headerColor = project.icon ? project.icon.color : undefined;

  return (
    <CardGroup
      className="project"
      headerCards={[
        {
          title: (
            <>
              {project.title}
              {href ? (
                <div className="project__link">
                  <ArrowUpRightIcon />
                </div>
              ) : undefined}
            </>
          ),
          subtitle: <StackList stack={project.stack} />,
          icon: project.icon,
          href,
          color: headerColor,
        },
      ]}
      contentCards={[
        {
          text: (
            <>
              {project.description && <span>{project.description}</span>}
              {repo ? (
                <ProjectRepo repo={getRepoText(repo)} color={headerColor} />
              ) : undefined}
            </>
          ),
          color: "dark",
        },
      ]}
    />
  );
};

const ProjectGroup: FunctionalComponent<{
  header: ComponentChildren;
  projects: Project[];
  color: string;
}> = ({ header, projects, color }) => {
  const pairCount = Math.ceil(projects.length / 2);

  return (
    <div className={getClassName("project-group", `colored-${color}`)}>
      <h2 className="project-group__header">{header} projects</h2>
      {range(pairCount).map((e) => (
        <CardSubsection>
          {projects.slice(e * 2, (e + 1) * 2).map((project) => (
            <Project project={project} />
          ))}
        </CardSubsection>
      ))}
    </div>
  );
};

export const ProjectSection: FunctionalComponent = () => {
  const pairCount = Math.ceil(projects.length / 2);

  return (
    <section className="projects">
      <h1>
        My projects&nbsp;&nbsp;
        <ProjectRepo repo="evtn" color="text" />
      </h1>
      <p>
        Keep in mind this is not <i>everything</i> I've worked on, these are
        just some things you can check out right now
      </p>
      <ProjectGroup
        header={<span className="colored">Front-End</span>}
        projects={frontEndProjects}
        color="yellow"
      />
      <ProjectGroup
        header={<span className="colored">Python</span>}
        projects={pythonProjects}
        color="blue"
      />
    </section>
  );
};
