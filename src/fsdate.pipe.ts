import { Pipe, PipeTransform } from '@angular/core';
import { FsDate } from './fsdate.service';

@Pipe({
    name: 'fsDate'
})
export class FsDatePipe implements PipeTransform {

    constructor(private FsDate: FsDate) {}

    transform(value: any, format?: string): string {
      return this.FsDate.format(value, format);
    }
}
