import { round } from '@firestitch/common';

import { differenceInMinutes, differenceInSeconds } from 'date-fns';

import { duration } from './duration';
import { format } from './format';
import { parse } from './parse';


export function ago(date, frmt = 'date', options: any = {}) {

  date = parse(date);
  if (!date) {
    return '';
  }

  const minDiff = round(differenceInSeconds(new Date(), date) / 60, 0);
  const hourDiff = round(differenceInMinutes(new Date(), date) / 60, 0);

  if (Math.abs(hourDiff) >= 24) {
    if (date.getFullYear() === new Date().getFullYear()) {
      return format(date, 'date-yearless');
    }
 
    return format(date, frmt);

  } else if (hourDiff === 0 && minDiff === 0) {
    return 'now';
  }
 
  return duration(minDiff, {
    unit: 'minutes',
    suffix: true,
    minutes: true,
    hours: true,
    ...options,
  });
  
}
