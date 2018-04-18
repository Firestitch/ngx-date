import { round, isNumber } from 'lodash';
import { SECONDS } from '../constants/seconds';

export function duration(time: any, options) {
    if (!isNumber(time)) {
      return '';
    }

    if (typeof options === 'string') {

        options = { seconds: !!options.match(/second/),
                    minutes: !!options.match(/minute/),
                    hours: !!options.match(/hour/),
                    days: !!options.match(/day/),
                    months: !!options.match(/month/),
                    years: !!options.match(/year/) };

        let precision = 0;
        for (const option of options) {
            if (option) {
                precision++;
            }
        };

        options.precision = precision;
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
        const value = round(total_seconds / units[name]['seconds'], precision);
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

    // there are no values so show zero of the smallest unit (i.e. "0s")
    if (output.length === 0) {
      for (const name in units) {
        if (units.hasOwnProperty(name)) {
          if (options[name]) {
            output = [ '0' + (options.abr ? units[name].abr :  ' ' + (units[name] == 1 ? units[name].single : units[name].plural)) ];
          }
        }
      }
    }

    // add suffix if required
    if (options.suffix) {
      output.push(options.suffix);
    }

    return output.join(' ');
}