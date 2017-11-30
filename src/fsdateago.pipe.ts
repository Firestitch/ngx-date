import { Pipe, PipeTransform } from '@angular/core';
import { FsDate } from './fsdate.service';

@Pipe({
  name: 'fsDateAgo'
})
export class FsDateAgoPipe implements PipeTransform {

  constructor(private FsDate: FsDate) {}

  transform(value: any, format?: string): string {
    return this.FsDate.ago(value, format);
  }
}

