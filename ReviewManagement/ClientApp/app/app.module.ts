import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UniversalModule } from 'angular2-universal';
import { DataTableModule } from 'angular2-datatable';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { ReviewManagerComponent } from './components/review-manager/review-manager.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ProductData } from './services/product-data';
import { CustomerReviewComponent } from './components/customerReview/customer-review.component';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CustomerComponent,
        ReviewManagerComponent,
        CustomerReviewComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        ReactiveFormsModule,
        FormsModule,
        DataTableModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'customer', pathMatch: 'full' },
            { path: 'customer', component: CustomerComponent },
            { path: 'review-manager', component: ReviewManagerComponent },
            { path: '**', redirectTo: 'customer' }
        ])
    ]
})
export class AppModule {
}
