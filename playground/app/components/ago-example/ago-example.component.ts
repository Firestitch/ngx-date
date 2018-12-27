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
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(moment())
    },
    {
      name: '1 minute in past',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(moment().subtract(1, 'minutes'))
    },
    {
      name: '1 hour in past',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(moment().subtract(1, 'hours'))
    },
    {
      name: '1 day in past',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(moment().subtract(1, 'days'))
    },
    {
      name: '1 month in past',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(moment().subtract(1, 'months'))
    },
    {
      name: '1 year in past',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(moment().subtract(1, 'years'))
    },
    {
      name: '1 minute in future',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(moment().add(1, 'minutes'))
    },
    {
      name: '1 hour in future',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(moment().add(1, 'hours'))
    },
    {
      name: '1 day in future',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(moment().add(1, 'days'))
    },
    {
      name: '1 month in future',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(moment().add(1, 'months'))
    },
    {
      name: '1 year in future',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(moment().add(1, 'years'))
    },
    {
      name: '1 year in future',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo: \'date-time\' }}',
      result: ago(moment().add(1, 'years'), 'date-time')
    }
  ];
}
