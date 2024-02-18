export const random = (seed: number): number => {
    var x = Math.sin(seed++) * 10000;
    return (x - Math.floor(x)) * 100;
};
