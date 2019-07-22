import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from '../material-module';
import { PeriodicTable } from './periodic-table/periodic-table.component';

@NgModule({
    declarations: [AppComponent, PeriodicTable],
    imports: [BrowserModule, AppRoutingModule, DemoMaterialModule, BrowserAnimationsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
