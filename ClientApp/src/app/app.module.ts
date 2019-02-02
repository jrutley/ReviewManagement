import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CustomerComponent } from './customer/customer.component';
import { CustomerReviewComponent } from './customerReview/customer-review.component';
import { ReviewManagerComponent } from './review-manager/review-manager.component';
import { NavMenuComponent } from './navmenu/navmenu.component';

import { MatTableModule, MatSidenavModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CustomerComponent,
    CustomerReviewComponent,
    ReviewManagerComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
