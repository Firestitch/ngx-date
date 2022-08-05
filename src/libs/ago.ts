import { differenceInMinutes, differenceInSeconds } from 'date-fns';

import { format } from './format';
import { duration } from './duration';
import { parse } from './parse';
import { round } from '@firestitch/common';


export function ago(date, frmt = 'date') {

    date = parse(date);
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
