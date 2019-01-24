import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CustomerComponent } from './customer/customer.component';
import { CustomerReviewComponent } from './customerReview/customer-review.component';
import { ReviewManagerComponent } from './review-manager/review-manager.component';
import { NavMenuComponent } from './navmenu/navmenu.component';

import { MatTableModule } from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CustomerComponent,
    CustomerReviewComponent,
    ReviewManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
