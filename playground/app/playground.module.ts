// Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material
import { AppMaterialModule } from './material.module';

// FireStitch
import { FsExampleModule } from '@firestitch/example';
import { FsDateModule } from '@firestitch/date';
import { FsMessageModule } from '@firestitch/message';

import { ToastrModule } from 'ngx-toastr';

// Current module
import { AppComponent } from './app.component';
import { FormatExampleComponent } from './components/format-example/format-example.component';
import { AgoExampleComponent } from './components/ago-example/ago-example.component';
import { DurationExampleComponent } from './components/duration-example/duration-example.component';
import { RangeExampleComponent } from './components/range-example/range-example.component';
import { DateExampleComponent } from './components/date-example/date-example.component';
import { SafeHtmlPipe } from './components/safe-html/safe-html.pipe';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    AppMaterialModule,
    FsDateModule,

    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    SafeHtmlPipe,
    FormatExampleComponent,
    AgoExampleComponent,
    DurationExampleComponent,
    RangeExampleComponent,
    DateExampleComponent
  ],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaygroundModule {
}
