import { ChangeDetectionStrategy, Component } from '@angular/core';

import { addYears } from 'date-fns';


@Component({
  selector: 'app-date-format-component-example',
  templateUrl: './date-format-component-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateFormatComponentExampleComponent {

  public date = new Date();
  public dateFuture = addYears(new Date(), 10);
}
