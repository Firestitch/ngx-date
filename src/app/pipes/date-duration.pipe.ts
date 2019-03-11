import { Pipe, PipeTransform } from '@angular/core';

import { duration } from '../../libs';


@Pipe({
  name: 'fsDateDuration'
})
export class FsDateDurationPipe implements PipeTransform {

  transform(value: any, fmt?: Object): string {
    return duration(value, fmt);
  }
}
