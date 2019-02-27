export function getFormatString(date, formatTo = 'date') {

    const formatParts = formatTo.split('-');

    let dateFormat = '';
    let timeFormat = '';

    if (formatParts.indexOf('date') != -1) {
      let dayofweekFormat, monthFormat, dayFormat, yearFormat;

      // day of week
      if (formatParts.indexOf('day') != -1) {
        dayofweekFormat = formatParts.indexOf('full') != -1 ? 'EEEE' : 'EEE';
      } else {
        dayofweekFormat = '';
      }

      // month
      monthFormat = formatParts.indexOf('full') != -1 ? ' MMMM' : ' MMM';

      // day
      if (formatParts.indexOf('dayless') != -1) {
        dayFormat = '';
      } else {
        dayFormat = formatParts.indexOf('ordinal') != -1 ? ' do' : ' d';
      }

      // year
      yearFormat = formatParts.indexOf('yearless') != -1 ? '' : ' yyyy';
      if (dayFormat && yearFormat) {
        yearFormat = `,${yearFormat}`;
      }

      dateFormat = dayofweekFormat + monthFormat + dayFormat + yearFormat;
    }

    if (formatParts.indexOf('time') != -1) {
        timeFormat = formatParts.indexOf('24') != -1 ? 'HH:mm' : 'h:mmaaa';

        // if (formatParts.indexOf('tz') != -1) {
        //   timeFormat += ' [' + moment.tz(date, moment.tz.guess()).format('z') + ']';
        // }

        if (formatParts.indexOf('tz') != -1 || formatParts.indexOf('gmt') != -1) {
            const offset = new Date().getTimezoneOffset() / 60;
            timeFormat += ' \'[GMT' + (offset > -.1 ? '+' : '') + offset + ']\'';
        }
    }

    dateFormat = dateFormat.trim();
    timeFormat = timeFormat.trim();

    return dateFormat + (dateFormat && timeFormat ? ' ' : '') + timeFormat;
  }
