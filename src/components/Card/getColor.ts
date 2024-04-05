import { CardType, Color } from "@/types";

const colors: Record<CardType, Color> = {
    position: "blue",
    project: "green",
    stack: "orange",
    history: "red",
};

export const getCardColor = (entryType?: CardType): Color => {
    return colors[entryType || "project"];
};
