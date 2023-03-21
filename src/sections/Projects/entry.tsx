import { PackageIcon } from "@primer/octicons-react";
import { ProjectSection } from ".";
import { usePopup } from "../../components/Popup";

export const ProjectsEntry = () => {
  const setPopupContent = usePopup();
  return (
    <button
      className="sidebar-entry__link"
      onClick={() => setPopupContent(<ProjectSection />)}
    >
      <PackageIcon className="sidebar-entry__icon" />
      <p>my projects</p>
    </button>
  );
};
