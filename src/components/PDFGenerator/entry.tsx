import { useSetAtom } from "jotai";
import { route } from "preact-router";

import { popupAtom } from "@/state/popup";

import { SidebarEntry } from "../SidebarEntry";

export const PDFEntry = () => {
    const setPopup = useSetAtom(popupAtom);

    return (
        <SidebarEntry
            data={{
                text: "Get a PDF",
                icon: "file",
                color: "orange",
                label: "PDF Generator",
                copy: false,
                onClick: () => route("/pdf"),
            }}
        />
    );
};
