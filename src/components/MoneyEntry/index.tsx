import { useAtom, useSetAtom } from "jotai";
import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

import { SidebarEntry, SidebarEntryButton } from "@/components";

import { SidebarEntryData } from "@/data/sidebar";
import { Icon } from "@/icons/icon";
import { baseCompensationAtom, colorShiftAtom } from "@/state/settings";

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
        <SidebarEntryButton
            onClick={() => {
                setCompensationShift(0);
                shiftColors(true);
            }}
            label="Reset"
            icon="refreshalt"
        />
    );

    const addButton = (
        <SidebarEntryButton
            onClick={() =>
                setCompensationShift(
                    (value) =>
                        value + Math.floor(Math.random() * baseCompensation),
                )
            }
            label="Add"
            icon="plus"
        />
    );

    return (
        <SidebarEntry data={entryData}>
            {refreshButton}
            {addButton}
        </SidebarEntry>
    );
};
