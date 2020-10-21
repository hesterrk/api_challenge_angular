import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

interface ICellEditorParams {
	value: any;
}

@Component({
	selector: 'app-actioncustom',
	templateUrl: './actioncustom.component.html',
	styleUrls: ['./actioncustom.component.css'],
})

// Lifecycle of this cell renderer angular component:
// 1. new is called on this class instance
// 2. agInit() called once
// 3. refresh() called? -> may never be called, or called multiple times
export class ActioncustomComponent implements ICellRendererAngularComp {
	private params: any;

	agInit(params: ICellEditorParams): void {
		this.params = params;
	}

	refresh(params: ICellEditorParams): boolean {
		this.params = params.value;
		return true;
	}

	onClickMe(): void {
		alert('Clicked');
	}
}
