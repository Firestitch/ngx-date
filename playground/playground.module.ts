import './../tools/assets/playground.scss';

// Angular
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material
import { AppMaterialModule } from './app/material.module';

// FireStitch
import { FsExampleModule } from '@firestitch/example';
import { FsIFrameModule } from '@firestitch/iframe';

// Current module
import { AppComponent } from './app/app.component';
import { FsDateModule } from '../src';
import { FormatExampleComponent } from './app/components/format-example/format-example.component';
import { AgoExampleComponent } from './app/components/ago-example/ago-example.component';
import { DurationExampleComponent } from './app/components/duration-example/duration-example.component';
import { RangeExampleComponent } from './app/components/range-example/range-example.component';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    AppMaterialModule,

    FsExampleModule,
    FsIFrameModule,

    FsDateModule,
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,

    FormatExampleComponent,
    AgoExampleComponent,
    DurationExampleComponent,
    RangeExampleComponent
  ],
  providers: [
  ],
})
export class PlaygroundModule {
}
