import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { FsDateModule } from '@firestitch/date';
import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AgoExampleComponent } from './components/ago-example/ago-example.component';
import { DateExampleComponent } from './components/date-example/date-example.component';
import { DurationExampleComponent } from './components/duration-example/duration-example.component';
import { FormatExampleComponent } from './components/format-example/format-example.component';
import { RangeExampleComponent } from './components/range-example/range-example.component';
import { SafeHtmlPipe } from './components/safe-html/safe-html.pipe';
import { AppMaterialModule } from './material.module';


@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot([]),
    AppMaterialModule,
    FsDateModule,
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    SafeHtmlPipe,
    FormatExampleComponent,
    AgoExampleComponent,
    DurationExampleComponent,
    RangeExampleComponent,
    DateExampleComponent,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PlaygroundModule {
}
