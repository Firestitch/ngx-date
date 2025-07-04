import { Pipe, PipeTransform } from '@angular/core';

import { range } from '../../libs';


@Pipe({
  name: 'fsDateRange',
})
export class FsDateRangePipe implements PipeTransform {
  public transform(value: any[], format?: string): string {
    return range(value[0], value[1], format);
  }
}

