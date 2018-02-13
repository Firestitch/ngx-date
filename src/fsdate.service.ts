import { Injectable } from '@angular/core';
import { FsUtil, FsMath } from '@firestitch/common';
import * as moment from 'moment-timezone';

export const SECONDS = {
  YEAR: 3600 * 24 * 365,
  MONTH: 3600 * 24 * 30.417,
  DAY: 3600 * 24,
  HOUR: 3600,
  MINUTE: 60
};

@Injectable()
export class FsDate {

  constructor(private FsUtil: FsUtil, private FsMath: FsMath) { }

  duration(time: any, options) {
    if (!this.FsUtil.isNumeric(time)) {
      return '';
    }

    if (typeof options === 'string') {
        options = this.formatOptions(options);
    }

    options = Object.assign({}, options);
    options.unit = options.unit === undefined ? 'second' : options.unit;
    options.abr = options.abr === undefined ? true : options.abr;
    options.suffix = options.suffix === true ? (time > 0 ? " ago" : " from now") : "";
    options.seconds = options.seconds === undefined ? true : options.seconds;
    options.minutes = options.minutes === undefined ? true : options.minutes;
    options.hours = options.hours === undefined ? true : options.hours;
    options.days = options.days === undefined ? true : options.days;
    options.months = options.months === undefined ? true : options.months;
    options.years = options.years === undefined ? true : options.years;

    if (options.unit === 'minute') {
        time = time * 60;
    } else if (options.unit === 'hour') {
        time = time * 60 * 60;
    }

    time = Math.abs(parseInt(time));

    const units = {
        years:      { abr: 'Y', single: 'year', plural: 'years', seconds: SECONDS.YEAR, next: 'months' },
        months:     { abr: 'M', single: 'month', plural: 'months', seconds: SECONDS.MONTH, next: 'days' },
        days:       { abr: 'd', single: 'day', plural: 'days', seconds: SECONDS.DAY, next: 'hours' },
        hours:      { abr: 'h', single: 'hour', plural: 'hours', seconds: SECONDS.HOUR, next: 'months' },
        minutes:    { abr: 'm', single: 'minute', plural: 'minutes', seconds: SECONDS.MINUTE, next: 'seconds' },
        seconds:    { abr: 's', single: 'second', plural: 'seconds', seconds: 1, next: null },
    };

    let pieces = {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    let remainder = time;

    if (options.years) {
      let years = remainder / SECONDS.YEAR;
      if (years >= 1) {
        pieces.years = Math.floor(years);
        remainder = remainder - (pieces.years * SECONDS.YEAR);
      }
    }

    if (options.months) {
      let months = remainder / SECONDS.MONTH;

      if (months >= 1) {
        pieces.months =  Math.floor(months);
        remainder = remainder - (pieces.months * SECONDS.MONTH);
      }
    }

    if (options.days) {
      let days = remainder / SECONDS.DAY;
      if (days >= 1) {
        pieces.days = Math.floor(days);
        remainder = remainder - (pieces.days * SECONDS.DAY);
      }
    }

    if (options.hours) {
      let hours = remainder / SECONDS.HOUR;
      if (hours >= 1) {
        pieces.hours = Math.floor(hours);
        remainder = remainder - (pieces.hours * SECONDS.HOUR);
      }
    }

    if (options.minutes) {
      let minutes = remainder / 60;
      if (minutes >= 1) {
        pieces.minutes = Math.floor(minutes);
        remainder = remainder - (pieces.minutes * SECONDS.MINUTE);
      }
    }

    pieces.seconds = Math.floor(remainder);

    let enabled = [], total_seconds = 0;
    for (const name in units) {
      if (units.hasOwnProperty(name)) {
        if (options[name]) {
          enabled.push(name);
        }
        total_seconds += pieces[name] * units[name].seconds;
      }
    }

    let output = [];
    if (enabled.length === 1) {
        const precision = options.precision === undefined ? 1 : options.precision;
        const name = enabled.join('');
        const value = this.FsMath.round(total_seconds / units[name]['seconds'],precision);
        output.push(value + (options.abr ? units[name].abr :  ' ' + (value == 1 ? units[name].single : units[name].plural)));

    } else {
        const precision = options.precision === undefined ? 2 : options.precision;

        for (const name in units) {
          if (units.hasOwnProperty(name)) {
            if (precision && output.length >= precision) {
              continue;
            }

            if (options[name]) {
              const value = pieces[name];
              if (value) {
                  output.push(value + (options.abr ? units[name].abr :  ' ' + (value == 1 ? units[name].single : units[name].plural)));
              }
            }
          }
        }
    }

    //there are no values so show zero of the smallest unit (i.e. "0s")
    if (output.length === 0) {
      for (const name in units) {
        if (units.hasOwnProperty(name)) {
          if (options[name]) {
            output = [ '0' + (options.abr ? units[name].abr :  ' ' + (units[name] == 1 ? units[name].single : units[name].plural)) ];
          }
        }
      }
    }

    //add suffix if required
    if (options.suffix) {
      output.push(options.suffix);
    }

    return output.join(' ');
  }

  granularDuration(time, options = {}) {
    options['seconds'] = options['seconds'] === undefined ? false: options['seconds'];
    options['months'] = options['months'] === undefined ? false : options['months'];
    options['years'] = options['years'] === undefined ? false : options['years'];
    options['precision'] = options['precision'] === undefined ? 3 : options['precision'];
    return this.duration(time,options);
  }

  iso8601(date) {
    if (!date) {
      return '';
    }

    return moment(date).format();
  }

  ago(date, format: string = 'date') {

    if (!date) {
      return '';
    }

    const min_diff = this.FsMath.round(moment().diff(date, 'minute', true), 0);
    const hour_diff = this.FsMath.round(moment().diff(date, 'hour', true), 0);

    if (Math.abs(hour_diff) >= 24) {
      if (moment(date).year() == moment().year()) {
        return this.format(date, 'date-yearless');
      } else {
        return this.format(date, format);
      }

    } else if (hour_diff == 0 && min_diff == 0) {
      return 'now';
     } else {
      return this.duration(min_diff, {
          unit: 'minute',
          suffix: true,
          seconds: false
      });
    }
  }

  format(date, format?: string): string {

    const output_format = this.get_format_string(date, format);

    return moment(date).format(output_format);
  }

  range(from, to, format = 'date') {

    const format_parts = format.split('-');

    let from_format = this.get_format_string(from, format);
    let to_format = this.get_format_string(to, format);

    from = moment(from);
    to = moment(to);

    if (from.diff(to) == 0) {
      return from.format(from_format);
    }

    if (format_parts.indexOf('time') !== -1) {
      //date and time
      if (from.year() == to.year()) {
        to_format = to_format.replace(' YYYY', '').replace(',', '');

        if (from.month() == to.month()) {
          if (from.day() == to.day()) {
            to_format = to_format
                .replace(' MMMM', '')
                .replace(' MMM', '')
                .replace('dddd', '')
                .replace('ddd', '')
                .replace(' Do', '')
                .replace(' D', '')
                ;
          }else {
            //add comma after day
            to_format = to_format
                .replace(' Do', ' Do,')
                .replace(' D', ' D,');
          }
        } else {
          //add comma after day
          to_format = to_format
              .replace(' Do', ' Do,')
              .replace(' D', ' D,');
        }
      }
    }else {
      //date only
      if (from.year() == to.year()) {
        from_format = from_format.replace(' YYYY', '').replace(',', '');

        if (from.month() == to.month()) {

          if (format_parts.indexOf('day') == -1) {
            to_format = to_format.replace(' MMMM', '').replace(' MMM', '');
          }

          if (from.day() == to.day()) {
            if (format_parts.indexOf('time') == -1) {
              from_format = this.get_format_string(from, format);
              to_format = '';
            }
          }
        }
      }
    }

    let output = from.format(from_format);
    if (to_format) {
      output += ' - ' + to.format(to_format);
    }

    return output;
  }

  private get_format_string(date, format = 'date') {

    const format_parts = format.split('-');

    let date_format = '';
    let time_format = '';

    if (format_parts.indexOf('date') != -1) {
      let dayofweek_format, month_format, day_format, year_format;

      //day of week
      if (format_parts.indexOf('day') != -1) {
        dayofweek_format = format_parts.indexOf('full') != -1 ? 'dddd' : 'ddd';
      }else {
        dayofweek_format = '';
      }

      //month
      month_format = format_parts.indexOf('full') != -1 ? ' MMMM' : ' MMM';

      //day
      if (format_parts.indexOf('dayless') != -1) {
        day_format = '';
      }else {
        day_format = format_parts.indexOf('ordinal') != -1 ? ' Do' : ' D';
      }

      //year
      year_format = format_parts.indexOf('yearless') != -1 ? '' : ' YYYY';
      if (day_format && year_format) {
        year_format = `,${year_format}`;
      }

      date_format = dayofweek_format + month_format + day_format + year_format;
    }

    if (format_parts.indexOf('time') != -1) {
        time_format = format_parts.indexOf('24') != -1 ? 'HH:mm' : 'h:mma';

        if (format_parts.indexOf('tz') != -1) {
          time_format += ' [' + moment.tz(date, moment.tz.guess()).format('z') + ']';
        }

        if (format_parts.indexOf('gmt') != -1) {
            const offset = new Date().getTimezoneOffset() / 60;
            time_format += ' [GMT' + (offset>-.1 ? '+' : '') + offset + ']';
        }
    }

    date_format = date_format.trim();
    time_format = time_format.trim();

    return date_format + (date_format && time_format ? ' ' : '') + time_format;
  }

  private formatOptions(options) {
    options = { seconds: !!options.match(/second/),
                minutes: !!options.match(/minute/),
                hours: !!options.match(/hour/),
                days: !!options.match(/day/),
                months: !!options.match(/month/),
                years: !!options.match(/year/) };

    let precision = 0;
    for (let option of options) {
      if (option) {
        precision++;
      }
    };

    options.precision = precision;

    return options;
  }
}
