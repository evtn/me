import { FunctionalComponent } from "preact";
import { useMemo } from "preact/hooks";

import { Logo, MoneyEntry, SettingsBar, SidebarEntry } from "@/components";
import { useSettings } from "@/hooks";
import { Icon } from "@/icons";
import { Color } from "@/types";
import { classBuilder, getEntries } from "@/utils";

import { entries } from "@/data/sidebar";
import { IconKey } from "@/icons/icon";
import { SettingKey, Settings, settingsData } from "@/state/settings";

import "./style.css";

const switchColors: Record<SettingKey, Color> = {
    monospace: "orange",
    lowercase: "blue",
    compact: "green",
    colors: "red",
    colorful: "cyan",
    neon: "pink",
};

const switchIcons: Record<SettingKey, (value: boolean) => IconKey> = {
    monospace: (value) => (value ? "monospace" : "proportional"),
    lowercase: (value) => (value ? "lowercase" : "normalcase"),
    compact: (value) => (value ? "minimize" : "expand"),
    colors: (value) => (value ? "contrast" : "contrastOff"),
    colorful: (value) => (value ? "colors" : "colorsOff"),
    neon: (value) => (value ? "bulb" : "bulbOff"),
};

const classname = classBuilder("sidebar");
const element = classname.element;

const buildSwitches = (settings: Settings) => {
    return getEntries(settings).map(([key, value]) => ({
        name: settingsData[key].name,
        key,
        value,
        color: switchColors[key],
        shown: true,
        description: settingsData[key].description,
        icon: switchIcons[key](value),
    }));
};

export const Sidebar: FunctionalComponent = () => {
    const [settings, setSettings] = useSettings();

    const switches = useMemo(() => buildSwitches(settings), [settings]);

    const entriesContent = entries.map((e) => <SidebarEntry data={e} />);

    entriesContent.splice(1, 0, <MoneyEntry />);

    return (
        <div className="sidebar-portal">
            <SettingsBar
                data={switches}
                onClick={setSettings}
                title="Settings"
                icon="settings"
            />
            <section className={classname.color("blue").build()}>
                <div className={element("header").build()}>
                    <div className={element("logo").build(classname.card)}>
                        <Logo />
                    </div>
                    <div
                        className={element("header-text").build(classname.card)}
                    >
                        <h1 className={element("name").build()}>
                            Dmitry Gritsenko
                        </h1>
                        <h2 className={element("specialization").build()}>
                            <span
                                className={classBuilder("")
                                    .color("orange")
                                    .build()}
                            >
                                <Icon iconKey="react" />
                                Front-end&nbsp;Developer
                            </span>
                            <br />
                            <span>
                                <Icon iconKey="python" /> Python&nbsp;Developer
                            </span>
                        </h2>
                    </div>
                </div>
                <div className={element("info").build()}>{entriesContent}</div>
            </section>
        </div>
    );
};
