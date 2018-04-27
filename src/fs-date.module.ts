import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsCommonModule } from '@firestitch/common';
import { FsDatePipe } from './pipes';
import { FsDateAgoPipe } from './pipes';
import { FsDateDurationPipe } from './pipes/fs-date-duration.pipe';

@NgModule({
  imports: [
    CommonModule,
    FsCommonModule
  ],
  exports: [
    FsDatePipe,
    FsDateAgoPipe,
    FsDateDurationPipe
  ],
  entryComponents: [
  ],
  declarations: [
    FsDatePipe,
    FsDateAgoPipe,
    FsDateDurationPipe
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
