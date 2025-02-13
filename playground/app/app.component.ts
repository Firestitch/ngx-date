import { ChangeDetectionStrategy, Component } from '@angular/core';

import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  public config = environment;

  public signingDate = new Date('2025-02-13T19:10:28+00:00');
}
