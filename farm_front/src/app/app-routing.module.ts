import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FarmComponent } from './farm/farm.component'
import { FormComponent } from './form/form.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { DetailsComponent } from './details/details.component'
import {EditComponent} from './edit/edit.component'


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'farm', component: FarmComponent},
  { path: 'form', component: FormComponent}, 
  { path: 'details/:id', component: DetailsComponent},
  { path: 'edit/:id', component: EditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
