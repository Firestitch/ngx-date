import { Pipe, PipeTransform } from '@angular/core';

import { format } from '../../libs';


@Pipe({
  name: 'fsDateFormat',
})
export class FsDateFormatPipe implements PipeTransform {

  public transform(value: any, fmt?: string, timezone?: string): string {
    return format(value, fmt, { timezone });
  }
}
