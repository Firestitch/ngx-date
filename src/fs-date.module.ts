import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsCommonModule } from '@firestitch/common';

import { FsDatePipe } from './fsdate.pipe';
import { FsDate } from './fsdate.service';
import { FsDateAgoPipe } from './fsdateago.pipe';

@NgModule({
  imports: [
    CommonModule,
    FsCommonModule
  ],
  exports: [
    FsDatePipe,
    FsDateAgoPipe
  ],
  entryComponents: [
  ],
  declarations: [
    FsDatePipe,
    FsDateAgoPipe
  ],
  providers: [
    FsDate
  ],
})
export class FsDateModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsDateModule,
      providers: [FsDate]
    };
  }
}
