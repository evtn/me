export const getEntries = <K extends string, V>(
    obj: Record<K, V>,
): [K, V][] => {
    return Object.entries(obj) as [K, V][];
};
