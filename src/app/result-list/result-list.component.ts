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

interface ValueFormatterParams {
  value: any;
  data: any;
}

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css'],
})
export class ResultListComponent implements OnInit {
  @ViewChild('agGrid')
  public agGrid: AgGridAngular;
  private gridApi: any;
  private gridColumnApi: any;
  public color = '#a8c0ff';

  public portfolio: any;
  public task: any;
  public portfolioProjects: any;
  public portfolioDocuments1: any;
  public portfolioDocuments2: any;
  public columnDefs: Array<Object>;
  public rowSelection: any;


  public defaultColDef = {
    sortable: true,
    filter: true,
    editable: true,
  };


  public siteSearchResult: string;
  public projectSearchResult: string;
  public documentSearchResult: string;
  public documentForTaskSearchResult: Array<string>;

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
        valueFormatter: (params: ValueFormatterParams) => {
          const firstLetter = params.value.slice(0, 1).toUpperCase();
          const restOfLetters = params.value.slice(1);
          return firstLetter + restOfLetters;
        },
      },
      {
        field: 'ProjectName',
        valueFormatter: (params: ValueFormatterParams) => params.value + ' #',
      },
      {
        field: 'DocumentName',
        valueFormatter: (params: ValueFormatterParams) => params.value.toUpperCase(),
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
        valueFormatter: (params: ValueFormatterParams) => {
          const number = Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
          return '£' + number;
        },
      },
      {
        field: 'DateCreated',
        valueFormatter: (params: ValueFormatterParams) => moment(params.value).format('MM/DD/YYYY'),
      },
      {
        field: 'Revenue',
        valueFormatter: (params: ValueFormatterParams) => {
          const number = Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
          return '£' + number;
        },
      },
      {
        field: 'Profit',
        valueGetter: (params) => params.data.Revenue - params.data.Cost,
        valueFormatter: (params: ValueFormatterParams) => {
          const number = Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
          return '£' + number;
        },
      },
    ];

    this.rowSelection = 'multiple';

    this.getPortfolio();
    this.getTask();
  }

  public excludeExtraCols(): void {
    this.gridApi.setColumnDefs(this.columnDefs.slice(0, 2));
  }
  public includeExtraCols(): void {
    this.gridApi.setColumnDefs(this.columnDefs);
  }

  public addBlankRow(): void {
    this.gridApi.applyTransaction({
      add: [
        {
          SiteName: '',
          ProjectName: '',
          DocumentName: '',
          TaskCount: '',
          Actions: '',
          Cost: '',
          DateCreated: '',
          Revenue: '',
          Profit: '',
        },
      ],
    });
  }

  public onDeleteRow(): void {
    const selectedRowData = this.gridApi.getSelectedRows();
    // console.log(selectedRowData);
    this.gridApi.applyTransaction({
      remove: selectedRowData,
    });
  }

  public onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  private getPortfolio(): void {
    this.portfolioService.getPortfolio().subscribe((res) => {
      this.portfolio = res.Result;
      this.portfolioProjects = this.portfolio.sites.map((site) => {
        return site.projects.map((proj) => {
          return proj.name;
        });
      });
      const documentsForSites = this.portfolio.sites.map((site) => {
        return site.projects.map((proj) => {
          return proj.documents.map((doc) => doc);
        });
      });

      this.portfolioDocuments1 = documentsForSites[0].map((doc) => {
        return doc.map((d) => d);
      });
      this.portfolioDocuments2 = documentsForSites[1].map((doc) => {
        return doc.map((d) => d);
      });
    });
  }

  private getTask(): void {
    this.taskService.getTask().subscribe((res) => (this.task = res.Result));
  }

  public searchPortfolio(term: string): void {
    this.siteSearchResult = this.portfolio.sites.filter((site) =>
      site.name.toLowerCase().includes(term.toLowerCase())
    );

    this.projectSearchResult = this.portfolioProjects.filter((project) => {
      return project[0].toLowerCase().includes(term.toLowerCase());
    });

    const allDocuments = this.portfolio.sites.map((site) => {
      return site.projects.map((proj) => {
        return proj.documents.map((doc) => doc);
      });
    });
    // Join both document arrays from each site
    const joinDocumentArrays = allDocuments[0][0].concat(allDocuments[1][0]);

    this.documentSearchResult = joinDocumentArrays.filter((document) =>
      document.name.toLowerCase().includes(term.toLowerCase())
    );

    const documentNameAndId = this.portfolio.sites[1].projects[0].documents.map(
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
        if (doc.id === documentId) {
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
