import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {appReducer} from "./store/app.reducer";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
