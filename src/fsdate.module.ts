import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FsDate } from './fsdate.service';
import { FsDatePipe } from './fsdate.pipe';
import { FsDateAgoPipe } from './fsdateago.pipe';

@NgModule({
    declarations: [
        FsDatePipe,
        FsDateAgoPipe
    ],
    providers: [
        FsDate
    ],
    exports: [
      FsDatePipe,
      FsDateAgoPipe
    ]
})
export class FsDateModule {

}
