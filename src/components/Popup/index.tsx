import { useAtom } from "jotai";
import { FunctionalComponent } from "preact";
import { route } from "preact-router";
import { useEffect } from "preact/hooks";

import { Icon } from "@/icons";
import { classBuilder } from "@/utils";

import { popupAtom } from "@/state/popup";

import "./style.css";

const classname = classBuilder("popup");

export const PopupContainer: FunctionalComponent = () => {
    const [contents, setContents] = useAtom(popupAtom);
    const isOpen = !!contents;

    useEffect(() => {
        const style = document.body.style;

        if (!!contents) {
            style.overflowY = "hidden";
        } else {
            style.overflowY = "";
        }
    }, [contents]);

    const close = () => route("/");

    return (
        <div className={classname.build()} data-open={isOpen} onClick={close}>
            <div
                className={classname.element("container").build()}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={close}
                    className={classname
                        .element("close-button")
                        .color("red")
                        .build(classname.card)}
                >
                    <Icon iconKey="x" />
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
