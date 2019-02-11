import { duration } from './duration';

export function granularDuration(time, options = {}) {
    options['seconds'] = options['seconds'] === undefined ? false: options['seconds'];
    options['months'] = options['months'] === undefined ? false : options['months'];
    options['years'] = options['years'] === undefined ? false : options['years'];
    options['precision'] = options['precision'] === undefined ? 3 : options['precision'];
    return duration(time, options);
}