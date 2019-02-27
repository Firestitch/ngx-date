import { format as fnsFormat } from 'date-fns';
import { getFormatString } from './get-format-string';

export function format(date, formatTo?: string): string {

    const outputFormat = getFormatString(date, formatTo);

    return fnsFormat(date, outputFormat);
}
