import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Item } from '../../model/item';

@Component({
  selector: 'app-items-display',
  templateUrl: './items-display.component.html',
  styleUrls: ['./items-display.component.scss']
})
export class ItemsDisplayComponent implements OnInit {

  @Input() items: Item[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  readonly displayedColumns = ['movie', 'serialNumber', 'type', 'acquisitionDate', 'actions'];

  constructor() {
  }

  ngOnInit(): void {
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(item: Item) {
    this.edit.emit(item._id);
  }

  onDelete(item: Item) {
    this.delete.emit(item);
  }

}
