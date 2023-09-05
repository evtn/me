import { FunctionalComponent } from "preact";
import { CardGroup, CardIconData, StackList } from "@/components";
import "./style.scss";
import { range } from "@/utils/range";
import { CardSubsection } from "@/components";
import {
  ArrowUpRightIcon,
  DeviceDesktopIcon,
  DotFillIcon,
  MarkGithubIcon,
  NorthStarIcon,
} from "@primer/octicons-react";
import { getClassName } from "@/utils/classname";

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
    title: "GitHub profile",
    description:
      "My GitHub profile, home to several projects, some of which are not listed here.",
    stack: ["Python", "TypeScript", "Preact"],
    icon: {
      icon: () => <MarkGithubIcon size="24" />,
      color: "text",
      invertColor: true,
    },
    href: "https://github.com/evtn",
  },
  {
    title: "MonCalc",
    description:
      "Monitor specs calculator (soon to be rewritten and opensourced)",
    icon: {
      icon: () => <DeviceDesktopIcon size="24" />,
      color: "blue",
      invertColor: true,
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
      invertColor: true,
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
      invertColor: true,
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
      invertColor: true,
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
      invertColor: true,
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
      invertColor: true,
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
      invertColor: true,
    },
    stack: ["Python"],
    href: "https://github.com/evtn/easypoint",
  },
];

const isGithub = (project: Project) => {
  return !!(
    project.href && /https:\/\/github.com\/[\w-]+\/.+/.test(project.href)
  );
};

const Project: FunctionalComponent<{ project: Project }> = ({ project }) => {
  const isGH = isGithub(project);
  const href = isGH ? undefined : project.href;
  const repo = isGH ? project.href : project.repo;
  const colorClass = project.icon ? `colored-${project.icon.color}` : undefined;

  return (
    <CardGroup
      headerCards={[
        {
          title: (
            <>
              {project.title}
              {href ? (
                <ArrowUpRightIcon className="project__link" />
              ) : undefined}
            </>
          ),
          subtitle: <StackList stack={project.stack} />,
          icon: project.icon,
          href,
        },
      ]}
      contentCards={[
        {
          text: (
            <>
              {project.description && <span>{project.description}</span>}
              {repo ? (
                <a
                  href={repo}
                  class={getClassName("project__repo", colorClass)}
                >
                  <MarkGithubIcon className="repo-icon" /> Repo
                </a>
              ) : undefined}
            </>
          ),
        },
      ]}
    />
  );
};

export const ProjectSection: FunctionalComponent = () => {
  const pairCount = Math.ceil(projects.length / 2);

  return (
    <section className="projects">
      <h1>My projects</h1>
      <p>
        Keep in mind this is not <i>everything</i> I've worked on, these are
        just some things you can check out right now
      </p>
      {range(pairCount).map((e) => (
        <CardSubsection>
          {projects.slice(e * 2, (e + 1) * 2).map((project) => (
            <Project project={project} />
          ))}
        </CardSubsection>
      ))}
    </section>
  );
};
