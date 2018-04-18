import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsCommonModule } from '@firestitch/common';
import { FsDatePipe } from './pipes';
import { FsDateAgoPipe } from './pipes';

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
  ],
})
export class FsDateModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsDateModule
    };
  }
}
