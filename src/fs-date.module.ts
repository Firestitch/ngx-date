import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsCommonModule } from '@firestitch/common';
import { FsDatePipe, FsDateAgoPipe, FsDateFormatPipe } from './pipes';

@NgModule({
  imports: [
    CommonModule,
    FsCommonModule
  ],
  exports: [
    FsDatePipe,
    FsDateAgoPipe,
    FsDateFormatPipe
  ],
  entryComponents: [
  ],
  declarations: [
    FsDatePipe,
    FsDateAgoPipe,
    FsDateFormatPipe
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
