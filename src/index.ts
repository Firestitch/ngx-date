import { FsDatePipe } from './fsdate.pipe';
import { FsDateAgoPipe } from './fsdateago.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsDate } from './fsdate.service';
import { FsMath, FsUtil } from '@firestitch/common';

export * from './fsdate.pipe';
export * from './fsdate.timezones';
export * from './fsdate.service';
export * from './fsdateago.pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule    
],
declarations: [  
  FsDatePipe,
  FsDateAgoPipe  
],
providers: [
  FsDate,
  FsMath,
  FsUtil
],
exports: [
  FsDatePipe,
  FsDateAgoPipe
]
})
export class FsDateModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsDateModule,
      providers: [FsDate]
    };
  }
}
