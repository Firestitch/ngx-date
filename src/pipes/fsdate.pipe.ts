import { Pipe } from '@angular/core';
import { FsDateFormatPipe } from './fsdateformat.pipe';

@Pipe({
    name: 'fsDate'
})
export class FsDatePipe extends FsDateFormatPipe {}
