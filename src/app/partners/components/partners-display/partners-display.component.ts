import { Component, EventEmitter, Input, Output, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Partner } from '../../model/partner';
import { MatTableDataSource } from '@angular/material/table';
import { PartnersService } from '../../services/partners.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-partners-display',
  templateUrl: './partners-display.component.html',
  styleUrls: ['./partners-display.component.scss']
})
export class PartnersDisplayComponent implements OnInit, AfterViewInit {
  @Input() partners: Partner[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  readonly displayedColumns = ['name', 'birthDate', 'sex', 'status', 'address', 'phone', 'cpf', 'actions',];
  dataSource = new MatTableDataSource<Partner>();

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private partnersService: PartnersService) {
  }

  ngOnInit(): void {
    this.partnersService.list().subscribe({
      next: (partner: Partner[]) => {
        this.dataSource.data = partner;
      },
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(partner: Partner) {
    this.edit.emit(partner._id);
  }

  onDelete(partner: Partner) {
    this.delete.emit(partner);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
