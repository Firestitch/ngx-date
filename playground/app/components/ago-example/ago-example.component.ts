import { ChangeDetectionStrategy, Component } from '@angular/core';


import {
  addMonths,
  addYears,
  subDays,
  subHours,
  subMinutes,
  subMonths,
  subYears,
} from 'date-fns';

@Component({
  selector: 'ago-example',
  templateUrl: './ago-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgoExampleComponent {

  public date = new Date();
  public oneYearAgo = subYears(this.date, 1);
  public oneMinuteAgo = subMinutes(this.date, 1);
  public oneHourAgo = subHours(this.date, 1);
  public oneDayAgo = subDays(this.date, 1);
  public oneMonthAgo = subMonths(this.date, 1);
  public oneMonthFuture = addMonths(this.date, 1);
  public oneYearFuture = addYears(this.date, 1);

  public signingDate = new Date('2025-02-13T19:10:28+00:00');
}
