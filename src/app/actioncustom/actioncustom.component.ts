import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-actioncustom',
  templateUrl: './actioncustom.component.html',
  styleUrls: ['./actioncustom.component.css'],
})
export class ActioncustomComponent implements OnInit, ICellRendererAngularComp {
  params: any;
  constructor() {}

  ngOnInit(): void {}

  agInit(params: any) {
    this.params = params;
  }

  refresh(params: any): boolean {
    this.params = params.value;
    return true;
  }
}
