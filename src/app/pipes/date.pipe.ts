import { Pipe, PipeTransform } from '@angular/core';

import { FsDateFormatPipe } from './date-format.pipe';


@Pipe({
    name: 'fsDate',
    standalone: true,
})
export class FsDatePipe extends FsDateFormatPipe implements PipeTransform {}
