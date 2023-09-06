import { XIcon } from "@primer/octicons-react";
import { useAtom } from "jotai";
import { FunctionalComponent } from "preact";
import { useEffect } from "preact/hooks";
import { popupAtom } from "../../state/popup";
import "./style.scss";

export const PopupContainer: FunctionalComponent = () => {
  const [contents, setContents] = useAtom(popupAtom);

  const isOpen = !!contents;

  useEffect(() => {
    const style = document.body.style;

    if (!!contents) {
      style.overflowY = "hidden";
    } else {
      style.overflowY = "scroll";
    }
  }, [contents]);

  return (
    <div
      className="popup"
      data-open={isOpen}
      onClick={() => setContents(undefined)}
    >
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setContents(undefined)}
          className="popup__close-button"
        >
          <XIcon />
        </button>
        {contents}
      </div>
    </div>
  );
};

export const usePopup = () => {
  const [_, setContents] = useAtom(popupAtom);
  return setContents;
};
