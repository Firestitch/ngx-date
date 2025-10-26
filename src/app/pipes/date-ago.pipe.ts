import { Pipe, PipeTransform } from '@angular/core';

import { ago } from '../../libs';


@Pipe({
    name: 'fsDateAgo',
    standalone: true
})
export class FsDateAgoPipe implements PipeTransform {
  transform(value: any, format?: string): string {
    return ago(value, format);
  }
}

