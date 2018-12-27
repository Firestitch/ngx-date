import { NgModule, ModuleWithProviders } from '@angular/core';
import { MatTooltipModule } from '@angular/material';
import { CommonModule } from '@angular/common';

import { FsCommonModule } from '@firestitch/common';
import {
  FsDatePipe,
  FsDateAgoPipe,
  FsDateDurationPipe,
  FsDateFormatPipe,
  FsDateRangePipe
} from './pipes';

import { FsDateAgoDirective } from './directives/fs-date-ago.directive';

import { FsDateAgoComponent } from './components/fs-date-ago/fs-date-ago.component';

import { FsDateAgoFactory } from './services/fs-date-ago-factory.service';


@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    FsCommonModule
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
  providers: [
    FsDateAgoFactory
  ],
})
export class FsDateModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsDateModule
    };
  }
}
