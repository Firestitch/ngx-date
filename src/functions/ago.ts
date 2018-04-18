import * as moment from 'moment-timezone';
import { round } from 'lodash';
import { format } from './format';
import { duration } from './duration';

export function ago(date, frmt: String = 'date') {

    if (!date) {
      return '';
    }

    const minDiff = round(moment().diff(date, 'minute', true), 0);
    const hourDiff = round(moment().diff(date, 'hour', true), 0);

    if (Math.abs(hourDiff) >= 24) {
      if (moment(date).year() == moment().year()) {
        return format(date, 'date-yearless');
      } else {
        return format(date, frmt);
      }

    } else if (hourDiff == 0 && minDiff == 0) {
      return 'now';
     } else {
      return duration(minDiff, {
          unit: 'minute',
          suffix: true,
          seconds: false
      });
    }
}
