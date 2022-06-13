import { isValid } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz'
import { sanitizeDate } from './sanitize-date';


export function parseLocal(date): Date {
    if (typeof date === 'string') {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        date = utcToZonedTime(sanitizeDate(date), timeZone);
    }

    return isValid(date) ? date : null;
}

