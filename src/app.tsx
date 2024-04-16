import { useAtomValue } from "jotai";
import Router, { Route } from "preact-router";
import Match from "preact-router/match";

import { PopupContainer, Sidebar, Timeline } from "@/components";
import { useRouting, useSettingsDataset } from "@/hooks";

import "@/styles/colors.css";
import "@/styles/fonts.css";

import "./app.css";

import { colorShiftAtom } from "./state/settings";

const AppContents = () => {
    const dataset = useSettingsDataset();
    useAtomValue(colorShiftAtom);

    return (
        <main {...dataset}>
            <Match default>{useRouting}</Match>
            <Sidebar />
            <Timeline />
            <PopupContainer />
        </main>
    );
};
export const App = () => {
    return (
        <Router>
            <Route default component={AppContents} />
        </Router>
    );
};
