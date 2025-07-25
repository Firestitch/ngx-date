import { differenceInMilliseconds, format as fnsFormat } from 'date-fns';

import { getFormatString } from './get-format-string';
import { parse } from './parse';


export function range(from: Date, to: Date, format = 'date'): string {
  ({ from, to } = sanitize(from, to));

  const formatParts = format.split('-');

  let fromFormat = getFormatString(format, from);
  let toFormat = getFormatString(format, to);

  if (
    formatParts.indexOf('yearless') !== -1 || (
      formatParts.indexOf('yeardiff') !== -1 &&
      from.getFullYear() === to.getFullYear() && 
      (new Date()).getFullYear() === from.getFullYear()
    )
  ) {
    fromFormat = fromFormat.replace(', yyyy', '');
    toFormat = toFormat.replace(', yyyy', '');
  }

  if (differenceInMilliseconds(from, to) === 0) {
    return fnsFormat(from, fromFormat);
  }

  if (formatParts.indexOf('time') !== -1) {
    ({ fromFormat, toFormat } = dateAndTime(fromFormat, toFormat, from, to));
  } else {
    ({ fromFormat, toFormat } = dateOnly(formatParts, fromFormat, toFormat, from, to, format));
  }

  let output = fnsFormat(from, fromFormat);
  if (toFormat) {
    output += ` – ${fnsFormat(to, toFormat)}`;
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
