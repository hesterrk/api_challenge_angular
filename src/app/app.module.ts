import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ResultListComponent } from './result-list/result-list.component';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { CustomisedCellComponent } from './customised-cell/customised-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResultListComponent,
    CustomisedCellComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([CustomisedCellComponent]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
