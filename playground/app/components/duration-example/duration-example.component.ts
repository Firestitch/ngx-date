import { Component } from '@angular/core';
import { duration } from '../../../../src/functions/duration';


@Component({
  selector: 'duration-example',
  templateUrl: 'duration-example.component.html'
})
export class DurationExampleComponent {
  public examples: any[] = [];
  public examplesWithSuffix: any[] = [];
  public examplesNameBased: any[] = [];

  constructor() {
    this.initExamples();
    this.initExamplesWithSuffix();
    this.initExamplesNameBased();
  }

  private initExamples() {
    this.examples = [
      {
        input: 30,
        codePipe: '{{ number | fsDateDuration }}',
        codeService: 'duration(number)',
        result: duration(30 )
      },
      {
        input: 6000,
        codePipe: '{{ number | fsDateDuration: {minute: true, second: true} }}',
        codeService: 'duration(number, {minute: true, second: true})',
        result: duration(6000, {minute: true, second: true} )
      },
      {
        input: 940800,
        codePipe: '{{ number | fsDateDuration: {day: true, hour: true} }}',
        codeService: 'duration(number, {day: true, hour: true})',
        result: duration(940800, {day: true, hour: true} )
      },
      {
        input: 18940800,
        codePipe: '{{ number | fsDateDuration: {month: true, day: true} }}',
        codeService: 'duration(number, {month: true, day: true})',
        result: duration(18940800, {month: true, day: true} )
      },
    ]
  }

  private initExamplesWithSuffix() {
    this.examplesWithSuffix = [
      {
        input: 129600,
        codePipe: '{{ number | fsDateDuration: {suffix: true, minute: true, second: true} }}',
        codeService: 'duration(number, {suffix: true, minute: true, second: true})',
        result: duration(129600, {suffix: true, minute: true, second: true})
      },
      {
        input: 172800,
        codePipe: '{{ number | fsDateDuration: {suffix: true, day: true} }}',
        codeService: 'duration(number, {suffix: true, day: true})',
        result: duration(172800, {suffix: true, day: true} )
      }
    ]
  }

  private initExamplesNameBased() {
    this.examplesNameBased = [
      {
        input: 6000,
        codePipe: "{{ number | fsDateDuration: 'hour' }}",
        codeService: "duration(number, 'hour')",
        result: duration(6000, 'hour')
      },
      {
        input: 199200,
        codePipe: "{{ number | fsDateDuration: 'hour-minute' }}",
        codeService: "duration(number, 'hour-minute')",
        result: duration(199200, 'hour-minute' )
      },
      {
        input: 20065920,
        codePipe: "{{ number | fsDateDuration: 'month' }}",
        codeService: "duration(number, 'month')",
        result: duration(20065920, 'month' )
      },
      {
        input: 194013300,
        codePipe: "{{ number | fsDateDuration: 'year-day-hour-minute' }}",
        codeService: "duration(number, 'year-day-hour-minute')",
        result: duration(194013300, 'year-day-hour-minute' )
      }
    ]
  }
}
