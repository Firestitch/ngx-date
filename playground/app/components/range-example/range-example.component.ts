import { ChangeDetectionStrategy, Component } from '@angular/core';

import { range } from '@firestitch/date';

import { addDays, addMonths, addYears, parse, setHours } from 'date-fns';


@Component({
    selector: 'range-example',
    templateUrl: './range-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class RangeExampleComponent {

  public currentDate = new Date();
  public formatted = `${this.currentDate.getDate()}/${this.currentDate.getMonth() + 1}/${this.currentDate.getFullYear()}`;

  public examples = [
    {
      format: 'date',
      context: 'Yearless',
      result: range(this.currentDate, this.currentDate, 'date-yearless' ),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'date-yearless\'}}',
      codeService: 'range(range.start, range.end, \'date-yearless\')',
    },
    {
      format: 'date',
      context: 'Current year',
      result: range(this.currentDate, this.currentDate, 'date-yeardiff'),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'date-yeardiff\'}}',
      codeService: 'range(range.start, range.end, \'date-yeardiff\')',
    },
    {
      format: 'date',
      context: 'Same date/time',
      result: range(this.currentDate, this.currentDate, 'date'),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'date\'}}',
      codeService: 'range(range.start, range.end, \'date\')',
    },
    {
      format: 'date',
      context: 'Same month',
      result: range(
        this.currentDate,
        addDays(this.currentDate, 1),
        'date',
      ),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'date\'}}',
      codeService: 'range(range.start, range.end, \'date\')',
    },
    {
      format: 'date',
      context: 'Diff month',
      result: range(
        this.currentDate,
        addMonths(this.currentDate, 1),
        'date',
      ),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'date\'}}',
      codeService: 'range(range.start, range.end, \'date\')',
    },
    {
      format: 'date',
      context: 'Different years',
      result: range(
        this.currentDate,
        addYears(this.currentDate, 1),
        'date',
      ),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'date\'}}',
      codeService: 'range(range.start, range.end, \'date\')',
    },

    {
      format: 'date',
      context: 'Different years one not current year',
      result: range(
        this.currentDate,
        addYears(this.currentDate, 1),
        'date-yeardiff',
      ),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'date-yeardiff\'}}',
      codeService: 'range(range.start, range.end, \'date-yeardiff\')',
    },
    {
      format: 'date',
      context: 'Same year not current year',
      result: range(
        addYears(this.currentDate, 1),
        addYears(addDays(this.currentDate, 3), 1),
        'date-yeardiff',
      ),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'date\'}}',
      codeService: 'range(range.start, range.end, \'date\')',
    },
    // DATE-TIME
    {
      format: 'date-time',
      context: 'Same date/time',
      result: range(
        this.currentDate,
        this.currentDate,
        'date-time',
      ),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'date-time\'}}',
      codeService: 'range(range.start, range.end, \'date-time\')',
    },
    {
      format: 'date-time',
      context: 'Suppress year, when date is in current year',
      result: range(
        setHours(this.currentDate, 10),
        setHours(this.currentDate, 11),
        'date-time',
      ),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'date-time\'}}',
      codeService: 'range(range.start, range.end, \'date-time\')',
    },
    {
      format: 'date-time',
      context: 'Suppress year, when date is not in current year',
      result: range(
        addYears(setHours(this.currentDate, 10), 1),
        addYears(setHours(this.currentDate, 11), 1),
        'date-time',
      ),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'date-time\'}}',
      codeService: 'range(range.start, range.end, \'date-time\')',
    },
    {
      format: 'date-time',
      context: 'Diff am/pm',
      result: range(
        parse(`${this.formatted  } 11:00 AM`, 'dd/M/yyyy hh:mm a', new Date()),
        parse(`${this.formatted  } 01:00 PM`, 'dd/M/yyyy hh:mm a', new Date()),
        'date-time',
      ),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'date-time\'}}',
      codeService: 'range(range.start, range.end, \'date-time\')',
    },
    {
      format: 'date-time',
      context: 'Same month',
      result: range(
        this.currentDate,
        addDays(this.currentDate, 1),
        'date-time',
      ),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'date-time\'}}',
      codeService: 'range(range.start, range.end, \'date-time\')',
    },
    {
      format: 'date-time',
      context: 'Diff month',
      result: range(
        this.currentDate,
        addMonths(this.currentDate, 1),
        'date-time',
      ),
      codePipe: '{{[range.start, range.end] | fsDateRange:\' date-time\'}}',
      codeService: 'range(range.start, range.end, \'date-time\')',
    },
    {
      format: 'date-time',
      context: 'Diff year',
      result: range(
        this.currentDate,
        addYears(this.currentDate, 1),
        'date-time',
      ),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'date-time\'}}',
      codeService: 'range(range.start, range.end, \'date-time\')',
    },
    // DAY-DATE-TIME
    {
      format: 'day-date-time',
      context: 'Same date/time',
      result: range(this.currentDate, this.currentDate, 'day-date-time'),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'day-date-time\'}}',
      codeService: 'range(range.start, range.end, \'day-date-time\')',
    },
    {
      format: 'day-date-time',
      context: 'Same am/pm',
      result: range(
        parse(`${this.formatted  } 10:00 AM`, 'dd/M/yyyy hh:mm a', this.currentDate),
        parse(`${this.formatted  } 11:00 AM`, 'dd/M/yyyy hh:mm a', this.currentDate),
        'day-date-time',
      ),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'day-date-time\'}}',
      codeService: 'range(range.start, range.end, \'day-date-time\')',
    },
    {
      format: 'day-date-time',
      context: 'Diff am/pm',
      result: range(
        parse(`${this.formatted  } 11:00 AM`, 'dd/M/yyyy hh:mm a', this.currentDate),
        parse(`${this.formatted  } 01:00 PM`, 'dd/M/yyyy hh:mm a', this.currentDate),
        'day-date-time',
      ),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'day-date-time\'}}',
      codeService: 'range(range.start, range.end, \'day-date-time\')',
    },
    {
      format: 'day-date-time',
      context: 'Same month',
      result: range(
        this.currentDate,
        addDays(this.currentDate, 1),
        'day-date-time',
      ),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'day-date-time\'}}',
      codeService: 'range(range.start, range.end, \'day-date-time\')',
    },
    {
      format: 'day-date-time',
      context: 'Diff month',
      result: range(
        this.currentDate,
        addMonths(this.currentDate, 1),
        'day-date-time',
      ),
      codePipe: '{{[range.start, range.end] | fsDateRange:\' day-date-time\'}}',
      codeService: 'range(range.start, range.end, \'day-date-time\')',
    },
    {
      format: 'day-date-time',
      context: 'Diff year',
      result: range(
        this.currentDate,
        addYears(this.currentDate, 1),
        'day-date-time',
      ),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'day-date-time\'}}',
      codeService: 'range(range.start, range.end, \'day-date-time\')',
    },
    // FULL-DAY-DATE-TIME
    {
      format: 'full-day-date-time',
      context: 'Same date/time',
      result: range(
        this.currentDate,
        this.currentDate,
        'full-day-date-time',
      ),

      codePipe: '{{[range.start, range.end] | fsDateRange: \'full-day-date-time\'}}',
      codeService: 'range(range.start, range.end, \'full-day-date-time\')',
    }
    ,
    {
      format: 'full-day-date-time',
      context: 'Same am/pm',
      result: range(
        parse(`${this.formatted  } 10:00 AM`, 'dd/M/yyyy hh:mm a', this.currentDate),
        parse(`${this.formatted  } 11:00 AM`, 'dd/M/yyyy hh:mm a', this.currentDate),
        'full-day-date-time',
      ),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'full-day-date-time\'}}',
      codeService: 'range(range.start, range.end, \'full-day-date-time\')',
    },
    {
      format: 'full-day-date-time',
      context: 'Diff am/pm',
      result: range(
        parse(`${this.formatted  } 11:00 AM`, 'dd/M/yyyy hh:mm a', this.currentDate),
        parse(`${this.formatted  } 01:00 PM`, 'dd/M/yyyy hh:mm a', this.currentDate),
        'full-day-date-time',
      ),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'full-day-date-time\'}}',
      codeService: 'range(range.start, range.end, \'full-day-date-time\')',
    },
    {
      format: 'full-day-date-time',
      context: 'Same month',
      result: range(
        this.currentDate,
        addDays(this.currentDate, 1),
        'full-day-date-time',
      ),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'full-day-date-time\'}}',
      codeService: 'range(range.start, range.end, \'full-day-date-time\')',
    },
    {
      format: 'full-day-date-time',
      context: 'Diff month',
      result: range(
        this.currentDate,
        addMonths(this.currentDate, 1),
        'full-day-date-time',
      ),
      codePipe: '{{[range.start, range.end] | fsDateRange:\' full-day-date-time\'}}',
      codeService: 'range(range.start, range.end, \'full-day-date-time\')',
    },
    {
      format: 'full-day-date-time',
      context: 'Diff year',
      result: range(
        this.currentDate,
        addYears(this.currentDate, 1),
        'full-day-date-time',
      ),
      codePipe: '{{[range.start, range.end] | fsDateRange: \'full-day-date-time\'}}',
      codeService: 'range(range.start, range.end, \'full-day-date-time\')',
    },
  ];
}
