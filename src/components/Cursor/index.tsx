import { useCursor } from "@/hooks/useCursor";

import "./style.css";

export const CursorProvider = () => {
    const cursorRef = useCursor();

    return <div ref={cursorRef} class="cursor-provider" />;
};
