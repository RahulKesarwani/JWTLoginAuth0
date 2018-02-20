import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { routing, routingComponents } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {AuthenticationService} from './services/authenicationService';
import {HttpClientModule} from '@angular/common/http';
import {AuthGard} from './gard_service/auth.gard';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule,
  ],
  providers: [AuthenticationService, AuthGard],
  bootstrap: [AppComponent]
})
export class AppModule { }
