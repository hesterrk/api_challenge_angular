import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ResultListComponent } from './result-list/result-list.component';

import { AgGridModule } from 'ag-grid-angular';
import { CustomisedCellComponent } from './customised-cell/customised-cell.component';
import { ActioncustomComponent } from './actioncustom/actioncustom.component';
import { HighlightDirective } from './highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResultListComponent,
    CustomisedCellComponent,
    ActioncustomComponent,
    HighlightDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([
      CustomisedCellComponent,
      ActioncustomComponent,
    ]),
  ],
  providers: [],

  bootstrap: [AppComponent],
})
export class AppModule {}
