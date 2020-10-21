import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

interface ICellEditorParams {
	value: any;
}

@Component({
	selector: 'app-customised-cell',
	templateUrl: './customised-cell.component.html',
	styleUrls: ['./customised-cell.component.css'],
})

// Specific component targets the TaskCount row data cells: 10 and 2
// ICellRendererAngularComp -> ag-grid defined interface (an instance of the interface) => serves as bridge between Angualar component and AG-grid
export class CustomisedCellComponent implements ICellRendererAngularComp {
	public cellValue: any;
	private params: any;

	// This method: called each time the cell is rendered
	agInit(params: ICellEditorParams): void {
		this.cellValue = params.value;
	}

	// This method is called when the cell is refreshed
	// Returns either true (if want cell to be refreshed) or false (cell removed from dom)
	refresh(params: ICellEditorParams): boolean {
		this.cellValue = params.value;
		return true;
	}
}
