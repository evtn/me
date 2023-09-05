import { settingsAtom } from "@/state/settings";
import { useAtom } from "jotai";
import { FunctionalComponent } from "preact";
import { story } from "../../utils/story";
import { usePopup } from "../Popup";
import "./style.scss";

export const Logo: FunctionalComponent = () => {
  const setPopupContents = usePopup();
  const [settings] = useAtom(settingsAtom);

  return (
    <svg
      className="logo"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      onClick={() => setPopupContents(story)}
    >
      <defs>
        <mask id="logo-mask"></mask>
      </defs>
      <g>
        <text
          fill="var(--icon-color)"
          font-family={settings.Monospace ? "Fira Code" : "Manrope"}
          font-size={settings.Monospace ? 11.2 : 14.6}
          font-weight="bold"
          className="logo__text"
        >
          <textPath href="#circle">
            Photo from this CV is on a vacation for an indefinite period of
            time, sorry for the inconvenience.
          </textPath>
        </text>
        <path
          id="circle"
          fill="#fff"
          fill-opacity="0"
          d="M234 128a106 106 0 0 1-106 106 106 106 0 0 1-106-106 106 106 0 0 1 106-106 106 106 0 0 1 106 106z"
        />
      </g>
      <g
        fill="none"
        stroke="var(--icon-color)"
        stroke-linecap="round"
        stroke-miterlimit="8"
        stroke-width="8"
      >
        <path d="M201.455 172.32l-67.299-67.299m-4.511-62.791l-24.633 91.932M52.9 169.46l91.932-24.633" />
        <path d="M100.505 71.37l-12.317 45.966m50.477 50.474l-45.966 12.317m98.096-47.617l-33.649-33.649" />
        <path d="M203.105 86.54l-91.932 24.633M54.55 83.69l67.299 67.299m4.501 62.781l24.633-91.932" />
        <path d="M65.205 123.49l33.649 33.649M167.81 138.67l-12.317 45.966m7.807-108.756l-45.966 12.317" />
      </g>
    </svg>
  );
};
