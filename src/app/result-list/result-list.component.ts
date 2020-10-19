/* eslint-disable indent */
/* eslint-disable @typescript-eslint/indent */
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { PortfolioService } from '../portfolio.service';
import { TaskService } from '../task.service';
import { CustomisedCellComponent } from '../customised-cell/customised-cell.component';
import { ActioncustomComponent } from '../actioncustom/actioncustom.component';
import * as _ from 'underscore';
import * as moment from 'moment';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css'],
})
export class ResultListComponent implements OnInit {
  @ViewChild('agGrid')
  public agGrid: AgGridAngular;

  public portfolio: any;
  public task: any;
  public columnDefs;

  public defaultColDef = {
    sortable: true,
    filter: true,
  };

  public siteSearchResult: string;
  public projectSearchResult: string;
  public documentSearchResult: string;

  public documentForTaskSearchResult: any;

  public rowData = [
    {
      SiteName: 'site1',
      ProjectName: 'proj1',
      DocumentName: 'doc1',
      TaskCount: 9.55675,
      Cost: 5056,
      Revenue: 10000,
      DateCreated: '2020-07-25',
    },
    {
      SiteName: 'site2',
      ProjectName: 'proj2',
      DocumentName: 'doc2',
      TaskCount: 2.13455,
      Cost: 2000,
      Revenue: 15000,
      Profit: null,
      DateCreated: '2020-12-25',
    },
  ];

  public taskForDocument: any;
  public showTaskSubject: any;

  constructor(
    private portfolioService: PortfolioService,
    private taskService: TaskService
  ) {
    this.searchPortfolio = _.debounce(this.searchPortfolio, 1000);
    this.getTasksForDoc;
  }

  // cellRenderer: customises the contents inside cell -> do this via just plain JS component or a framework component (using Angular)
  // cellRendererFramework: customises contents inside cell -> refering to an Angular (framework) component that we are making custom
  // Default cellRender is just text we inject into that row, so using cellRenderer or cellRendererFramework allows us to custom the contents inside a particular cell
  // valueFormatter: format values to display
  ngOnInit(): void {
    this.columnDefs = [
      {
        field: 'SiteName',
        // Slicing first character making uppercase + the rest of string
        valueFormatter: ({ value }) =>
          value.slice(0, 1).toUpperCase() + value.slice(1),
      },
      {
        field: 'ProjectName',
        valueFormatter: ({ value }) => value + ' #',
      },
      {
        field: 'DocumentName',
        valueFormatter: ({ value }) => value.toUpperCase(),
      },
      {
        field: 'TaskCount',
        cellRendererFramework: CustomisedCellComponent,
      },
      {
        field: 'Actions',
        cellRendererFramework: ActioncustomComponent,
      },

      {
        field: 'Cost',
        valueFormatter: ({ value }) =>
          '£' +
          Math.floor(value)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      },
      {
        field: 'DateCreated',
        valueFormatter: ({ value }) => moment(value).format('MM/DD/YYYY'),
      },
      {
        field: 'Revenue',
        valueFormatter: ({ value }) =>
          '£' +
          Math.floor(value)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      },
      {
        field: 'Profit',
        valueGetter: ({ data }) => data.Revenue - data.Cost,
        valueFormatter: ({ value }) =>
          '£' +
          Math.floor(value)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
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
    this.taskService.getTask().subscribe((res) => (this.task = res.Result));
  }

  public searchPortfolio(term: string): void {
    this.siteSearchResult = this.portfolio.sites.filter((site) =>
      site.name.toLowerCase().includes(term.toLowerCase())
    );

    this.projectSearchResult = this.portfolio.sites[0].projects.filter(
      (project) => project.name.toLowerCase().includes(term.toLowerCase())
    );

    this.documentSearchResult = this.portfolio.sites[0].projects[0].documents.filter(
      (document) => document.name.toLowerCase().includes(term.toLowerCase())
    );

    const documentNameAndId = this.portfolio.sites[0].projects[0].documents.map(
      ({ id, name }) => {
        return { id, name };
      }
    );

    // Get documentId and subject properties out of task data 
    const taskSubjectId = this.task.tasks.map(({ documentId, subject }) => {
      return { documentId, subject };
    });

    // Search for tasks
    const searchTask = taskSubjectId.filter((task) => {
      return task.subject.toLowerCase().includes(term.toLowerCase());
    });

    const showDocName = searchTask.map(({ documentId }) => {
      return documentNameAndId.map((doc) => {
        if (doc.id == documentId) {
          return doc.name;
        }
      });
    });

    this.documentForTaskSearchResult = showDocName.map((doc) =>
      doc.filter((d) => {
        return d !== undefined;
      })
    );
  }

  // Show task for each document
  public getTasksForDoc(documentId: string): void {
    const taskData = this.task.tasks.map((t) => t);
    this.taskForDocument = taskData.filter((task) => {
      return task.documentId === documentId;
    });
    this.showTaskSubject = this.taskForDocument.map((t) => {
      return t.subject;
    });
  }
}
