import { CardComponent } from ".";

import { Icon } from "@/icons";
import { classBuilder } from "@/utils";

const classname = classBuilder("card");

export const CardIcon: CardComponent = ({ data }) => {
    const isPaddingThin = ["javascript", "typescript"].includes(data.icon);

    return (
        <div
            className={classname
                .element("icon")
                .build(isPaddingThin && "thin-padding")}
            data-icon={data.icon}
        >
            <Icon iconKey={data.icon} size={24} />
        </div>
    );
};
