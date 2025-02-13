/* eslint-disable complexity */
/* eslint-disable max-statements */
import { round } from '@firestitch/common';

import { SECONDS } from '../app/constants/seconds';

import { parseDuration } from './parse-duration';

interface DurationOptions { 
  seconds?: boolean,
  minutes?: boolean,
  hours?: boolean,
  days?: boolean,
  months?: boolean,
  years?: boolean,
  suffix?: any,
  maxOutputs?: number,
  abr?: boolean,
  unit?: string,
  precision?: number,
  pad?: boolean,
  thousandsSeperator?: boolean,
}

export function duration(time: any, _options?: DurationOptions | string) {
  const options = _getOptions(time, _options);

  if (typeof time === 'string') {
    const parsedResult = parseDuration(time);

    if (parsedResult.error) {
      return null;
    } 

    time = parsedResult.time;
  }

  switch (options.unit) {
    case 'minutes': {
      time = time * 60;
  
      break;
    }
    case 'hours': {
      time = Math.round(time * 60 * 60);
  
      break;
    }
    case 'days': {
      time = Math.round(time * 60 * 60 * 24);
  
      break;
    }
  }

  time = Math.abs(parseInt(time));
  const pieces: {
    years?: number;
    months?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  } = {};

  let remainder = time;

  if (options.years) {
    const years = remainder / SECONDS.YEAR;
    if (years >= 1) {
      pieces.years = !options.months && 
      !options.days && 
      !options.hours && 
      !options.minutes &&
       !options.seconds ? Math.round(years) : Math.floor(years);
      remainder = remainder - (pieces.years * SECONDS.YEAR);
    }
  }

  if (options.months) {
    const months = remainder / SECONDS.MONTH;
    if (months >= 1) {
      pieces.months = !options.days && !options.hours && !options.minutes && !options.seconds ? Math.round(months) : Math.floor(months);
      remainder = remainder - (pieces.months * SECONDS.MONTH);
    }
  }

  if (options.days) {
    const days = remainder / SECONDS.DAY;
    if (days >= 1) {
      pieces.days = !options.hours && !options.minutes && !options.seconds ? Math.round(days) : Math.floor(days);
      remainder = remainder - (pieces.days * SECONDS.DAY);
    }
  }

  if (options.hours) {
    const hours = remainder / SECONDS.HOUR;
    if (hours >= 1) {
      pieces.hours = !options.minutes && !options.seconds ? Math.round(hours) : Math.floor(hours);
      remainder = remainder - (pieces.hours * SECONDS.HOUR);
    }
  }

  if (options.minutes) {
    const minutes = remainder / 60;
    if (minutes >= 1) {
      pieces.minutes = !options.seconds ? Math.round(minutes) : Math.floor(minutes);
      remainder = remainder - (pieces.minutes * SECONDS.MINUTE);
    }
  }

  pieces.seconds = Math.round(remainder);

  const enabled = [];
  let totalSeconds = 0;
  Object.keys(units).forEach((name) => {
    if (options[name]) {
      enabled.push(name);
    }
    totalSeconds += pieces[name] * units[name].seconds;
  });

  let output = [];

  if (enabled.length === 1) {
    options.precision = options.precision === undefined ? 1 : options.precision;
    const name = enabled.join('');
    const value = numberFormat(totalSeconds / units[name]['seconds'], options);
    output.push(value + (options.abr ? units[name].abr :  ` ${parseInt(value) === 1 ? units[name].single : units[name].plural}`));
  } else {
    options.precision = options.precision === undefined ? enabled.length : options.precision;

    Object.keys(units).forEach((name) => {
      if (options.precision && output.length >= options.precision) {
        return;
      }

      if (options[name]) {
        const value = pieces[name];
        if (value) {
          output.push(numberFormat(value, options) + (options.abr ? units[name].abr :  ` ${parseInt(value) === 1 ? units[name].single : units[name].plural}`));
        }
      }
    });
  }

  // there are no values so show zero of the smallest unit (i.e. "0s")
  if (output.length === 0) {
    Object.keys(units).forEach((name) => {
      if (options[name]) {
        output = [numberFormat(0, options) + (options.abr ? units[name].abr :  ` ${parseInt(units[name]) === 1 ? units[name].single : units[name].plural}`)];
      }
    });
  }

  // to cut off output depends on maxOutput value
  if (options.maxOutputs && options.maxOutputs < output.length) {
    output = output.splice(0, options.maxOutputs);
  }

  // add suffix if required
  if (options.suffix) {
    output.push(options.suffix);
  }

  return output.join(' ');
}


function numberFormat(number, options: any = {}) {
  const precision = options.precision === undefined ? -1 : options.precision;
  const pad = options.pad === undefined ? false : options.pad;
  const thousandsSeperator = options.thousandsSeperator === undefined ? true : options.thousandsSeperator;

  if(thousandsSeperator) {
    if (precision >= 0) {
      number = round(number, precision);
    }

    return number.toLocaleString('en-US', { minimumFractionDigits: pad ? precision : 0 });
  }

  if (precision >= 0 && pad) {
    return number.toFixed(precision);
  }

  if (precision >= 0) {
    return round(number, precision);
  }

  return number;
}

function _getOptions(time, options: DurationOptions | string): DurationOptions {
  if(typeof options === 'string') {
    return {
      seconds: !!options.match(/second/),
      minutes: !!options.match(/minute/),
      hours: !!options.match(/hour/),
      days: !!options.match(/day/),
      months: !!options.match(/mont h/),
      years: !!options.match(/year/),
    };
  }

  options = { ...options };
  options.unit = options.unit === undefined || typeof time === 'string' ? 'seconds' : options.unit;
  options.abr = options.abr === undefined ? true : options.abr;
  options.suffix = options.suffix ? (time > 0 ? ' ago' : ' from now') : '';
  options.pad = options.pad === undefined ? false : options.pad;
  options.thousandsSeperator = options.thousandsSeperator === undefined ? true : options.thousandsSeperator;

  if (!options.seconds && !options.minutes && !options.hours && !options.days && !options.months && !options.years) {
    options.seconds = true;
    options.minutes = false;
    options.hours = false;
    options.days = false;
    options.months = false;
    options.years = false;
  } else {
    options.seconds = options.seconds === undefined ? false : options.seconds;
    options.minutes = options.minutes === undefined ? false : options.minutes;
    options.hours = options.hours === undefined ? false : options.hours;
    options.days = options.days === undefined ? false : options.days;
    options.months = options.months === undefined ? false : options.months;
    options.years = options.years === undefined ? false : options.years;
  }

  return options;
}

const units = {
  years:      { abr: 'Y', single: 'year', plural: 'years', seconds: SECONDS.YEAR, next: 'months' },
  months:     { abr: 'M', single: 'month', plural: 'months', seconds: SECONDS.MONTH, next: 'days' },
  days:       { abr: 'd', single: 'day', plural: 'days', seconds: SECONDS.DAY, next: 'hours' },
  hours:      { abr: 'h', single: 'hour', plural: 'hours', seconds: SECONDS.HOUR, next: 'months' },
  minutes:    { abr: 'm', single: 'minute', plural: 'minutes', seconds: SECONDS.MINUTE, next: 'seconds' },
  seconds:    { abr: 's', single: 'second', plural: 'seconds', seconds: 1, next: null },
};
