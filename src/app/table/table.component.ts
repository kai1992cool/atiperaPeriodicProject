import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounceTime, Subject } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FromPopupComponent } from '../from-popup/from-popup.component';
import { FetchTableDataService } from '../shared/services/fetch-table-data.service';
import { PeriodicElement } from '../shared/interfaces/periodic-element';



@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule, 
    MatSortModule, 
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit{
  
  @ViewChild(MatSort) sort!: MatSort;
  private searchSubject = new Subject<string>();

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','actions'];

  dataSource = new MatTableDataSource<PeriodicElement>();
  
  constructor(
    public dialog: MatDialog,
    private fetchTableDataService: FetchTableDataService
  ) {}

  ngOnInit() {
    setTimeout(() => { 
      console.log('aaaaaaa')
      this.fetchTableDataService.getTableElements().subscribe({
        next: (data) => {
          this.dataSource.data = [...data]; 
          this.dataSource.sort = this.sort;
        }
      });
    },2000)
  }

  ngAfterViewInit(): void {

    this.searchSubject.pipe(
      debounceTime(2000) 
    ).subscribe(filterValue => {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    });

  }

  openEditDialog(element: any): void {
    const dialogRef = this.dialog.open(FromPopupComponent, {
      data: { ...element } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateRowData(result);
      }
    });
  }

  updateRowData(updatedRow: any): void {
    const index = this.dataSource.data.findIndex(row => row.position === updatedRow.position);
    if (index !== -1) {
      const updatedData = [...this.dataSource.data];
      updatedData[index] = updatedRow;
      this.dataSource.data = updatedData;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchSubject.next(filterValue);
  }

}
