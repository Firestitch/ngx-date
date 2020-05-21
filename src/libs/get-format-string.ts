export function getFormatString(date, formatTo = 'date') {

  const formatParts = formatTo.split('-');

  const hasTime = formatParts.indexOf('time') != -1;
  const hasDate = formatParts.indexOf('date') != -1;
  const parts = [];

  if (hasDate || hasTime) {

    if (hasDate) {
      const hasYear = formatParts.indexOf('yearless') === -1;

      // day of week
      if (formatParts.indexOf('day') != -1) {
        parts.push(formatParts.indexOf('full') != -1 ? 'EEEE' : 'EEE');
      }

      // month
      parts.push(formatParts.indexOf('full') != -1 ? 'MMMM' : 'MMM');

      // day
      if (formatParts.indexOf('dayless') === -1) {

        let day = formatParts.indexOf('ordinal') != -1 ? 'do' : 'd';

        if (hasYear) {
          day += ',';
        }

        parts.push(day);
      }

      // year
      if (hasYear) {
        parts.push('yyyy');
      }
    }


    if (hasTime) {
      parts.push(formatParts.indexOf('24') != -1 ? 'HH:mm' : 'h:mm aaa');

      // if (formatParts.indexOf('tz') != -1) {
      //   timeFormat += ' [' + moment.tz(date, moment.tz.guess()).format('z') + ']';
      // }

      if (formatParts.indexOf('tz') != -1 || formatParts.indexOf('gmt') != -1) {
        parts.push('(\'GMT\'XXX\')\'');
      }
    }

  } else {

    parts.push(formatTo);
  }
    return parts.join(' ').trim();
}
