import { ChangeDetectionStrategy, Component } from '@angular/core';

import { environment } from '../environments/environment';
import { FsExampleModule } from '@firestitch/example';
import { FormatExampleComponent } from './components/format-example/format-example.component';
import { AgoExampleComponent } from './components/ago-example/ago-example.component';
import { DurationExampleComponent } from './components/duration-example/duration-example.component';
import { RangeExampleComponent } from './components/range-example/range-example.component';
import { DateExampleComponent } from './components/date-example/date-example.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsExampleModule,
        FormatExampleComponent,
        AgoExampleComponent,
        DurationExampleComponent,
        RangeExampleComponent,
        DateExampleComponent,
    ],
})
export class AppComponent {

  public config = environment;

  public signingDate = new Date('2025-02-13T19:10:28+00:00');
}
