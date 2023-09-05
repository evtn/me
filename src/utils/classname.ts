export const getClassName = (...classnames: (string | undefined)[]) =>
    classnames.filter((x) => x).join(" ");
