import { parseISO, isValid } from 'date-fns';


export function parse(date): Date {

    if (typeof date === 'string') {
        date = parseISO(date);
    }

    return isValid(date) ? date : null;
}
