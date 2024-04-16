import { IconBulldozer } from "@tabler/icons-react";
import { FunctionalComponent } from "preact";
import { Suspense, lazy } from "preact/compat";

import { type IconKey, IconProps } from "./base";

const LoadedIcon = lazy(async () => (await import("./iconPack")).LoadedIcon);

export const Icon: FunctionalComponent<{ iconKey: IconKey } & IconProps> = (
    props,
) => {
    return (
        <Suspense fallback={<IconBulldozer />}>
            <LoadedIcon {...props} />
        </Suspense>
    );
};
