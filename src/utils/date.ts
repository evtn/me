type DateRangeFormat = {
    duration: string;
    range: string;
};

const formatter = Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
});

/**
 * formats duration in seconds
 */
const formatDuration = (duration: number): string => {
    const year = 365.2425 * 86400;
    const month = year / 12;
    if (duration > year) {
        return `${(duration / year).toFixed(1)} years`;
    }
    const months = Math.round(duration / month);
    const isPlural = month > 1;

    return `${months} month${isPlural ? "s" : ""}`;
};

const formatRange = (startDate: Date, endDate?: Date): string => {
    let formatted;

    if (endDate) {
        formatted = formatter.formatRange(startDate, endDate).toString();
    } else {
        formatted = `since ${formatter.format(startDate)}`;
    }
    return formatted;
};

export const formatDateRange = (
    startDate: Date,
    endDate?: Date
): DateRangeFormat => {
    const durationMs = (endDate || new Date()).valueOf() - startDate.valueOf();

    return {
        duration: formatDuration(durationMs / 1000),
        range: formatRange(startDate, endDate),
    };
};
