import { PDFSettings } from ".";

import { CardType } from "@/types/card";

const CURRENT_VERSION = 2;

const availableSections: CardType[] = [
    "position",
    "project",
    "stack",
    "history",
];

const extraKeys = ["plans", "compact", "card_colors", "configurable"] as const;
const newExtraKeys = ["reversed", "hide_compensation"] as const;

const break8 = (n: number): [number, number] => [n & 0xf, n >> 4];

const breakVariable = (n: bigint): number[] => {
    const result: number[] = [];

    if (n < 0n) {
        return [];
    }

    while (n > 0n) {
        result.push(Number(n & 15n));
        n >>= 4n;
    }
    return result;
};

const packFlags = <T extends readonly (keyof PDFSettings)[]>(
    keys: T,
    data: PDFSettings,
) => keys.reduce((a, b, i) => a + (+data[b] << i), 0);

export const convert = (data: PDFSettings): string => {
    const compensation = (BigInt(data.compensation) - 3000n) / 100n;
    const theme = (+!!data.contrast << 1) | +!!data.light;
    const monospace = +!!data.monospace;
    const lowercase = +!!data.lowercase;
    const sections = availableSections.reduce(
        (acc, elem, i) => acc | (+data.sections.includes(elem) << i),
        0,
    );
    const extra = packFlags(extraKeys, data);
    const newExtra = packFlags(newExtraKeys, data);

    return [
        ...break8(CURRENT_VERSION),
        theme | (lowercase << 2) | (monospace << 3),
        sections,
        ...breakVariable(compensation),
        newExtra,
        extra,
    ]
        .map((n, i) => "0123456789abcdef"[n])
        .join("");
};
