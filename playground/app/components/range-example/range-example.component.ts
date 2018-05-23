import { Component } from '@angular/core';
import { range } from './../../../../src';

import * as moment from 'moment-timezone';

@Component({
  selector: 'range-example',
  templateUrl: 'range-example.component.html'
})
export class RangeExampleComponent {

  public examples = [
      {
        name: 'date',
        codeService: "range(range.start, range.end, 'date')",
        codePipe: "{{[range.start,range.end] | fsDateRange:'date'}}",
        result: range(moment(), moment().add(1, 'days'), 'date')
      }
    ];
}
