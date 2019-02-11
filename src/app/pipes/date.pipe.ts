import { Pipe } from '@angular/core';

import { FsDateFormatPipe } from './date-format.pipe';


@Pipe({
    name: 'fsDate'
})
export class FsDatePipe extends FsDateFormatPipe {}
