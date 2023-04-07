import { useAtom } from "jotai";
import { useEffect } from "preact/hooks";
import "./app.scss";
import { PopupContainer } from "./components/Popup";
import { Content } from "./sections/Content";
import { SideBar } from "./sections/SideBar";
import { colorfulAtom } from "./state/colorful";
import "./styles/colors.css";

export function App() {
  const [isColored] = useAtom(colorfulAtom);

  useEffect(() => {
    document.documentElement.setAttribute("data-colors", String(isColored));
  }, [isColored]);

  return (
    <main>
      <SideBar />
      <Content />
      <PopupContainer />
    </main>
  );
}
