import { SidebarEntry, SidebarEntryButton } from "@/components";

import { SidebarEntryData } from "@/data/sidebar";

const baseData: SidebarEntryData = {
    href: "/cv",
    text: "Download PDF",
    icon: "download",
    copy: false,
    color: "orange",
    label: "Default PDF",
};

export const PDFSidebarEntry = () => {
    return (
        <SidebarEntry data={baseData}>
            <SidebarEntryButton
                href="/pdf"
                icon="settings"
                text="Customize PDF"
                label="PDF Generator"
                fullsize
            />
        </SidebarEntry>
    );
};
