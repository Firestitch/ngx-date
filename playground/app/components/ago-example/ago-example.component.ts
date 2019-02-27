import { Component } from '@angular/core';

import { ago } from '@firestitch/date';
import {
  addDays,
  addHours,
  addMinutes, addMonths, addYears,
  subDays,
  subHours,
  subMinutes,
  subMonths,
  subYears
} from 'date-fns';


@Component({
  selector: 'ago-example',
  templateUrl: 'ago-example.component.html'
})
export class AgoExampleComponent {

  currentDate = new Date();

  examples = [
    {
      name: 'none',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(this.currentDate)
    },
    {
      name: '1 minute in past',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(subMinutes(this.currentDate, 1))
    },
    {
      name: '1 hour in past',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(subHours(this.currentDate, 1))
    },
    {
      name: '1 day in past',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(subDays(this.currentDate, 1))
    },
    {
      name: '1 month in past',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(subMonths(this.currentDate, 1))
    },
    {
      name: '1 year in past',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(subYears(this.currentDate, 1))
    },
    {
      name: '1 minute in future',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(addMinutes(this.currentDate, 1))
    },
    {
      name: '1 hour in future',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(addHours(this.currentDate, 1))
    },
    {
      name: '1 day in future',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(addDays(this.currentDate, 1))
    },
    {
      name: '1 month in future',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(addMonths(this.currentDate, 1))
    },
    {
      name: '1 year in future',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo }}',
      result: ago(addYears(this.currentDate, 1))
    },
    {
      name: '1 year in future',
      codeDirective: '<span fsDateAgo [date]="date" [showTime]="showTime" format="format"></span>',
      codeComponent: '<fs-date-ago [date]="date" [showTime]="showTime"></fs-date-ago>',
      codePipe: '{{ date | fsDateAgo: \'date-time\' }}',
      result: ago(addYears(this.currentDate, 1), 'date-time')
    }
  ];
}
