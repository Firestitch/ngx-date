import { differenceInMilliseconds, format as fnsFormat } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

import { getFormatString } from './get-format-string';
import { parse } from './parse';


function formatDate(date: Date, format: string, timezone: string): string {
  return timezone ? formatInTimeZone(date, timezone, format) : fnsFormat(date, format);
}

export function range(from: Date, to: Date, format: string = 'date', timezone?: string): string {
  ({ from, to } = sanitize(from, to));
  let formatParts = format.split('-');

  if (
    formatParts.indexOf('yearless') !== -1 || (
      formatParts.indexOf('yeardiff') !== -1 &&
      from.getFullYear() === to.getFullYear() && 
      (new Date()).getFullYear() === from.getFullYear()
    )
  ) {
    formatParts.push('yearless');
  } else {
    formatParts = formatParts.filter((part) => part !== 'yeardiff');
  }

  let fromFormat = getFormatString(formatParts.join('-'), from);
  let toFormat = getFormatString(formatParts.join('-'), to);

  if (differenceInMilliseconds(from, to) === 0) {
    return formatDate(from, fromFormat, timezone);
  }

  if (formatParts.indexOf('time') !== -1) {
    ({ fromFormat, toFormat } = dateAndTime(fromFormat, toFormat, from, to));
  } else {
    ({ fromFormat, toFormat } = dateOnly(formatParts, fromFormat, toFormat, from, to, format));
  }

  let output = formatDate(from, fromFormat, timezone);
  if (toFormat) {
    output += ` – ${formatDate(to, toFormat, timezone)}`;
  }

  return output;
}

function sanitize(from: Date, to: Date): { from: Date, to: Date } {
  from = parse(from);
  to = parse(to);

  if (to || from) {
    if (from && !to) {
      to = from;
    }

    if (to && !from) {
      from = to;
    }
  }
  
  return { from, to };
}

function dateAndTime(fromFormat, toFormat, from: Date, to: Date): { fromFormat: string, toFormat: string } {
  if (!from.getMinutes()) {
    fromFormat = fromFormat.replace(':mm', '');
  }

  if (!to.getMinutes()) {
    toFormat = toFormat.replace(':mm', '');
  }

  if (from.getFullYear() === to.getFullYear()) {
    ({ fromFormat, toFormat } = sameYear(from, to, fromFormat, toFormat));
  }

  fromFormat = fromFormat.replace('MM d h', 'MM d · h');

  return { fromFormat, toFormat };
}


function dateOnly(formatParts, fromFormat, toFormat, from: Date, to: Date, format: string): { fromFormat: string, toFormat: string } {
  // date only
  if (from.getFullYear() === to.getFullYear()) {
    fromFormat = fromFormat
      .replace(', yyyy', '')
      .trim();

    if (from.getMonth() === to.getMonth()) {
      if (formatParts.indexOf('day') === -1) {
        toFormat = toFormat
          .replace('MMMM', '')
          .replace('MMM', '')
          .trim();
      }

      if (from.getDate() === to.getDate()) {
        if (formatParts.indexOf('time') === -1) {
          fromFormat = getFormatString(format, from);
          toFormat = '';
        }
      }
    }
  }

  return { fromFormat, toFormat };
}

function sameYear(from: Date, to: Date, fromFormat: string, toFormat: string): { fromFormat: string, toFormat: string } {
  if ((new Date()).getFullYear() === from.getFullYear()) {
    fromFormat = fromFormat.replace(', yyyy', '');
  }

  toFormat = toFormat.replace(', yyyy', '');

  if (from.getMonth() === to.getMonth()) {
    if (from.getDate() === to.getDate()) {

      if (
        (from.getHours() < 12 && to.getHours() < 12) ||
          (from.getHours() > 12 && to.getHours() > 12)
      ) {
        fromFormat = fromFormat.replace(' aaa', '');
      }

      toFormat = toFormat
        .replace('MMMM', '')
        .replace('MMM', '')
        .replace('EEEE', '')
        .replace('EEE', '')
        .replace(' do', '')
        .replace(' d', '')
        .trim();
    } else {
      // add comma after day
      toFormat = toFormat
        .replace(' do', ' do,')
        .replace(' d', ' d,');
    }
  } else {
    // add comma after day
    toFormat = toFormat
      .replace(' do', ' do,')
      .replace(' d', ' d,');
  }

  return { fromFormat, toFormat };
}
