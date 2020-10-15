import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-customised-cell',
  templateUrl: './customised-cell.component.html',
  styleUrls: ['./customised-cell.component.css'],
})

// Specific component targets the TaskCount row data cells: 10 and 2
// ICellRendererAngularComp -> ag-grid defined interface (an instance of the interface) => serves as bridge between Angualr and AG-grid
export class CustomisedCellComponent
  implements OnInit, ICellRendererAngularComp {
  cellValue: any;

  constructor() {}

  ngOnInit(): void {}

  // This method: called each time the cell is rendered
  agInit(params: any) {
    // cellValue is 10 (row data input)
    this.cellValue = params.value;
    console.log(this.cellValue, 'cell value');
    console.log(params, 'params');
  }

  //this method is called when the cell is refreshed
  // returns either true (if want cell to be refreshed) or false (cell removed from dom)
  refresh(params: any): boolean {
    this.cellValue = params.value;
    return true;
  }
}
