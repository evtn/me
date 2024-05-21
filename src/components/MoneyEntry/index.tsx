import { useAtom, useSetAtom } from "jotai";
import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

import { SidebarEntry, SidebarEntryButton } from "@/components";

import { SidebarEntryData } from "@/data/sidebar";
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

        (async () => {
            const resp = await fetch("https://evtn.me/api/compensation");
            const value = JSON.parse(await resp.text());

            setBaseCompensation(value);
        })();

        return () => clearInterval(interval);
    }, []);

    const compensation = compensationShift + baseCompensation;

    const entryData: SidebarEntryData = {
        text: `$${compensation}`,
        icon: "dollar",
        color: "green",
        label: "Desired compensation (grows every second)",
        onClick: () => shiftColors(),
        afterText: " / month, gross",
    };

    const refreshButton = (
        <SidebarEntryButton
            onClick={() => {
                setCompensationShift(0);
                shiftColors(true);
            }}
            label="Turn it back"
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
            label="Add more"
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
