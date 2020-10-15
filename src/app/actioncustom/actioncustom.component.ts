import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-actioncustom',
  templateUrl: './actioncustom.component.html',
  styleUrls: ['./actioncustom.component.css'],
})

// Lifecycle of this cell renderer angular component:
// 1. new is called on this class instance
// 2. agInit() called once
// 3. refresh() called? -> may never be called, or called multiple times
  
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
