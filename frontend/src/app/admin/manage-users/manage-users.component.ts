import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// Mock data structure matching entity roughly
export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const MOCK_USERS: UserData[] = [
  {id: '1', firstName: 'John', lastName: 'Doe', email: 'john@test.com', role: 'USER'},
  {id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@test.com', role: 'SHOP_OWNER'},
];

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(MOCK_USERS);
  }

  ngOnInit() {
      // In real scenario, fetch users from service
  }

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
