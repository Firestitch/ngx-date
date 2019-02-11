import * as moment_ from 'moment';
const moment = moment_;

export function iso8601(date) {
    if (!date) {
        return '';
    }

    return moment(date).format();
}
