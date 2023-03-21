import { FunctionalComponent } from "preact";
import { StackList } from "../../cards/common";
import "./style.scss";

type Project = {
  title: string;
  description?: string;
  stack: string[];
  href: string;
};

const projects: Project[] = [
  {
    title: "GitHub profile",
    description: "Check out my GitHub page for various projects",
    stack: ["Python", "TypeScript", "Preact"],
    href: "https://github.com/evtn",
  },
  {
    title: "MonCalc",
    description: "Monitor specs calculator",
    stack: ["TypeScript", "Preact"],
    href: "https://moncalc.evtn.me",
  },
  {
    title: "Kartuli",
    description: "A basic guide to Georgian alphabet (in Russian)",
    stack: ["TypeScript", "Preact"],
    href: "https://kartuli.evtn.me",
  },
  {
    title: "New Year Countdown",
    description:
      "A simple countdown page with some snow (only snows in winter)",
    stack: ["TypeScript", "Preact"],
    href: "https://newyear.evtn.me",
  },
  {
    title: "soda",
    description: "Fast XML/SVG builder in Python",
    stack: ["Python"],
    href: "https://github.com/evtn/soda",
  },
  {
    title: "rgx",
    description: "Typed regexp builder in Python",
    stack: ["Python"],
    href: "https://github.com/evtn/rgx",
  },
  {
    title: "gekkota",
    description: "Python code generation in Python",
    stack: ["Python"],
    href: "https://github.com/courage-tci/gekkota",
  },
];

const Project: FunctionalComponent<{ project: Project }> = ({ project }) => {
  return (
    <a className="project" href={project.href}>
      <div className="project__header">
        <h2>{project.title}</h2>
        <StackList stack={project.stack} filled />
      </div>
      {project.description ? <p>{project.description}</p> : null}
    </a>
  );
};

export const ProjectSection: FunctionalComponent = () => {
  return (
    <section className="projects">
      <h1>My projects</h1>
      <p>
        Keep in mind this is not <i>everything</i> I've worked on, these are
        just some things you can check out right now
      </p>
      {projects.map((p) => (
        <Project project={p} />
      ))}
    </section>
  );
};
