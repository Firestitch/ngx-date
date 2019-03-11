import { Component } from '@angular/core';
import { duration } from '@firestitch/date';


@Component({
  selector: 'duration-example',
  templateUrl: 'duration-example.component.html'
})
export class DurationExampleComponent {
  public examples: any[] = [];
  public examplesWithSuffix: any[] = [];
  public examplesNameBased: any[] = [];
  public examplesWithMaxOutputs: any[] = [];

  constructor() {
    this.initExamples();
    this.initExamplesWithSuffix();
    this.initExamplesNameBased();
    this.initExamplesWithMaxOutputs();
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
        codePipe: '{{ number | fsDateDuration: {hours: true, minutes: true} }}',
        codeService: 'duration(number, {hours: true, minutes: true})',
        result: duration(6000, {hours: true, minutes: true} )
      },
      {
        input: 940800,
        codePipe: '{{ number | fsDateDuration: {days: true, hours: true} }}',
        codeService: 'duration(number, {days: true, hours: true})',
        result: duration(940800, {days: true, hours: true} )
      },
      {
        input: 18940800,
        codePipe: '{{ number | fsDateDuration: {months: true, days: true} }}',
        codeService: 'duration(number, {months: true, days: true})',
        result: duration(18940800, {months: true, days: true} )
      },
    ]
  }

  private initExamplesWithSuffix() {
    this.examplesWithSuffix = [
      {
        input: 129600,
        codePipe: '{{ number | fsDateDuration: {suffix: true, days: true, hours: true} }}',
        codeService: 'duration(number, {suffix: true, days: true, hours: true})',
        result: duration(129600, {suffix: true, days: true, hours: true})
      },
      {
        input: 172800,
        codePipe: '{{ number | fsDateDuration: {suffix: true, days: true} }}',
        codeService: 'duration(number, {suffix: true, days: true})',
        result: duration(172800, {suffix: true, days: true} )
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
        codeService: "duration(number, 'hour-minutes')",
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

  private initExamplesWithMaxOutputs() {
    this.examplesWithMaxOutputs = [
      {
        input: 6000,
        codePipe: '{{ number | fsDateDuration: {hours: true, minutes: true, seconds: true, maxOutputs: 10} }}',
        codeService: 'duration(number, {hours: true, minutes: true, seconds: true, maxOutputs: 10})',
        result: duration(6000, { hours: true, minutes: true, maxOutputs: 10 } )
      },
      {
        input: 18940800,
        codePipe: '{{ number | fsDateDuration: {months: true, days: true, hours: true, minutes: true, maxOutputs: 2} }}',
        codeService: 'duration(number, {months: true, days: true, hours: true, minutes: true, maxOutputs: 2})',
        result: duration(18940800, { months: true, days: true, hours: true, minutes: true, maxOutputs: 2 } )
      },
    ]
  }
}
