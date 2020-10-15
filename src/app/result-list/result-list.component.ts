import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { PortfolioService } from '../portfolio.service';
import { TaskService } from '../task.service';
import { CustomisedCellComponent } from '../customised-cell/customised-cell.component';
import { ActioncustomComponent } from '../actioncustom/actioncustom.component';
import * as _ from 'underscore';

@Component({
	selector: 'app-result-list',
	templateUrl: './result-list.component.html',
	styleUrls: ['./result-list.component.css'],
})
export class ResultListComponent implements OnInit {
	@ViewChild('agGrid')
	public agGrid: AgGridAngular;

	public portfolio: any;
	public task: number;
	public columnDefs;

	public defaultColDef = {
		sortable: true,
		filter: true,
	};

	public siteSearchResult: string;
	public projectSearchResult: string;
	public documentSearchResult: string;

	// Cell customisation is done a the column level via the column definition
	// TODO => custom cell renderers, cel icon or colour change

	public rowData = [
		{
			SiteName: 'site1',
			ProjectName: 'proj1',
			DocumentName: 'doc1',
			TaskCount: 10,
		},
		{
			SiteName: 'site2',
			ProjectName: 'proj2',
			DocumentName: 'doc2',
			TaskCount: 2,
		},
	];

	constructor(
		private portfolioService: PortfolioService,
		private taskService: TaskService,

	) {
		this.searchPortfolio = _.debounce(this.searchPortfolio, 1000);
	}

	// cellRenderer: customises the contents inside cell -> do this via just plain JS component or a framework component (using Angular)
	// cellRendererFramework: customises contents inside cell -> refering to an Angular (framework) component that we are making custom
	// Default cellRender is just text we inject into that row, so using cellRenderer or cellRendererFramework allows us to custom the contents inside a particular cell

	ngOnInit(): void {
		this.columnDefs = [
			{ field: 'SiteName' },
			{ field: 'ProjectName' },
			{ field: 'DocumentName' },
			{
				field: 'TaskCount',
				cellRendererFramework: CustomisedCellComponent,
			},
			{
				field: 'Actions',
				cellRendererFramework: ActioncustomComponent,
			},
		];

		this.getPortfolio();
		this.getTask();
	}

	private getPortfolio(): void {
		this.portfolioService.getPortfolio().subscribe((res) => {
			this.portfolio = res.Result;
		});
	}

	private getTask(): void {
		this.taskService
			.getTask()
			.subscribe((res) => (this.task = res.Result.tasks.length));
	}

	public searchPortfolio(term: string): void {
		this.siteSearchResult = this.portfolio.sites.filter((site) =>
			site.name.includes(term)
		);

		this.projectSearchResult = this.portfolio.sites[0].projects.filter(
			(project) => project.name.includes(term)
		);

		this.documentSearchResult = this.portfolio.sites[0].projects[0].documents.filter(
			(document) => document.name.includes(term)
		);
	}

}
