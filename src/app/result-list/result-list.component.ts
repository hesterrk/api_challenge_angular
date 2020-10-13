import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css'],
})
export class ResultListComponent implements OnInit {
  defaultColDef = {
    sortable: true,
    filter: true,
  };
  columnDefs = [
    { field: 'SiteName' },
    { field: 'ProjectName' },
    { field: 'DocumentName' },
  ];

  rowData = [
    { SiteName: 'site1', ProjectName: 'proj1', DocumentName: 'doc1' },
    { SiteName: 'site2', ProjectName: 'proj2', DocumentName: 'doc2' },
    { SiteName: 'site3', ProjectName: 'proj3', DocumentName: 'doc3' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
