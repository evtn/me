import { SidebarEntry } from "@/components";
import { PackageIcon } from "@primer/octicons-react";
import { ProjectSection } from ".";
import { usePopup } from "@/components";

export const ProjectsEntry = () => {
  const setPopupContent = usePopup();

  return (
    <SidebarEntry
      data={{
        onClick: () => setPopupContent(<ProjectSection />),
        text: "My projects",
        icon: PackageIcon,
        color: "blue",
      }}
    />
  );
};
