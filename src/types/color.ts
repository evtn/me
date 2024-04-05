export const colors = [
    "text",
    "red",
    "orange",
    "yellow",
    "green",
    "cyan",
    "blue",
    "purple",
    "pink",
] as const;

export type Color = (typeof colors)[number];

export let colorClasses: Record<Color, string> = {} as Record<Color, string>;

colors.forEach((color) => {
    colorClasses[color] = `colored-${color}`;
});
