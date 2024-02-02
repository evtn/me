import { FunctionalComponent } from "preact";

type ReactVariant = "react" | "preact";

export const ReactLogo: FunctionalComponent<{ variant?: ReactVariant }> = (
    { variant },
) => {
    variant = variant || "react";

    const extraRing =
        variant === "react" ? (
            <use href="#e" transform="rotate(80 12 12)" />
        ) : undefined;

    return (
        <svg
            viewBox="-1 -1 26 26"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
            <defs>
                <ellipse cx="12" cy="12" rx="12" ry="5" id="e" />
            </defs>
            <g stroke-width="1.5" stroke="currentColor">
                {extraRing}
                <use href="#e" transform="rotate(140 12 12)" />
                <use href="#e" transform="rotate(200 12 12)" />
            </g>
            <circle cx="12" cy="12" fill="currentColor" r="1.5" />
        </svg>
    );
};
