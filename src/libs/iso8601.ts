import { format } from 'date-fns';


export function iso8601(date) {
    if (!date) {
        return '';
    }

    return format(date, 'yyyy-MM-ddTHH:mm:ssxxxxx');
}
