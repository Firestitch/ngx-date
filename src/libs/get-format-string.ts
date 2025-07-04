import { isSameYear } from 'date-fns';

export function getFormatString(formatTo = 'date', date: Date = null) {

  const formatParts = formatTo.split('-');

  const hasTime = formatParts.indexOf('time') !== -1;
  const hasDate = formatParts.indexOf('date') !== -1;
  const parts = [];

  if (hasDate || hasTime) {

    if (hasDate) {
      parts.push(...dateParts(date, formatParts));
    }

    if (hasTime) {
      parts.push(formatParts.indexOf('24') !== -1 ? 'HH:mm' : 'h:mm aaa');

      if (formatParts.indexOf('tz') !== -1 || formatParts.indexOf('gmt') !== -1) {
        parts.push('(OOOO)');
      }
    }

  } else {

    parts.push(formatTo);
  }

  return parts.join(' ').trim();
}


function dateParts(date, formatParts: string[]) {
  const hasYear = formatParts.indexOf('yearless') === -1;
  const hasYearDiff = formatParts.indexOf('yeardiff') !== -1;
  const sameYear = date && isSameYear(date, new Date());
  const showYear = hasYear && !(hasYearDiff && sameYear);
  const parts = [];

  // day of week
  if (formatParts.indexOf('day') !== -1) {
    parts.push(formatParts.indexOf('full') !== -1 ? 'EEEE' : 'EEE');
  }

  // month
  parts.push(formatParts.indexOf('full') !== -1 ? 'MMMM' : 'MMM');

  // day
  if (formatParts.indexOf('dayless') === -1) {

    let day = formatParts.indexOf('ordinal') !== -1 ? 'do' : 'd';

    if (showYear) {
      day += ',';
    }

    parts.push(day);
  }

  // year
  if (showYear) {
    parts.push('yyyy');
  }

  return parts;
}
