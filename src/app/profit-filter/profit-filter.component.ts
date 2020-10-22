import { Component, ViewChild, AfterViewInit } from '@angular/core';

interface IDoesFilterPassParams {
	node: any;
	data: any;
}

@Component({
	selector: 'app-profit-filter',
	templateUrl: './profit-filter.component.html',
	styleUrls: ['./profit-filter.component.css']
})
  
// AfterViewInit -> called after Angular has fully initialized a component's view
export class ProfitFilterComponent implements AfterViewInit {
	// If the view DOM changes, and a new child matches the selector, the property is updated
	// range local variable holds value of input 
	@ViewChild('range') textInput;

	// Holds the state for whatever will get displayed
	public filter = ''
	private params: any
  
	public agInit(params: any): void {
		this.params = params;
	}
  
	// focus() method: instantly focus and select any text in the element as soon as it's displayed
	public ngAfterViewInit(): void {
		setTimeout(() => {
			this.textInput.nativeElement.focus();
		});
	}
  
	// Checks whether the filter has any filtering condition to use in the first place 
	public isFilterActive(): boolean {
		return this.filter !== '';
	}
  
	// Function that does the filter check based on ranges provided
	// Gets called by ag-grid -> determines whether a value passes the current filtering condition

	public doesFilterPass(params: IDoesFilterPassParams): boolean {
		// Split the string input based on between sign '-'
		const filter = this.filter.split('-');
		const greaterThan = Number(filter[0]);
		const lowerThan = Number(filter[1]);
    
		const cellValue = this.params.valueGetter(params.node);
		return cellValue >= greaterThan && cellValue <= lowerThan;

	}
  
	// Ag-grid calls both getModel and setModel to provide the current filtering condition for a component or to obtain it from the component
	public getModel(): Object {
		return {
			filter: this.filter
		};
	}

	// Restores the filter state
	// ag-grid will pass undefined/null to clear the filter
	public setModel(model: any): void {
		this.filter = model ? model.filter : '';
	}
  
	public onSubmit(event: any): void {
		event.preventDefault();

		const userInput = event.target.elements.filter.value;
		// console.log(userInput);

		if (this.filter !== userInput) {
			this.filter = userInput;

			// Let ag-grid know about the update in state too -> gets called wheneever the filter changes
			// ag-grid responds by filtering the grid
			// Method called filterChangedCallback() -> provided via agInit
			
			this.params.filterChangedCallback();
		}

	}

}

