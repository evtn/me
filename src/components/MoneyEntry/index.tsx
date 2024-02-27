import { useAtom, useSetAtom } from "jotai";
import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

import { SidebarEntry } from "@/components";
import { classBuilder } from "@/utils";

import { SidebarEntryData } from "@/data/sidebar";
import { Icon } from "@/icons/icon";
import { baseCompensationAtom, colorShiftAtom } from "@/state/settings";

const classname = classBuilder("sidebar-entry");

export const MoneyEntry: FunctionalComponent = () => {
    const [baseCompensation, setBaseCompensation] =
        useAtom(baseCompensationAtom);
    const [compensationShift, setCompensationShift] = useState<number>(0);

    const shiftColors = useSetAtom(colorShiftAtom);

    useEffect(() => {
        // increment compensation every tick
        const interval = setInterval(
            () => setCompensationShift((value) => value + 1),
            1000,
        );

        // fetch current base compensation. doesn't affect the minimal value in PDF builder though
        (async () => {
            const resp = await fetch("https://evtn.me/api/compensation");
            const value = JSON.parse(await resp.text());

            setBaseCompensation(value);
        })();

        return () => clearInterval(interval);
    }, []);

    const compensation = compensationShift + baseCompensation;

    const entryData: SidebarEntryData = {
        text: `${compensation.toString()} / mo`,
        icon: "dollar",
        color: "green",
        label: "Compensation (grows every second)",
        onClick: () => shiftColors(),
    };

    const refreshButton = (
        <button
            className={classname.element("button").build(classname.card)}
            onClick={() => {
                setCompensationShift(0);
                shiftColors(true);
            }}
            aria-label="Reset"
        >
            <Icon iconKey="refreshalt" />
        </button>
    );

    const addButton = (
        <button
            className={classname.element("button").build(classname.card)}
            onClick={() =>
                setCompensationShift(
                    (value) =>
                        value + Math.floor(Math.random() * baseCompensation),
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
