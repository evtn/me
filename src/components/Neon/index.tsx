import { colors } from "@/types";

const provider = (
    <svg width="0" height="0">
        <defs>
            {colors.map((color) => (
                <filter
                    id={`neon-${color}`}
                    x="-75%"
                    y="-75%"
                    width="250%"
                    height="250%"
                    filterUnits="objectBoundingBox"
                    key={color}
                >
                    <feDropShadow
                        dx="0"
                        dy="0"
                        stdDeviation="7"
                        flood-color={`var(--${color})`}
                        floodOpacity="0.5"
                    />
                </filter>
            ))}
        </defs>
    </svg>
);

export const NeonProvider = () => provider;
