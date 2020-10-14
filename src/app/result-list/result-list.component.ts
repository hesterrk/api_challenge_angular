import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { PortfolioService } from '../portfolio.service';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css'],
})
export class ResultListComponent implements OnInit {
  @ViewChild('agGrid')
  agGrid: AgGridAngular;

  portfolio: any;
  task: number;

  defaultColDef = {
    sortable: true,
    filter: true,
  };

  siteSearchResult: string;
  projectSearchResult: string;
  documentSearchResult: string;

  // Cell customisation is done a the column level via the column definition
  // TODO => custom cell renderers, cel icon or colour change

  columnDefs = [
    { field: 'SiteName' },
    { field: 'ProjectName' },
    { field: 'DocumentName' },
    {
      field: 'TaskCount',
    },
  ];

  rowData = [
    {
      SiteName: 'site1',
      ProjectName: 'proj1',
      DocumentName: 'doc1',
      TaskCount: 10,
    },
  ];

  constructor(
    private portfolioService: PortfolioService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
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

  searchPortfolio(term: string): void {
    this.portfolioService.getPortfolio().subscribe((res) => {
      this.siteSearchResult = res.Result.sites.filter((site) =>
        site.name.includes(term)
      );

      this.projectSearchResult = res.Result.sites[0].projects.filter(
        (project) => project.name.includes(term)
      );

      this.documentSearchResult = res.Result.sites[0].projects[0].documents.filter(
        (document) => document.name.includes(term)
      );
    });
  }
}
