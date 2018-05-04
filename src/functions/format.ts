import * as moment from 'moment-timezone';
import { toMomentFormat } from './tomomentformat';

export function format(date, format?: string): string {

    const outputFormat = toMomentFormat(date, format);

    return moment(date).format(outputFormat);
}
