import { FiscalHostIcon, PlusIcon, SyncIcon } from "@primer/octicons-react";
import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { SidebarEntry } from "../../sections/SideBar/entry";

const initialCompensation = 2500;

export const MoneyEntry: FunctionalComponent = () => {
  const [compensation, setCompensation] = useState<number>(initialCompensation);

  useEffect(() => {
    const interval = setInterval(
      () => setCompensation((value) => value + 1),
      1000
    );
    return () => clearInterval(interval);
  }, []);

  const entryData = {
    text: `\$${compensation.toString()}`,
    icon: FiscalHostIcon,
    color: "var(--green)",
  };

  const refreshButton = (
    <button
      className="sidebar-entry__button"
      onClick={() => setCompensation(initialCompensation)}
    >
      <SyncIcon />
    </button>
  );

  const addButton = (
    <button
      className="sidebar-entry__button"
      onClick={() =>
        setCompensation((value) => value + Math.floor(Math.random() * 1000))
      }
    >
      <PlusIcon />
    </button>
  );

  return (
    <SidebarEntry data={entryData}>
      {refreshButton}
      {addButton}
    </SidebarEntry>
  );
};
