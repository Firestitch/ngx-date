import { ChangeDetectionStrategy, Component } from '@angular/core';


import { subYears } from 'date-fns';
import { parse } from 'src/libs';


@Component({
  selector: 'format-example',
  templateUrl: './format-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormatExampleComponent {
  
  public date = new Date();
  public twoYearsPast = subYears(new Date(), 2);
  public twoYearsFuture = subYears(new Date(), 2);
  public utcDate = parse('2024-04-07T00:00:00');

}
