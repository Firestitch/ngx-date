import * as moment_ from 'moment';
const moment = moment_;

import { toMomentFormat } from './tomomentformat';

export function format(date, format?: string): string {

    const outputFormat = toMomentFormat(date, format);

    return moment(date).format(outputFormat);
}
