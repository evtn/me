# Config Binary Format Spec (CBF)

CV config is a small piece of data. That allows making any configuration be represented with a small sequence of bytes, represented in URL with Base16.

Sample JSON:

```json
{
    "theme": "dark", // four variants: "dark", "light", "highcontrast_dark", "highcontrast_light"
    "lowercase": false,
    "monospace": true,
    "sections": ["position", "project", "stack", "history"], // set of values
    "compensation": 3000 // a number with increments of 100, starting from 3000

    // extra keys
    "bright": false,
    "compact": false,
}
```

Let's start with a theme. It can be one of four values, so 2 bits. It's convenient to use one bit for contrast setting and one for light/dark switch:

```
00 - dark
01 - light
10 - highcontrast_dark
11 - highcontrast_light
```

Now, we have two flags: `lowercase` and `monospace`. These fit nicely into one bit each, in the same order.

Then we have sections set. It is a set of fixed strings (all of which are in the example). Let's use 4 bits to represent it, with the order as defined in example.

Compensation can fit into a variable-width integer, and final value would be represented by formula `100 * n + 3000`

Let's allow for extra flags to appear as a 4-bit tail, and add a 8-bit version header. Then, our binary format will look roughly like this:

```
VVVV VVVV MLTT SSSS CCCC* EEEE
```

To convert to Base16, we would use a simple alphabet of `0123456789abcdef`

...yielding a compact 3+ byte representation. A sample conversion from example JSON to a base16 string:

```typescript
// that's converter.ts from the same folder
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

export const convert = (data: PDFSettings): string => {
    const compensation = (BigInt(data.compensation) - 3000n) / 100n;
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
```

And to convert to dictionary (in Python since it's the language of the PDF generator backend):

```python
# this is a simplified example, real backend does some optimizations and tweaks

available_sections = ["position", "project", "stack", "history"]
extra_keys = ["plans", "compact", "card_colors", "configurable"]


def quartet_join(*parts: int) -> int:
    s = 0

    for part in reversed(parts):
        s <<= 4
        s |= part

    return s


def make_config(key: str) -> Config:
    vl, vh, *parts = (int(c, 16) for i in key)

    version = quartet_join(vl, vh)

    if version != 0:
        raise ValueError(f"wrong version: {version}")

    appearance, sections, *c, extra = parts

    theme = "light" if appearance & 1 else "dark"

    if appearance & 2:
        theme = "highcontrast_" + theme

    lowercase = bool(appearance & 4)
    monospace = bool(appearance & 8)

    compensation = 3000 + quartet_join(*c) * 100

    value: Config = {
        "theme": theme,
        "lowercase": lowercase,
        "monospace": monospace,
        "sections": [
            section
            for i, section in enumerate(available_sections)
            if sections & (1 << i)
        ],
        "compensation": round_large(compensation),
    }

    extra_i = 0

    while extra:
        key = extra_keys[extra_i]

        if not key:
            continue

        value[key] = bool(extra & 1)
        extra >>= 1
        extra_i += 1

    return value
```
