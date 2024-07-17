import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app.routes';
import { RouterModule } from '@angular/router';
import { SurgeonListComponent } from './surgeon-list/surgeon-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SurgeonListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }