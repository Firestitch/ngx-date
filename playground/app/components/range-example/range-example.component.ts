import { Component } from '@angular/core';
import { range } from './../../../../src';

import * as moment from 'moment-timezone';

@Component({
  selector: 'range-example',
  templateUrl: 'range-example.component.html'
})
export class RangeExampleComponent {

  public examples = [
    // DATE
    {
      format: 'date',
      context: 'Same date/time',
      result: range(moment(), moment(), 'date'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'date'}}",
      codeService: "range(range.start, range.end, 'date')"
    },
    {
      format: 'date',
      context: 'Same am/pm',
      result: range(moment('10:00 AM', 'hh:mm A'), moment('11:00 AM', 'hh:mm A'), 'date'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'date'}}",
      codeService: "range(range.start, range.end, 'date')"
    },
    {
      format: 'date',
      context: 'Diff am/pm',
      result: range(moment('11:00 AM', 'hh:mm A'), moment('01:00 PM', 'hh:mm A'), 'date'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'date'}}",
      codeService: "range(range.start, range.end, 'date')"
    },
    {
      format: 'date',
      context: 'Same month',
      result: range(moment(), moment().add(1, 'days'), 'date'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'date'}}",
      codeService: "range(range.start, range.end, 'date')"
    },
    {
      format: 'date',
      context: 'Diff month',
      result: range(moment(), moment().add(1, 'months'), 'date'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'date'}}",
      codeService: "range(range.start, range.end, 'date')"
    },
    {
      format: 'date',
      context: 'Diff year',
      result: range(moment(), moment().add(1, 'year'), 'date'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'date'}}",
      codeService: "range(range.start, range.end, 'date')"
    },
    // DATE-TIME
    {
      format: 'date-time',
      context: 'Same date/time',
      result: range(moment(), moment(), 'date-time'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'date-time'}}",
      codeService: "range(range.start, range.end, 'date-time')"
    },
    {
      format: 'date-time',
      context: 'Same am/pm',
      result: range(moment('10:00 AM', 'hh:mm A'), moment('11:00 AM', 'hh:mm A'), 'date-time'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'date-time'}}",
      codeService: "range(range.start, range.end, 'date-time')"
    },
    {
      format: 'date-time',
      context: 'Diff am/pm',
      result: range(moment('11:00 AM', 'hh:mm A'), moment('01:00 PM', 'hh:mm A'), 'date-time'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'date-time'}}",
      codeService: "range(range.start, range.end, 'date-time')"
    },
    {
      format: 'date-time',
      context: 'Same month',
      result: range(moment(), moment().add(1, 'days'), 'date-time'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'date-time'}}",
      codeService: "range(range.start, range.end, 'date-time')"
    },
    {
      format: 'date-time',
      context: 'Diff month',
      result: range(moment(), moment().add(1, 'months'), 'date-time'),
      codePipe: "{{[range.start, range.end] | fsDateRange:' date-time'}}",
      codeService: "range(range.start, range.end, 'date-time')"
    },
    {
      format: 'date-time',
      context: 'Diff year',
      result: range(moment(), moment().add(1, 'year'), 'date-time'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'date-time'}}",
      codeService: "range(range.start, range.end, 'date-time')"
    },
    // DAY-DATE-TIME
    {
      format: 'day-date-time',
      context: 'Same date/time',
      result: range(moment(), moment(), 'day-date-time'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'day-date-time'}}",
      codeService: "range(range.start, range.end, 'day-date-time')"
    },
    {
      format: 'day-date-time',
      context: 'Same am/pm',
      result: range(moment('10:00 AM', 'hh:mm A'), moment('11:00 AM', 'hh:mm A'), 'day-date-time'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'day-date-time'}}",
      codeService: "range(range.start, range.end, 'day-date-time')"
    },
    {
      format: 'day-date-time',
      context: 'Diff am/pm',
      result: range(moment('11:00 AM', 'hh:mm A'), moment('01:00 PM', 'hh:mm A'), 'day-date-time'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'day-date-time'}}",
      codeService: "range(range.start, range.end, 'day-date-time')"
    },
    {
      format: 'day-date-time',
      context: 'Same month',
      result: range(moment(), moment().add(1, 'days'), 'day-date-time'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'day-date-time'}}",
      codeService: "range(range.start, range.end, 'day-date-time')"
    },
    {
      format: 'day-date-time',
      context: 'Diff month',
      result: range(moment(), moment().add(1, 'months'), 'day-date-time'),
      codePipe: "{{[range.start, range.end] | fsDateRange:' day-date-time'}}",
      codeService: "range(range.start, range.end, 'day-date-time')"
    },
    {
      format: 'day-date-time',
      context: 'Diff year',
      result: range(moment(), moment().add(1, 'year'), 'day-date-time'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'day-date-time'}}",
      codeService: "range(range.start, range.end, 'day-date-time')"
    },
    // FULL-DAY-DATE-TIME
    {
      format: 'full-day-date-time',
      context: 'Same date/time',
      result: range(moment(), moment(), 'full-day-date-time'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'full-day-date-time'}}",
      codeService: "range(range.start, range.end, 'full-day-date-time')"
    },
    {
      format: 'full-day-date-time',
      context: 'Same am/pm',
      result: range(moment('10:00 AM', 'hh:mm A'), moment('11:00 AM', 'hh:mm A'), 'full-day-date-time'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'full-day-date-time'}}",
      codeService: "range(range.start, range.end, 'full-day-date-time')"
    },
    {
      format: 'full-day-date-time',
      context: 'Diff am/pm',
      result: range(moment('11:00 AM', 'hh:mm A'), moment('01:00 PM', 'hh:mm A'), 'full-day-date-time'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'full-day-date-time'}}",
      codeService: "range(range.start, range.end, 'full-day-date-time')"
    },
    {
      format: 'full-day-date-time',
      context: 'Same month',
      result: range(moment(), moment().add(1, 'days'), 'full-day-date-time'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'full-day-date-time'}}",
      codeService: "range(range.start, range.end, 'full-day-date-time')"
    },
    {
      format: 'full-day-date-time',
      context: 'Diff month',
      result: range(moment(), moment().add(1, 'months'), 'full-day-date-time'),
      codePipe: "{{[range.start, range.end] | fsDateRange:' full-day-date-time'}}",
      codeService: "range(range.start, range.end, 'full-day-date-time')"
    },
    {
      format: 'full-day-date-time',
      context: 'Diff year',
      result: range(moment(), moment().add(1, 'year'), 'full-day-date-time'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'full-day-date-time'}}",
      codeService: "range(range.start, range.end, 'full-day-date-time')"
    }
  ];
}
