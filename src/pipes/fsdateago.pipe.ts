import { Pipe, PipeTransform } from '@angular/core';
import { ago } from '../functions';

@Pipe({
  name: 'fsDateAgo'
})
export class FsDateAgoPipe implements PipeTransform {
  transform(value: any, format?: String): String {
    return ago(value, format);
  }
}

