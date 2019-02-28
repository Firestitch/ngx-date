import { Component } from '@angular/core';


import {
  addMonths,
  addYears,
  subDays,
  subHours,
  subMinutes,
  subMonths,
  subYears
} from 'date-fns';

@Component({
  selector: 'ago-example',
  templateUrl: 'ago-example.component.html'
})
export class AgoExampleComponent {

  date = new Date();
  oneYearAgo = subYears(this.date, 1);
  oneMinuteAgo = subMinutes(this.date, 1);
  oneHourAgo = subHours(this.date, 1);
  oneDayAgo = subDays(this.date, 1);
  oneMonthAgo = subMonths(this.date, 1);
  oneMonthFuture = addMonths(this.date, 1);
  oneYearFuture = addYears(this.date, 1);


}
