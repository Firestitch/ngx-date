import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsCommonModule } from '@firestitch/common';

import { FsDatePipe } from './pipes/date.pipe';
import { FsDateRangePipe } from './pipes/date-range.pipe';
import { FsDateFormatPipe } from './pipes/date-format.pipe';
import { FsDateDurationPipe } from './pipes/date-duration.pipe';
import { FsDateAgoPipe } from './pipes/date-ago.pipe';

import { FsDateAgoDirective } from './directives/fs-date-ago.directive';

import { FsDateAgoComponent } from './components/date-ago/date-ago.component';

import { FsDateAgoFactory } from './services/date-ago-factory.service';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  imports: [
    CommonModule,

    MatTooltipModule,

    FsCommonModule,
  ],
  exports: [
    FsDatePipe,
    FsDateAgoPipe,
    FsDateDurationPipe,
    FsDateFormatPipe,
    FsDateRangePipe,
    FsDateAgoDirective,
    FsDateAgoComponent
  ],
  entryComponents: [
    FsDateAgoComponent
  ],
  declarations: [
    FsDatePipe,
    FsDateAgoPipe,
    FsDateDurationPipe,
    FsDateFormatPipe,
    FsDateRangePipe,

    FsDateAgoDirective,

    FsDateAgoComponent
  ],
  providers: [],
})
export class FsDateModule {
  static forRoot(): ModuleWithProviders<FsDateModule> {
    return {
      ngModule: FsDateModule,
      providers: [
        FsDateAgoFactory
      ]
    };
  }
}
