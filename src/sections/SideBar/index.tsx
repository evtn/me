import { useAtom } from "jotai";
import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import { Logo } from "../../components/Logo";
import { MoneyEntry } from "../../components/MoneyEntry";
import { Switch } from "../../components/Switch";
import { colorfulAtom } from "../../state/colorful";
import { ProjectsEntry } from "../Projects/entry";
import { entries, SidebarEntry } from "./entry";
import "./style.scss";

type SideBarProps = {};

export const SideBar: FunctionalComponent<SideBarProps> = ({}) => {
  const [isColored, setIsColored] = useAtom(colorfulAtom);
  const [specialization, setSpecialization] = useState(0);

  const incrementSpecialization = () => setSpecialization((v) => v + 1);

  return (
    <div
      className="scroll-portal sidebar-portal"
      style={{ "--icon-color": isColored ? "var(--accent)" : "var(--text)" }}
    >
      <section className="sidebar">
        <Logo />
        <h1 className="sidebar__name">Dmitry Gritsenko</h1>
        <div className="sidebar__info">
          <h2 onClick={incrementSpecialization}>
            {["Frontend", "Python"][specialization % 2]} Developer
          </h2>

          {entries.map((e) => (
            <SidebarEntry data={e} />
          ))}

          <MoneyEntry />
          <ProjectsEntry />
          <Switch
            label={`${isColored ? "more" : "no"} colors`}
            onSwitch={(state) => setIsColored(state)}
            defaultState={isColored}
            externalClassName="sidebar-entry__link"
          />
        </div>
      </section>
    </div>
  );
};
