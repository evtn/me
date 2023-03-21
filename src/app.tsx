import { useAtom } from "jotai";
import "./app.scss";
import { PopupContainer } from "./components/Popup";
import { Content } from "./sections/Content";
import { SideBar } from "./sections/SideBar";
import { colorfulAtom } from "./state/colorful";
import "./styles/colors.css";

export function App() {
  const [isColored] = useAtom(colorfulAtom);

  return (
    <main data-colors={isColored}>
      <SideBar />
      <Content />
      <PopupContainer />
    </main>
  );
}
