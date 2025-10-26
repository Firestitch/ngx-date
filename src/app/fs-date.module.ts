import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { MatTooltipModule } from '@angular/material/tooltip';

import { FsCommonModule } from '@firestitch/common';

import { FsDateAgoComponent, FsDateComponent, FsDateRangeComponent } from './components';
import { FsDateAgoDirective } from './directives/fs-date-ago.directive';
import { FsDateAgoPipe } from './pipes/date-ago.pipe';
import { FsDateDurationPipe } from './pipes/date-duration.pipe';
import { FsDateFormatPipe } from './pipes/date-format.pipe';
import { FsDateRangePipe } from './pipes/date-range.pipe';
import { FsDatePipe } from './pipes/date.pipe';
import { FsDateAgoFactory } from './services/date-ago-factory.service';


@NgModule({
    imports: [
        CommonModule,
        MatTooltipModule,
        FsCommonModule,
        FsDatePipe,
        FsDateAgoPipe,
        FsDateDurationPipe,
        FsDateFormatPipe,
        FsDateRangePipe,
        FsDateAgoDirective,
        FsDateAgoComponent,
        FsDateComponent,
        FsDateRangeComponent,
    ],
    exports: [
        FsDatePipe,
        FsDateAgoPipe,
        FsDateDurationPipe,
        FsDateFormatPipe,
        FsDateRangePipe,
        FsDateAgoDirective,
        FsDateComponent,
        FsDateAgoComponent,
        FsDateRangeComponent,
    ],
})
export class FsDateModule {
  public static forRoot(): ModuleWithProviders<FsDateModule> {
    return {
      ngModule: FsDateModule,
      providers: [
        FsDateAgoFactory,
      ],
    };
  }
}
