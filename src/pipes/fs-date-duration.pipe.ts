import { Pipe, PipeTransform } from '@angular/core';
import { duration } from '../functions';

@Pipe({
  name: 'fsDateDuration'
})
export class FsDateDurationPipe implements PipeTransform {

  transform(value: any, fmt?: Object): String {
    return duration(value, fmt);
  }
}
