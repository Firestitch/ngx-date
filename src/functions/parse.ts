import { SECONDS } from '../constants/seconds';

export function parse(value: string) {

  if (!value && typeof value !== 'string') {
    return 0;
  }

  value = value
    .trim()
    .replace(/(\d+)\s+/g,'$1')
    .replace(/\s+/,' ')
    .replace(/^\./,'0.');

  if (value.match(/^\d*(\.\d*)?$/)) {
    value += 'h';
  }

  let seconds = 0;

  value.split(' ').forEach((chunk) => {

    const matches = chunk.match(/^(\d+\.?\d*)([YMdhms])$/);

    if (!matches) {
      throw 'Invalid duration format';
    }

    const factor = {
      Y: SECONDS.YEAR,
      M: SECONDS.MONTH,
      d: SECONDS.DAY,
      h: SECONDS.HOUR,
      m: SECONDS.MINUTE,
      s: 1
    }[matches[2]];

    seconds += +matches[1] * factor;
  });

  return seconds;
}
