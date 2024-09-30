import { Component } from '@angular/core';

import { iso8601, parse, parseLocal } from '@firestitch/date';


@Component({
  selector: 'date-example',
  templateUrl: './date-example.component.html',
})
export class DateExampleComponent {
  public examples: any[] = [];

  constructor() {
    this._initExamples();
  }

  private _initExamples() {
    this.examples = [
      {
        code: 'parse(\'2019-10-31T23:50:20+00:00\')',
        result: parse('2019-10-31T23:50:20+00:00').toISOString(),
      },
      {
        code: 'parse(\'14:00:00\')',
        result: parse('14:00:00').toISOString(),
      },
      {
        code: 'parse(\'INVALID\')',
        result: String(parse('INVALID')),
      },
      {
        code: 'parse(\'2022-02-01T00:00:00+00:00\')',
        result: parse('2022-02-01T00:00:00+00:00').toISOString(),
      },
      {
        code: 'parse(\'2022-02-01\')',
        result: parse('2022-02-01').toISOString(),
      },
      {
        code: 'parse(\'2022-02-01T00:00:00\')',
        result: parse('2022-02-01T00:00:00').toISOString(),
      },
      {
        code: 'parseLocal(\'2022-02-01T00:00:00\')',
        result: parseLocal('2022-02-01T00:00:00').toISOString(),
      },
      {
        code: 'parseLocal(\'2022-02-01T00:00:00+00:00\')',
        result: parseLocal('2022-02-01T00:00:00+00:00').toISOString(),
      },
      {
        code: 'parseLocal(\'2022-02-01\')',
        result: parseLocal('2022-02-01').toISOString(),
      },
      {
        code: 'parseLocal(\'22:00:00+00:00\')',
        result: parseLocal('22:00:00+00:00').toISOString(),
      },
      {
        code: 'iso8601(\'2019-10-31T23:50:20+00:00\')',
        result: iso8601(parse('2019-10-31T23:50:20+00:000')),
      },
    ];
  }

}
