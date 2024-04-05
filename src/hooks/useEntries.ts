import { atom, useAtom } from "jotai";
import { useEffect } from "preact/hooks";

import { CardData } from "@/types/card";

const entriesAtom = atom<CardData[]>([]);

export const useEntries = (doFetch: boolean = false): CardData[] => {
    const [entries, setEntries] = useAtom(entriesAtom);

    useEffect(() => {
        if (entries.length === 0 && doFetch) {
            fetch("https://evtn.me/data.json")
                .then((data) => data.json())
                .then((data) => setEntries(data));
        }
    }, [entries]);

    return entries;
};
