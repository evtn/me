import { useAtom } from "jotai";
import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import { ProjectsEntry } from "../Projects/entry";
import { entries } from "./entry";
import { SidebarEntry, Logo, MoneyEntry, Switch } from "@/components";
import { Settings, settingsAtom } from "@/state/settings";

import "./style.scss";

export const SideBar: FunctionalComponent = () => {
  const [settings, setSettings] = useAtom(settingsAtom);

  const toggleSetting = (toggleKey: string, newValue: boolean) => {
    const newSettings: Settings = {};

    Object.entries(settings).map(([key, value]) => {
      newSettings[key] = key === toggleKey ? newValue : value;
    });

    setSettings(newSettings);
  };

  const switches = Object.entries(settings).map(([key, value]) => (
    <Switch
      label={key}
      onSwitch={(newValue) => toggleSetting(key, newValue)}
      currentValue={value}
      className="sidebar-entry__link"
    />
  ));

  const [specialization, setSpecialization] = useState(0);

  const incrementSpecialization = () => setSpecialization((v) => v + 1);

  return (
    <div
      className="scroll-portal sidebar-portal"
      style={{ "--icon-color": "var(--accent)" }}
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

          {switches}
        </div>
      </section>
    </div>
  );
};
