import { Component } from '@angular/core';
import { FsDate } from './../../../../src/fsdate.service';

@Component({
  selector: 'first-example',
  templateUrl: 'first-example.component.html',
  styleUrls: [ 'first-example.component.css' ]
})
export class FirstExampleComponent {

  examples = [];

  constructor(FsDate: FsDate) {

    this.examples = [
          {
            name: 'none',
            codeService: "FsDate.format(date)",
            codePipe: "{{ date | fsDate }}",
            result: FsDate.format(new Date())
          },
          {
            name: 'date',
            codePipe: "{{ date | fsDate:'date' }}",
            codeService: "FsDate.format(date, 'date')",
            result: FsDate.format(new Date(), 'date')
          },
          {
            name: 'full-date',
            codePipe: "{{ date | fsDate:'full-date' }}",
            codeService: "FsDate.format(date, 'full-date')",
            result: FsDate.format(new Date(), 'full-date')
          },
          {
            name: 'day-date',
            codePipe: "{{ date | fsDate:'day-date' }}",
            codeService: "FsDate.format(date, 'day-date')",
            result: FsDate.format(new Date(), 'day-date')
          },
          {
            name: 'full-day-date',
            codePipe: "{{ date | fsDate:'full-day-date' }}",
            codeService: "FsDate.format(date, 'full-day-date')",
            result: FsDate.format(new Date(), 'full-day-date')
          },
          {
            name: 'full-date-yearless',
            codePipe: "{{ date | fsDate:'full-date-yearless' }}",
            codeService: "FsDate.format(date, 'full-date-yearless')",
            result: FsDate.format(new Date(), 'full-date-yearless')
          },
          {
            name: 'full-date-dayless',
            codePipe: "{{ date | fsDate:'full-date-dayless' }}",
            codeService: "FsDate.format(date, 'full-date-dayless')",
            result: FsDate.format(new Date(), 'full-date-dayless')
          },
          {
            name: 'full-date-dayless-yearless',
            codePipe: "{{ date | fsDate:'full-date-dayless-yearless' }}",
            codeService: "FsDate.format(date, 'full-date-dayless-yearless')",
            result: FsDate.format(new Date(), 'full-date-dayless-yearless')
          },
          {
            name: 'time',
            codePipe: "{{ date | fsDate:'time' }}",
            codeService: "FsDate.format(date, 'time')",
            result: FsDate.format(new Date(), 'time')
          },
          {
            name: 'time-24',
            codePipe: "{{ date | fsDate:'time-24' }}",
            codeService: "FsDate.format(date, 'time-24')",
            result: FsDate.format(new Date(), 'time-24')
          },
          {
            name: 'time-tz',
            codePipe: "{{ date | fsDate:'time-tz' }}",
            codeService: "FsDate.format(date, 'time-tz')",
            result: FsDate.format(new Date(), 'time-tz')
          },
          {
            name: 'time-gmt',
            codePipe: "{{ date | fsDate:'time-gmt' }}",
            codeService: "FsDate.format(date, 'time-gmt')",
            result: FsDate.format(new Date(), 'time-gmt')
          },
          {
            name: 'date-time',
            codePipe: "{{ date | fsDate:'date-time' }}",
            codeService: "FsDate.format(date, 'date-time')",
            result: FsDate.format(new Date(), 'date-time')
          },
          {
            name: 'full-date-time',
            codePipe: "{{ date | fsDate:'full-date-time' }}",
            codeService: "FsDate.format(date, 'full-date-time')",
            result: FsDate.format(new Date(), 'full-date-time')
          }
        ];
  }
}
