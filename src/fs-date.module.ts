import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsCommonModule } from '@firestitch/common';
import {
  FsDatePipe,
  FsDateAgoPipe,
  FsDateDurationPipe,
  FsDateFormatPipe,
  FsDateRangePipe
} from './pipes';

@NgModule({
  imports: [
    CommonModule,
    FsCommonModule
  ],
  exports: [
    FsDatePipe,
    FsDateAgoPipe,
    FsDateDurationPipe,
    FsDateFormatPipe,
    FsDateRangePipe
  ],
  entryComponents: [
  ],
  declarations: [
    FsDatePipe,
    FsDateAgoPipe,
    FsDateDurationPipe,
    FsDateFormatPipe,
    FsDateRangePipe
  ],
  providers: [
  ],
})
export class FsDateModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsDateModule
    };
  }
}
