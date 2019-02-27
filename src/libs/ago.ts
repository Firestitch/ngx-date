import { round } from 'lodash-es';
import { differenceInMinutes, differenceInSeconds } from 'date-fns';

import { format } from './format';
import { duration } from './duration';


export function ago(date, frmt = 'date') {

    if (!date) {
      return '';
    }

    const minDiff = round(differenceInSeconds(new Date(), date) / 60, 0);
    const hourDiff = round(differenceInMinutes(new Date(), date) / 60, 0);

    if (Math.abs(hourDiff) >= 24) {
      if (date.getFullYear() == new Date().getFullYear()) {
        return format(date, 'date-yearless');
      } else {
        return format(date, frmt);
      }

    } else if (hourDiff == 0 && minDiff == 0) {
      return 'now';
     } else {
      return duration(minDiff, {
        unit: 'minutes',
        suffix: true,
        minutes: true,
        hours: true
      });
    }
}
