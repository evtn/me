import { PDFSettings } from ".";

import { CardType } from "@/types/card";

const CURRENT_VERSION = 0;

const availableSections: CardType[] = [
    "position",
    "project",
    "stack",
    "history",
];

const extraKeys = ["plans", "compact", "card_colors", "configurable"] as const;

const break8 = (n: number): [number, number] => [n & 0xf, n >> 4];

const breakVariable = (n: number): number[] => {
    const result = [];

    if (n < 0) {
        n = 0;
    }

    while (n > 0) {
        result.push(n & 0xf);
        n >>= 8;
    }
    return result;
};

export const convert = (data: PDFSettings): string => {
    const compensation = Math.floor((+data.compensation - 3000) / 100);
    const theme = (+!!data.contrast << 1) | +!!data.light;
    const monospace = +!!data.monospace;
    const lowercase = +!!data.lowercase;
    const sections = availableSections.reduce(
        (acc, elem, i) => acc | (+data.sections.includes(elem) << i),
        0,
    );

    const extra = extraKeys.reduce((a, b, i) => a + (+data[b] << i), 0);

    return [
        ...break8(CURRENT_VERSION),
        theme | (lowercase << 2) | (monospace << 3),
        sections,
        ...breakVariable(compensation),
        extra,
    ]
        .map((n, i) => "0123456789abcdef"[n])
        .join("");
};
