import { isValid } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz'


export function parseLocal(date): Date {

    if (typeof date === 'string') {
        date = utcToZonedTime(date, null);
    }

    return isValid(date) ? date : null;
}

