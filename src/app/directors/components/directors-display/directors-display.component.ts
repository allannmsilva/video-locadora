import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Director } from '../../model/director';

@Component({
  selector: 'app-directors-display',
  templateUrl: './directors-display.component.html',
  styleUrls: ['./directors-display.component.scss']
})
export class DirectorsDisplayComponent implements OnInit {

  @Input() directors: Director[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  readonly displayedColumns = ['name', 'actions'];

  constructor() {
  }

  ngOnInit(): void {
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(director: Director) {
    this.edit.emit(director._id);
  }

  onDelete(director: Director) {
    this.delete.emit(director);
  }

}
