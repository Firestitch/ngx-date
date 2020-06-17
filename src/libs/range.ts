import { format as fnsFormat, differenceInMilliseconds } from 'date-fns';
import { getFormatString } from './get-format-string';
import { parse } from './parse';


export function range(from: Date, to: Date, format = 'date'): string {

    from = parse(from);
    to = parse(to);

    if (!to && !from) {
      return '';
    }

    if (from && !to) {
      to = from;
    }

    if (to && !from) {
      from = to;
    }

    const formatParts = format.split('-');

    let fromFormat = getFormatString(format);
    let toFormat = getFormatString(format);

    if (differenceInMilliseconds(from, to) == 0) {
      return fnsFormat(from, fromFormat);
    }

    if (formatParts.indexOf('time') !== -1) {
      // date and time
      if (from.getFullYear() == to.getFullYear()) {
        toFormat = toFormat
          .replace(' yyyy', '')
          .replace(',', '');

        if (from.getMonth() == to.getMonth()) {
          if (from.getDate() == to.getDate()) {
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
      }
    } else {
      // date only
      if (from.getFullYear() == to.getFullYear()) {
        fromFormat = fromFormat
          .replace(' yyyy', '')
          .replace(',', '')
          .trim();

        if (from.getMonth() == to.getMonth()) {

          if (formatParts.indexOf('day') == -1) {
            toFormat = toFormat
              .replace('MMMM', '')
              .replace('MMM', '')
              .trim();
          }

          if (from.getDate() == to.getDate()) {
            if (formatParts.indexOf('time') == -1) {
              fromFormat = getFormatString(format);
              toFormat = '';
            }
          }
        }
      }
    }

    let output = fnsFormat(from, fromFormat);
    if (toFormat) {
      output += ' - ' + fnsFormat(to, toFormat);
    }

    return output;
}
