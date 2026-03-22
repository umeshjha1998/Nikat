import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface ShopData {
  id: string;
  name: string;
  status: string;
  ownerId: string;
}

const MOCK_SHOPS: ShopData[] = [
  {id: '1', name: 'The Golden Crust', status: 'ACTIVE', ownerId: '2'},
  {id: '2', name: 'Local Grocery', status: 'PENDING_VERIFICATION', ownerId: '3'},
];

@Component({
  selector: 'app-manage-shops',
  templateUrl: './manage-shops.component.html',
  styleUrls: ['./manage-shops.component.scss']
})
export class ManageShopsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'status', 'owner', 'actions'];
  dataSource: MatTableDataSource<ShopData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.dataSource = new MatTableDataSource(MOCK_SHOPS);
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
