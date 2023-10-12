import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Class } from '../../model/class';

@Component({
  selector: 'app-classes-display',
  templateUrl: './classes-display.component.html',
  styleUrls: ['./classes-display.component.scss']
})
export class ClassesDisplayComponent implements OnInit {

  @Input() classes: Class[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  readonly displayedColumns = ['name', 'worth', 'devolutionDate', 'actions'];

  constructor() {
  }

  ngOnInit(): void {
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(c: Class) {
    this.edit.emit(c._id);
  }

  onDelete(c: Class) {
    this.delete.emit(c);
  }

}
