interface DateTimeFormatter {
    longDate: Intl.DateTimeFormat;
    shortDate: Intl.DateTimeFormat;
    longMonthDay: Intl.DateTimeFormat;
    shortMonthDay: Intl.DateTimeFormat;
    longDateTime: Intl.DateTimeFormat;
    shortDateTime: Intl.DateTimeFormat;
    shortTime: Intl.DateTimeFormat;
    nanoTime: Intl.DateTimeFormat;
    year: Intl.DateTimeFormat;
}

const defaultRegion = 'ru-RU';

const dateTimeFormatters: Map<string, DateTimeFormatter> = new Map();

function getDateTimeFormatter(localeCode: string): DateTimeFormatter {
    if (!dateTimeFormatters.has(localeCode)) {
        const formatters = {
            // December 20, 2012
            longDate: new Intl.DateTimeFormat(localeCode, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            // 4/30/2021
            shortDate: new Intl.DateTimeFormat(localeCode, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            }),
            // December 20
            longMonthDay: new Intl.DateTimeFormat(localeCode, {month: 'long', day: 'numeric'}),
            // 12/20
            shortMonthDay: new Intl.DateTimeFormat(localeCode, {month: 'numeric', day: 'numeric'}),
            // April 27, 2021, 3:03 PM
            longDateTime: new Intl.DateTimeFormat(localeCode, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            }),
            // 4/30/2021, 2:30 PM
            shortDateTime: new Intl.DateTimeFormat(localeCode, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            }),
            // 12:30
            shortTime: new Intl.DateTimeFormat(localeCode, {hour: 'numeric', minute: 'numeric'}),
            // 30:58
            nanoTime: new Intl.DateTimeFormat(localeCode, {
                minute: 'numeric',
                second: 'numeric',
            }),
            // 2023
            year: new Intl.DateTimeFormat(localeCode, {
                year: 'numeric',
            }),
        };
        dateTimeFormatters.set(localeCode, formatters);
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- formatter will be always inserted above
    return dateTimeFormatters.get(localeCode)!;
}

export const format = (
    date: string | number,
    formatCode: keyof DateTimeFormatter,
    localeCode = defaultRegion,
) => getDateTimeFormatter(localeCode)[formatCode].format(new Date(date));
