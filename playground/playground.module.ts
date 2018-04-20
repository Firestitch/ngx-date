import './../tools/assets/playground.scss';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FsDateModule } from '../src';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app/material.module';
import { FormatExampleComponent } from './app/components/format-example/format-example.component';
import { AgoExampleComponent } from './app/components/ago-example/ago-example.component';
import { FsExampleModule } from '@firestitch/example';
import { FsIFrameModule } from '@firestitch/iframe';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsDateModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsExampleModule,
    FsIFrameModule
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    FormatExampleComponent,
    AgoExampleComponent
  ],
  providers: [
  ],
})
export class PlaygroundModule {
}
