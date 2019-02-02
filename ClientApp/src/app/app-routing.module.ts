import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { ReviewManagerComponent } from './review-manager/review-manager.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'review-manager', component: ReviewManagerComponent },
  { path: '**', redirectTo: 'customer' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
