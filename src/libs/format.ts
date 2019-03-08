import { format as fnsFormat, parseISO, isValid } from 'date-fns';
import { getFormatString } from './get-format-string';

export function format(date, formatTo?: string): string {

    const outputFormat = getFormatString(date, formatTo);

    if (typeof date === 'string') {
        date = parseISO(date);

        if (!isValid(date)) {
            return '';
        }
    }

    return fnsFormat(date, outputFormat);
}
