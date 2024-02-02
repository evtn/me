import { FunctionalComponent } from "preact";
import { route } from "preact-router";

import { useSettings } from "@/hooks";
import { classBuilder } from "@/utils";

import "./style.css";

const classname = classBuilder("logo");

export const Logo: FunctionalComponent = () => {
    const [settings] = useSettings();

    return (
        <svg
            className={classname.build()}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-16 -16 288 288"
            data-hovered={true}
            onClick={() => route("/logo")}
        >
            <g>
                <text
                    fill="currentColor"
                    font-family={
                        settings.monospace ? "JetBrains Mono" : "Rethink Sans"
                    }
                    font-size={settings.monospace ? 15 : 19}
                    font-weight="700"
                    className="logo__text"
                >
                    <textPath href="#circle">
                        Photo from this CV is on a vacation for an indefinite
                        period of time, sorry for the inconvenience.
                    </textPath>
                </text>
                <circle cx="128" cy="128" r="128" id="circle" fill-opacity="0">
                    <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        from="0 128 128"
                        to="360 128 128"
                        dur="30s"
                        repeatCount="indefinite"
                    />
                </circle>
            </g>
            <g
                fill="var(--logo-accent)"
                stroke="var(--logo-back)"
                stroke-width="3"
            >
                <path d="m102.28 62.98 11.343 11.343-16.607 61.98-11.344-11.343zm51.45 130.034-11.343-11.343 16.607-61.979 11.344 11.343zm-94.9-75.244 15.495-4.152 45.372 45.372-15.494 4.152z" />
                <path d="m197.17 138.23-15.495 4.152-45.373-45.372 15.495-4.152zM84.56 182.784l4.151-15.495 61.98-16.608-4.151 15.495z" />
                <path d="m171.45 73.21-4.152 15.495-61.979 16.608 4.152-15.496zM40.3 79.58l15.495-4.152 34.029 34.029-4.151 15.495zm175.41 96.827-15.495 4.152-34.03-34.03 4.152-15.494zm-173.48 3.338 4.152-15.495 46.484-12.456 11.344 11.344z" />
                <path d="m213.78 76.25-4.152 15.495-46.484 12.455L151.8 92.857zm-87.7-48.42 11.344 11.344-12.455 46.484-15.495 4.152zm3.85 200.327-11.344-11.344 12.455-46.484 15.495-4.152z" />
            </g>
        </svg>
    );
};
