import { Component } from '@angular/core';
import { format } from '@firestitch/date';

@Component({
  selector: 'format-example',
  templateUrl: 'format-example.component.html'
})
export class FormatExampleComponent {

  examples = [
      {
        name: 'none',
        codeService: 'format(date)',
        codePipe: '{{ date | fsDateFormat }}',
        result: format(new Date())
      },
      {
        name: 'date',
        codePipe: '{{ date | fsDateFormat: \'date\' }}',
        codeService: 'format(date, \'date\')',
        result: format(new Date(), 'date')
      },
      {
        name: 'full-date',
        codePipe: '{{ date | fsDateFormat: \'full-date\' }}',
        codeService: 'format(date, \'full-date\')',
        result: format(new Date(), 'full-date')
      },
      {
        name: 'day-date',
        codePipe: '{{ date | fsDateFormat: \'day-date\' }}',
        codeService: 'format(date, \'day-date\')',
        result: format(new Date(), 'day-date')
      },
      {
        name: 'full-day-date',
        codePipe: '{{ date | fsDateFormat: \'full-day-date\' }}',
        codeService: 'format(date, \'full-day-date\')',
        result: format(new Date(), 'full-day-date')
      },
      {
        name: 'full-date-yearless',
        codePipe: '{{ date | fsDateFormat: \'full-date-yearless\' }}',
        codeService: 'format(date, \'full-date-yearless\')',
        result: format(new Date(), 'full-date-yearless')
      },
      {
        name: 'full-date-dayless',
        codePipe: '{{ date | fsDateFormat: \'full-date-dayless\' }}',
        codeService: 'format(date, \'full-date-dayless\')',
        result: format(new Date(), 'full-date-dayless')
      },
      {
        name: 'full-date-dayless-yearless',
        codePipe: '{{ date | fsDateFormat: \'full-date-dayless-yearless\' }}',
        codeService: 'format(date, \'full-date-dayless-yearless\')',
        result: format(new Date(), 'full-date-dayless-yearless')
      },
      {
        name: 'time',
        codePipe: '{{ date | fsDateFormat: \'time\' }}',
        codeService: 'format(date, \'time\')',
        result: format(new Date(), 'time')
      },
      {
        name: 'time-24',
        codePipe: '{{ date | fsDateFormat: \'time-24\' }}',
        codeService: 'format(date, \'time-24\')',
        result: format(new Date(), 'time-24')
      },
      {
        name: 'time-tz',
        codePipe: '{{ date | fsDateFormat: \'time-tz\' }}',
        codeService: 'format(date, \'time-tz\')',
        result: format(new Date(), 'time-tz')
      },
      {
        name: 'time-gmt',
        codePipe: '{{ date | fsDateFormat: \'time-gmt\' }}',
        codeService: 'format(date, \'time-gmt\')',
        result: format(new Date(), 'time-gmt')
      },
      {
        name: 'date-time',
        codePipe: '{{ date | fsDateFormat: \'date-time\' }}',
        codeService: 'format(date, \'date-time\')',
        result: format(new Date(), 'date-time')
      },
      {
        name: 'full-date-time',
        codePipe: '{{ date | fsDateFormat: \'full-date-time\' }}',
        codeService: 'format(date, \'full-date-time\')',
        result: format(new Date(), 'full-date-time')
      }
    ];
}
