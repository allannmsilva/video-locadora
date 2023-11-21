import { Component, EventEmitter, Input, Output, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Dependent } from '../../model/dependent';
import { MatTableDataSource } from '@angular/material/table';
import { DependentsService } from '../../services/dependents.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dependents-display',
  templateUrl: './dependents-display.component.html',
  styleUrls: ['./dependents-display.component.scss']
})
export class DependentsDisplayComponent implements OnInit, AfterViewInit {
  @Input() dependents: Dependent[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  readonly displayedColumns = ['name', 'birthDate', 'sex', 'status', 'partner', 'actions',];
  dataSource = new MatTableDataSource<Dependent>();

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private dependentsService: DependentsService) {
  }

  ngOnInit(): void {
    this.dependentsService.list().subscribe({
      next: (dependent: Dependent[]) => {
        this.dataSource.data = dependent;
      },
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(dependent: Dependent) {
    this.edit.emit(dependent._id);
  }

  onDelete(dependent: Dependent) {
    this.delete.emit(dependent);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
