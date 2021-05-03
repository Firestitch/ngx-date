import { isValid } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz'
import { sanitizeDate } from './sanitize-date';


export function parseLocal(date): Date {
    if (typeof date === 'string') {
        date = utcToZonedTime(sanitizeDate(date), null);
    }

    return isValid(date) ? date : null;
}

