import { FunctionalComponent } from "preact";

import { IconProps } from "./base";
import { iconList } from "./iconPack";

export type IconKey = keyof typeof iconList;

export const Icon: FunctionalComponent<{ iconKey: IconKey } & IconProps> = (
    { iconKey, ...rest },
) => {
    const IconBase = iconList[iconKey];
    return <IconBase {...rest} />;
};
