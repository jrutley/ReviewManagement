import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { ReviewManagerComponent } from './components/review-manager/review-manager.component';
import { CustomerComponent } from './components/customer/customer.component';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CustomerComponent,
        ReviewManagerComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
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
