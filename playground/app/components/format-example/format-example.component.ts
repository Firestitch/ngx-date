import { ChangeDetectionStrategy, Component } from '@angular/core';


import { subYears } from 'date-fns';


@Component({
  selector: 'format-example',
  templateUrl: './format-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormatExampleComponent {
  
  public date = new Date();
  public twoYearsPast = subYears(new Date(), 2);
  public twoYearsFuture = subYears(new Date(), 2);

}
