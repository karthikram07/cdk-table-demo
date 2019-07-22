import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DemoMaterialModule } from "../material-module";
import { PeriodicTable } from "./periodic-table/periodic-table.component";
import { CdkDetailRowDirective } from "../app/periodic-table/cdk-detail-row.directive";

@NgModule({
  declarations: [AppComponent, PeriodicTable, CdkDetailRowDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemoMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
