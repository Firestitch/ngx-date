import { format as fnsFormat } from 'date-fns-tz';
import { getFormatString } from './get-format-string';
import { parse } from './parse';

export function format(date, formatTo?: string, options: { timezone?: string } = {}): string {
    date = parse(date);
    const outputFormat = getFormatString(formatTo, date);

    return date ? fnsFormat(date, outputFormat, { timeZone: options.timezone }) : null;
}
