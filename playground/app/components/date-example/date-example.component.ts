import { Component } from '@angular/core';
import { date } from '@firestitch/date';


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
        input: '2019-04-15',
        codeService: `date('2019-04-15')`,
        result: date('2019-04-15')
      },
      {
        input: 'new Date()',
        codeService: 'date(new Date())',
        result: date(new Date())
      },
      {
        input: 'not valid value',
        codeService: `date('not valid value')`,
        result: `${date('not valid value')}`
      }
    ]
  }

}
