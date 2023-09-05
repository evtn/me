type DateRangeFormat = {
    duration: string;
    range: string;
};

export type FormatterParams = Intl.DateTimeFormatOptions;

const getFormatter = (params: FormatterParams) => {
    return Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
        ...params,
    });
};

/**
 * formats duration in seconds
 */
const formatDuration = (duration: number): string => {
    const year = 365.2425 * 86400;
    const month = year / 12;
    if (duration > year) {
        return `${(duration / year).toFixed(1).replace(".0", "")} years`;
    }
    const months = Math.round(duration / month);
    const isPlural = month > 1;

    return `${months} month${isPlural ? "s" : ""}`;
};

const formatRange = (
    startDate: Date,
    endDate: Date | undefined,
    params: FormatterParams,
): string => {
    const formatter = getFormatter(params);

    if (endDate) {
        return formatter.formatRange(startDate, endDate).toString();
    }
    return `since ${formatter.format(startDate)}`;
};

export const formatDateRange = (
    startDate: Date,
    endDate?: Date,
    params?: FormatterParams,
): DateRangeFormat => {
    const durationMs = (endDate || new Date()).valueOf() - startDate.valueOf();

    return {
        duration: formatDuration(durationMs / 1000),
        range: formatRange(startDate, endDate, params || {}),
    };
};
