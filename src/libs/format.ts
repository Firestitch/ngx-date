import { format as fnsFormat } from 'date-fns';
import { getFormatString } from './get-format-string';
import { parse } from './parse';

export function format(date, formatTo?: string): string {
    const outputFormat = getFormatString(formatTo);
    date = parse(date);
    return date ? fnsFormat(date, outputFormat) : null;
}
