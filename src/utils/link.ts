export const cleanHref = (href: string) => {
    return href
        .replace(/^(\w+):\/\//, (_, schema: string) => {
            if (!schema.startsWith("http")) {
                return `[${schema.toUpperCase()}] `;
            }

            return "";
        })
        .replace(/\/$/, "");
};
