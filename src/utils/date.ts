import { DateTuple } from "@/types/card";

type DateRangeFormat = {
    duration: string;
    range: string;
    preciseRange: string;
    durationMs: number;
};

export type FormatterParams = Intl.DateTimeFormatOptions;

const getFormatter = (params: FormatterParams) => {
    return Intl.DateTimeFormat("en-UK", {
        month: "short",
        year: "numeric",
        ...params,
    });
};

const makeDate = (dt: DateTuple): Date => {
    return new Date(dt[0], dt[1] - 1, dt[2]);
};

export const isFuture = (date: DateTuple | undefined) =>
    !date || makeDate(date).valueOf() > Date.now();

/**
 * formats duration in seconds
 */
const formatDuration = (duration: number): string => {
    const year = 365.2425 * 86400;
    const month = year / 12;
    if (duration > year) {
        return `${(duration / year)
            .toFixed(1)
            .replace(".0", "")} years`.replace(/\s/g, " ");
    }
    const months = Math.round(duration / month);
    const isPlural = month > 1;

    return `${months} month${isPlural ? "s" : ""}`.replace(/\s/g, " ");
};

const formatFuture = (
    startDT: DateTuple,
    endDT: DateTuple | undefined,
    params: FormatterParams,
): string => {
    const startDate = makeDate(startDT);
    const endDate = endDT ? makeDate(endDT) : undefined;

    if (!endDate || startDate === endDate) {
        return `in ${startDate.getFullYear()}`;
    }

    return getFormatter(params).formatRange(startDate, endDate);
};

const formatRange = (
    startDT: DateTuple | undefined,
    endDT: DateTuple | undefined,
    params: FormatterParams,
): string => {
    const formatter = getFormatter(params);

    if (startDT === undefined) {
        return "soon";
    }

    const startDate = makeDate(startDT);
    const endDate = endDT ? makeDate(endDT) : undefined;

    if (isFuture(startDT)) {
        return formatFuture(startDT, endDT, params);
    }

    if (startDate === endDate) {
        return formatter.format(startDate);
    }

    if (endDate) {
        return formatter.formatRange(startDate, endDate);
    }

    return `since ${formatter.format(startDate)}`;
};

export const formatDateRange = (
    startDT?: DateTuple,
    endDT?: DateTuple,
    params?: FormatterParams,
): DateRangeFormat => {
    let duration: string;
    let durationMs: number = 0;

    if (startDT && !isFuture(startDT)) {
        const durationEnd = endDT ? makeDate(endDT) : new Date();
        durationMs = durationEnd.valueOf() - makeDate(startDT).valueOf();
        duration = formatDuration(durationMs / 1000);
    } else {
        duration = "for some time";
    }

    params = params || {};

    return {
        duration,
        range: formatRange(startDT, endDT, params),
        preciseRange: formatRange(startDT, endDT, {
            ...params,
            day: "numeric",
        }),
        durationMs,
    };
};
