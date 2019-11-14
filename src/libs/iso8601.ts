import { format } from 'date-fns';
import { parse } from './parse';


export function iso8601(date) {

    date = parse(date);

    if (!date) {
        return '';
    }

    return format(date, `yyyy-MM-dd'T'HH:mm:ssxxx`);
}
