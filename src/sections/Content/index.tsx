import { FunctionalComponent } from "preact";
import { Experience } from "../../cards/experience";
import { Interests } from "../../cards/preferences";
import { Stack } from "../../cards/stack";
import "./style.scss";

export const Content: FunctionalComponent = () => {
  return (
    <div className="scroll-portal content-portal">
      <section className="content">
        <Experience />
        <Stack />
        <Interests />
      </section>
    </div>
  );
};
