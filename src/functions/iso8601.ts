import * as moment from 'moment-timezone';

export function iso8601(date) {
    if (!date) {
        return '';
    }

    return moment(date).format();
}