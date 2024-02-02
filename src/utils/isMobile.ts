export const isMobile = () => {
    const body = document.body;
    const width = body.clientWidth;
    const height = body.clientHeight;

    return width < Math.max(height, 450);
};
