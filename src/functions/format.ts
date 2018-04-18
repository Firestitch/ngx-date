import * as moment from 'moment-timezone';
import { toMomentFormat } from './toMomentFormat';

export function format(date, format?: String): String {

    const outputFormat = toMomentFormat(date, format);

    return moment(date).format(outputFormat);
}
