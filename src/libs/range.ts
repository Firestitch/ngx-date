import * as moment_ from 'moment';
const moment = moment_;

import { toMomentFormat } from './tomomentformat';

export function range(from, to, format = 'date') {

    const formatParts = format.split('-');

    let fromFormat = toMomentFormat(from, format);
    let toFormat = toMomentFormat(to, format);

    from = moment(from);
    to = moment(to);

    if (from.diff(to) == 0) {
      return from.format(fromFormat);
    }

    if (formatParts.indexOf('time') !== -1) {
      // date and time
      if (from.year() == to.year()) {
        toFormat = toFormat
          .replace(' YYYY', '')
          .replace(',', '');

        if (from.month() == to.month()) {
          if (from.date() == to.date()) {
            toFormat = toFormat
                .replace('MMMM', '')
                .replace('MMM', '')
                .replace('dddd', '')
                .replace('ddd', '')
                .replace(' Do', '')
                .replace(' D', '')
                .trim();
          } else {
            // add comma after day
            toFormat = toFormat
                .replace(' Do', ' Do,')
                .replace(' D', ' D,');
          }
        } else {
          // add comma after day
          toFormat = toFormat
              .replace(' Do', ' Do,')
              .replace(' D', ' D,');
        }
      }
    } else {
      // date only
      if (from.year() == to.year()) {
        fromFormat = fromFormat
          .replace(' YYYY', '')
          .replace(',', '')
          .trim();

        if (from.month() == to.month()) {

          if (formatParts.indexOf('day') == -1) {
            toFormat = toFormat
              .replace('MMMM', '')
              .replace('MMM', '')
              .trim();
          }

          if (from.date() == to.date()) {
            if (formatParts.indexOf('time') == -1) {
              fromFormat = toMomentFormat(from, format);
              toFormat = '';
            }
          }
        }
      }
    }

    let output = from.format(fromFormat);
    if (toFormat) {
      output += ' - ' + to.format(toFormat);
    }

    return output;
}
