import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

import { SidebarEntry } from "@/components";
import { classBuilder } from "@/utils";

import { SidebarEntryData } from "@/data/sidebar";
import { Icon } from "@/icons/icon";

const initialCompensation = 3000;

const classname = classBuilder("sidebar-entry");

export const MoneyEntry: FunctionalComponent = () => {
    const [compensation, setCompensation] =
        useState<number>(initialCompensation);

    useEffect(() => {
        const interval = setInterval(
            () => setCompensation((value) => value + 1),
            1000,
        );
        return () => clearInterval(interval);
    }, []);

    const entryData: SidebarEntryData = {
        text: `${compensation.toString()} / mo`,
        icon: "dollar",
        color: "green",
        label: "Compensation (grows every second)",
    };

    const refreshButton = (
        <button
            className={classname.element("button").build(classname.card)}
            onClick={() => setCompensation(initialCompensation)}
            aria-label="Reset"
        >
            <Icon iconKey="refreshalt" />
        </button>
    );

    const addButton = (
        <button
            className={classname.element("button").build(classname.card)}
            onClick={() =>
                setCompensation(
                    (value) => value + Math.floor(Math.random() * 1000),
                )
            }
            aria-label="Add"
        >
            <Icon iconKey="plus" />
        </button>
    );

    return (
        <SidebarEntry data={entryData}>
            {refreshButton}
            {addButton}
        </SidebarEntry>
    );
};
