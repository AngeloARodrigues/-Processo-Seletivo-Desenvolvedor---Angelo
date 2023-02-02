import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasemapComponent } from './basemap/basemap.component';
import { FormsModule } from '@angular/forms';
import { FarmComponent } from './farm/farm.component';
import { FormComponent } from './form/form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './details/details.component';
import {FarmService}  from './services/farm.service';
import { EditComponent } from './edit/edit.component'

@NgModule({
  declarations: [
    AppComponent,
    BasemapComponent,
    FarmComponent,
    FormComponent,
    DashboardComponent,
    DetailsComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [FarmService],
  bootstrap: [AppComponent]
})
export class AppModule { }
