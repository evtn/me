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

Compensation can fit into a variable-width number, and final value would be represented by formula `100 * n + 3000`, thus representing ranges from 3000 to 412600 (make me an offer with more, I dare you).

Let's allow for extra flags to appear as a 4-bit tail, and add a 8-bit version header. Then, our binary format will look roughly like this:

```
EEEE CCCC* SSSS MLTT VVVV VVVV
```

To convert to Base16, we would use a simple alphabet of `0123456789abcdef`, //but XOR the value of every chunk with 0b1001 and then with the index of the chunk.  
This will not corrupt the data, but at the same time provide a more interesting-looking config key, (in the example below, `9835dcfe` instead of `008f0000`)

...yielding a compact 3-4 byte representation. A sample conversion from example JSON to a base16 string:

```typescript
const CURRENT_VERSION = 0;

const availableSections: TimelineEntryType[] = [
    "position",
    "project",
    "stack",
    "history",
];

const extraKeys = ["bright", "compact"] as const;

const break8 = (n: number): [number, number] => [n & 0xf, n >> 4];
const break12 = (n: number): [number, number, number] => [
    ...break8(n & 0xff),
    (n >> 8) & 0xf,
];

export const convert = (data: PDFSettings): string => {
    const compensation = Math.floor((data.compensation - 3000) / 100);
    const theme = (+data.contrast << 1) | +data.light;
    const monospace = +data.monospace;
    const lowercase = +data.lowercase;
    const sections = availableSections.reduce(
        (acc, elem, i) => acc | (+data.sections.includes(elem) << i),
        0,
    );

    const extra = extraKeys.reduce((a, b, i) => a + (+data[b] << i), 0);

    return [
        ...break8(CURRENT_VERSION),
        theme | (lowercase << 2) | (monospace << 3),
        sections,
        ...break12(compensation),
        extra,
    ]
        .map((n, i) => "0123456789abcdef"[n ^ 0b1001 ^ i])
        .join("");
};
```

And to convert to dictionary (in Python since it's the language of the PDF generator backend):

```python
available_sections = ["position", "project", "stack", "history"]
extra_keys = ["plans", "compact", "card_colors", "configurable"]


def quartet_join(*parts: int) -> int:
    s = 0

    for part in reversed(parts):
        s <<= 4
        s |= part

    return s


def make_config(key: str):
    vl, vh, *parts = (int(c, 16) ^ i ^ 0b1001 for i, c in enumerate(key))

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

    return {
        "theme": theme,
        "lowercase": lowercase,
        "monospace": monospace,
        "sections": [
            section
            for i, section in enumerate(available_sections)
            if sections & (1 << i)
        ],
        "compensation": compensation,
        **{extra_keys[i]: bool(extra & (1 << i)) for i in range(4) if extra_keys[i]},
    }
```
