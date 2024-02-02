import { useEffect, useRef } from "preact/hooks";

import { useSettings } from "./useSettings";

type Target = HTMLElement | null;
type Position = [number, number];

type CursorType = "default" | "text" | "pointer";

const cursorTypes: Record<Exclude<CursorType, "default">, Set<string>> = {
    pointer: new Set(["a", "button", "label"]),
    text: new Set(["p", "span", "h1", "h2", "h3", "h4"]),
};

const getRoot = (element: HTMLElement): HTMLElement => {
    const parent = element.parentElement;

    if (!parent || parent.nodeName === "MAIN" || parent.nodeName === "DIV") {
        return element;
    }
    return getRoot(parent);
};

const getCursorType = (element: HTMLElement): CursorType => {
    const nodeName = element.nodeName.toLowerCase();

    if (element.onclick) {
        return "pointer";
    }

    for (const [type, names] of Object.entries(cursorTypes)) {
        if (names.has(nodeName)) {
            return type as CursorType;
        }
    }

    return "default";
};

type CursorData = {
    position: Position;
    size: number;
    multiplier: number;
    animationID: number;
    color: string;
    lastTarget: Target;
    prevData: CursorData | null;
};

const defaultCursorData: CursorData = {
    position: [0, 0],
    size: 0,
    multiplier: 1,
    animationID: 0,
    color: "",
    lastTarget: null,
    prevData: null,
};

export const useCursor = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<CursorData>(defaultCursorData);
    const [settings] = useSettings();

    const handleMove = (position: Position, target: Target) => {
        const data = cursorRef.current;

        data.position = position;

        if (target && data.lastTarget !== target) {
            data.size = parseInt(getComputedStyle(target).fontSize);
            data.color =
                getComputedStyle(target).getPropertyValue("--local-accent");

            const node = getRoot(target);

            const cursorType = getCursorType(node);
            const element = elementRef.current;

            if (element) {
                element.setAttribute("data-cursor-type", cursorType);
            }

            data.lastTarget = target;
        }
    };

    const setCursor = (event: MouseEvent) => {
        handleMove([event.pageX, event.pageY], event.target as Target);
    };

    const setTouchCursor = (event: TouchEvent) => {
        const position = event.touches[0];
        handleMove([position.pageX, position.pageY], event.target as Target);
    };

    const setCursorMultiplier = (n: number) => () => {
        cursorRef.current.multiplier = n;
    };

    const hideCursor = () => handleMove([-100, -100], null);

    useEffect(() => {
        const eventListeners = {
            mousemove: setCursor,
            touchmove: setTouchCursor,
            mousedown: setCursorMultiplier(1),
            mouseup: setCursorMultiplier(1),
            mouseenter: setCursorMultiplier(1),
            mouseleave: hideCursor,
            touchstart: (e: TouchEvent) => {
                setTouchCursor(e);
                setCursorMultiplier(1.5);
            },
            touchend: hideCursor,
        };

        Object.entries(eventListeners).map(([eventType, handler]) =>
            document.body.addEventListener(eventType as any, handler as any),
        );

        return () => {
            Object.entries(eventListeners).map(([eventType, handler]) =>
                document.body.removeEventListener(
                    eventType as any,
                    handler as any,
                ),
            );
        };
    }, []);

    useEffect(() => {
        const data = cursorRef.current;

        // @ts-ignore
        if (!settings.cursor) {
            return;
        }

        if (data.animationID) {
            cancelAnimationFrame(data.animationID);
            data.animationID = 0;
        }

        const animate = () => {
            const element = elementRef.current;
            const position = data.position;
            const size = data.size * data.multiplier;
            const color = data.color;
            const prevData = data.prevData;

            if (element) {
                const style = element.style;

                if (prevData?.position !== position) {
                    element.style.setProperty(
                        "--cursor-position-x",
                        `${position[0]}px`,
                    );
                    element.style.setProperty(
                        "--cursor-position-y",
                        `${position[1]}px`,
                    );
                }

                if (
                    prevData?.size !== data.size ||
                    prevData?.multiplier !== data.multiplier
                ) {
                    style.setProperty("--cursor-size", `${size}px`);
                }

                if (prevData?.color !== color) {
                    style.setProperty("--cursor-color", color);
                }
                data.prevData = { ...data };
            }

            data.animationID = requestAnimationFrame(animate);
        };

        animate();

        return () => data.animationID && cancelAnimationFrame(data.animationID);
    }, [settings]);

    return elementRef;
};
