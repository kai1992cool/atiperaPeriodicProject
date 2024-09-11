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
    MatDialogModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit{
  
  @ViewChild(MatSort) sort!: MatSort;
  private searchSubject = new Subject<string>();

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','actions'];

  dataSource = new MatTableDataSource([
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ]);
  
  constructor(public dialog: MatDialog) {}

  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;

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
