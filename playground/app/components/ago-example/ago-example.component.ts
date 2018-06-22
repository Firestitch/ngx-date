import { Component } from '@angular/core';
import * as moment from 'moment-timezone';
import { ago } from './../../../../src';

@Component({
  selector: 'ago-example',
  templateUrl: 'ago-example.component.html'
})
export class AgoExampleComponent {

  examples = [
    {
      name: 'none',
      codeService: 'ago(date)',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(moment())
    },
    {
      name: '1 minute in past',
      codeService: 'ago(date)',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(moment().subtract(1, 'minutes'))
    },
    {
      name: '1 hour in past',
      codeService: 'ago(date)',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(moment().subtract(1, 'hours'))
    },
    {
      name: '1 day in past',
      codeService: 'ago(date)',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(moment().subtract(1, 'days'))
    },
    {
      name: '1 month in past',
      codeService: 'ago(date)',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(moment().subtract(1, 'months'))
    },
    {
      name: '1 year in past',
      codeService: 'ago(date)',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(moment().subtract(1, 'years'))
    },
    {
      name: '1 minute in future',
      codeService: 'ago(date)',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(moment().add(1, 'minutes'))
    },
    {
      name: '1 hour in future',
      codeService: 'ago(date)',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(moment().add(1, 'hours'))
    },
    {
      name: '1 day in future',
      codeService: 'ago(date)',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(moment().add(1, 'days'))
    },
    {
      name: '1 month in future',
      codeService: 'ago(date)',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(moment().add(1, 'months'))
    },
    {
      name: '1 year in future',
      codeService: 'ago(date)',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(moment().add(1, 'years'))
    },
    {
      name: '1 year in future',
      codeService: 'ago(date, \'date-time\')',
      codePipe: '{{ date | fsDateAgo: \'date-time\' }}',
      result: ago(moment().add(1, 'years'), 'date-time')
    }
  ];
}
