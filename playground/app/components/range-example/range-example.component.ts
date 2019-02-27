import { Component } from '@angular/core';

import { range } from '@firestitch/date';
import { addDays, addMonths, addYears, parse } from 'date-fns';


@Component({
  selector: 'range-example',
  templateUrl: 'range-example.component.html'
})
export class RangeExampleComponent {

  public currentDate = new Date();
  public formatted = `${this.currentDate.getDate()}/${this.currentDate.getMonth() + 1}/${this.currentDate.getFullYear()}`;

  public examples = [
    // DATE
    {
      format: 'date',
      context: 'Same date/time',
      result: range(new Date(), new Date(), 'date'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'date'}}",
      codeService: "range(range.start, range.end, 'date')"
    },
    {
      format: 'date',
      context: 'Same am/pm',
      result: range(
        parse(this.formatted + ' 10:00 AM', 'dd/M/yyyy hh:mm a', new Date()),
        parse(this.formatted + ' 11:00 AM', 'dd/M/yyyy hh:mm a', new Date()),
        'date'
      ),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'date'}}",
      codeService: "range(range.start, range.end, 'date')"
    },
    {
      format: 'date',
      context: 'Diff am/pm',
      result: range(
        parse(this.formatted + ' 11:00 AM', 'dd/M/yyyy hh:mm a', new Date()),
        parse(this.formatted + ' 01:00 PM', 'dd/M/yyyy hh:mm a', new Date()),
        'date'
      ),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'date'}}",
      codeService: "range(range.start, range.end, 'date')"
    },
    {
      format: 'date',
      context: 'Same month',
      result: range(
        new Date(),
        addDays(new Date(), 1),
        'date'
      ),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'date'}}",
      codeService: "range(range.start, range.end, 'date')"
    },
    {
      format: 'date',
      context: 'Diff month',
      result: range(
        new Date(),
        addMonths(new Date(), 1),
        'date'
      ),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'date'}}",
      codeService: "range(range.start, range.end, 'date')"
    },
    {
      format: 'date',
      context: 'Diff year',
      result: range(
        new Date(),
        addYears(new Date(), 1),
        'date'
      ),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'date'}}",
      codeService: "range(range.start, range.end, 'date')"
    },
    // DATE-TIME
    {
      format: 'date-time',
      context: 'Same date/time',
      result: range(
        new Date(),
        new Date(),
        'date-time'
      ),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'date-time'}}",
      codeService: "range(range.start, range.end, 'date-time')"
    },
    {
      format: 'date-time',
      context: 'Same am/pm',
      result: range(
        parse(this.formatted + ' 10:00 AM', 'dd/M/yyyy hh:mm a', new Date()),
        parse(this.formatted + ' 11:00 AM', 'dd/M/yyyy hh:mm a', new Date()),
        'date-time'
      ),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'date-time'}}",
      codeService: "range(range.start, range.end, 'date-time')"
    },
    {
      format: 'date-time',
      context: 'Diff am/pm',
      result: range(
        parse(this.formatted + ' 11:00 AM', 'dd/M/yyyy hh:mm a', new Date()),
        parse(this.formatted + ' 01:00 PM', 'dd/M/yyyy hh:mm a', new Date()),
        'date-time'
      ),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'date-time'}}",
      codeService: "range(range.start, range.end, 'date-time')"
    },
    {
      format: 'date-time',
      context: 'Same month',
      result: range(
        new Date(),
        addDays(new Date(), 1),
        'date-time'
      ),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'date-time'}}",
      codeService: "range(range.start, range.end, 'date-time')"
    },
    {
      format: 'date-time',
      context: 'Diff month',
      result: range(
        new Date(),
        addMonths(new Date(), 1),
        'date-time'
      ),
      codePipe: "{{[range.start, range.end] | fsDateRange:' date-time'}}",
      codeService: "range(range.start, range.end, 'date-time')"
    },
    {
      format: 'date-time',
      context: 'Diff year',
      result: range(
        new Date(),
        addYears(new Date(), 1),
        'date-time',
      ),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'date-time'}}",
      codeService: "range(range.start, range.end, 'date-time')"
    },
    // DAY-DATE-TIME
    {
      format: 'day-date-time',
      context: 'Same date/time',
      result: range(new Date(), new Date(), 'day-date-time'),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'day-date-time'}}",
      codeService: "range(range.start, range.end, 'day-date-time')"
    },
    {
      format: 'day-date-time',
      context: 'Same am/pm',
      result: range(
        parse(this.formatted + ' 10:00 AM', 'dd/M/yyyy hh:mm a', new Date()),
        parse(this.formatted + ' 11:00 AM', 'dd/M/yyyy hh:mm a', new Date()),
        'day-date-time'
      ),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'day-date-time'}}",
      codeService: "range(range.start, range.end, 'day-date-time')"
    },
    {
      format: 'day-date-time',
      context: 'Diff am/pm',
      result: range(
        parse(this.formatted + ' 11:00 AM', 'dd/M/yyyy hh:mm a', new Date()),
        parse(this.formatted + ' 01:00 PM', 'dd/M/yyyy hh:mm a', new Date()),
        'day-date-time'
      ),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'day-date-time'}}",
      codeService: "range(range.start, range.end, 'day-date-time')"
    },
    {
      format: 'day-date-time',
      context: 'Same month',
      result: range(
        new Date(),
        addDays(new Date, 1),
        'day-date-time'
      ),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'day-date-time'}}",
      codeService: "range(range.start, range.end, 'day-date-time')"
    },
    {
      format: 'day-date-time',
      context: 'Diff month',
      result: range(
        new Date(),
        addMonths(new Date(), 1),
        'day-date-time'
      ),
      codePipe: "{{[range.start, range.end] | fsDateRange:' day-date-time'}}",
      codeService: "range(range.start, range.end, 'day-date-time')"
    },
    {
      format: 'day-date-time',
      context: 'Diff year',
      result: range(
        new Date(),
        addYears(new Date(), 1),
        'day-date-time'
      ),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'day-date-time'}}",
      codeService: "range(range.start, range.end, 'day-date-time')"
    },
    // FULL-DAY-DATE-TIME
    {
      format: 'full-day-date-time',
      context: 'Same date/time',
      result: range(
        new Date(),
        new Date(),
        'full-day-date-time'
      ),

      codePipe: "{{[range.start, range.end] | fsDateRange: 'full-day-date-time'}}",
      codeService: "range(range.start, range.end, 'full-day-date-time')"
    }
    ,
    {
      format: 'full-day-date-time',
      context: 'Same am/pm',
      result: range(
        parse(this.formatted + ' 10:00 AM', 'dd/M/yyyy hh:mm a', new Date()),
        parse(this.formatted + ' 11:00 AM', 'dd/M/yyyy hh:mm a', new Date()),
        'full-day-date-time'
      ),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'full-day-date-time'}}",
      codeService: "range(range.start, range.end, 'full-day-date-time')"
    },
    {
      format: 'full-day-date-time',
      context: 'Diff am/pm',
      result: range(
        parse(this.formatted + ' 11:00 AM', 'dd/M/yyyy hh:mm a', new Date()),
        parse(this.formatted + ' 01:00 PM', 'dd/M/yyyy hh:mm a', new Date()),
        'full-day-date-time'
      ),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'full-day-date-time'}}",
      codeService: "range(range.start, range.end, 'full-day-date-time')"
    },
    {
      format: 'full-day-date-time',
      context: 'Same month',
      result: range(
        new Date(),
        addDays(new Date(), 1),
        'full-day-date-time'
      ),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'full-day-date-time'}}",
      codeService: "range(range.start, range.end, 'full-day-date-time')"
    },
    {
      format: 'full-day-date-time',
      context: 'Diff month',
      result: range(
        new Date(),
        addMonths(new Date(), 1),
        'full-day-date-time'
      ),
      codePipe: "{{[range.start, range.end] | fsDateRange:' full-day-date-time'}}",
      codeService: "range(range.start, range.end, 'full-day-date-time')"
    },
    {
      format: 'full-day-date-time',
      context: 'Diff year',
      result: range(
        new Date(),
        addYears(new Date(), 1),
        'full-day-date-time'
      ),
      codePipe: "{{[range.start, range.end] | fsDateRange: 'full-day-date-time'}}",
      codeService: "range(range.start, range.end, 'full-day-date-time')"
    }
  ];
}
