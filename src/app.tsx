import { useAtom } from "jotai";
import { useMemo } from "preact/hooks";

import { PopupContainer } from "@/components";

import { Content } from "@/sections/Content";
import { SideBar } from "@/sections/SideBar";

import { popupAtom } from "@/state/popup";
import { settingsAtom } from "@/state/settings";

import "./app.scss";
import "./styles/colors.css";

export const App = () => {
  const [settings] = useAtom(settingsAtom);
  const [popupContents] = useAtom(popupAtom);

  const data = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(settings).map(([key, value]) => [
          `data-${key.toLowerCase()}`,
          String(value),
        ]),
      ),
    [settings],
  );

  return (
    <main
      {...data}
      // onWheel={(e) => {
      //   if (popupContents) {
      //     e.preventDefault();
      //   }
      // }}
    >
      <SideBar />
      <Content />
      <PopupContainer />
    </main>
  );
};
