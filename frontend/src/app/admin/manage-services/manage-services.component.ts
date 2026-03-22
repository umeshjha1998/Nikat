import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface ServiceData {
  id: string;
  name: string;
  serviceType: string;
  status: string;
  ownerId: string;
}

const MOCK_SERVICES: ServiceData[] = [
  {id: '1', name: 'Raju Electrician', serviceType: 'Electrician', status: 'ACTIVE', ownerId: '4'},
  {id: '2', name: 'Quick Plumber', serviceType: 'Plumber', status: 'PENDING_VERIFICATION', ownerId: '5'},
];

@Component({
  selector: 'app-manage-services',
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.scss']
})
export class ManageServicesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'type', 'status', 'owner', 'actions'];
  dataSource: MatTableDataSource<ServiceData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.dataSource = new MatTableDataSource(MOCK_SERVICES);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
