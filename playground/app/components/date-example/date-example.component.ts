import { Component } from '@angular/core';
import { date, parse, parseLocal, iso8601 } from '@firestitch/date';


@Component({
  selector: 'date-example',
  templateUrl: './date-example.component.html'
})
export class DateExampleComponent {
  public examples: any[] = [];

  constructor() {
    this.initExamples();
  }

  private initExamples() {
    this.examples = [
      {
        code: `parse('2019-10-31T23:50:20+00:00')`,
        result: parse('2019-10-31T23:50:20+00:00')
      },
      {
        code: `parse('14:00:00')`,
        result: parse('14:00:00')
      },
      {
        code: `parse('INVALID')`,
        result: String(parse('INVALID'))
      },
      {
        code: `parseLocal('2019-10-31T00:00:00+00:00')`,
        result: parseLocal('2019-10-31T00:00:00+00:00')
      },
      {
        code: `parseLocal('22:00:00+00:00')`,
        result: parseLocal('22:00:00+00:00')
      },
      {
        code: `iso8601('2019-10-31T23:50:20+00:00')`,
        result: iso8601(parse('2019-10-31T23:50:20+00:000'))
      }
    ]
  }

}
