import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Actor } from '../../model/actor';

@Component({
  selector: 'app-actors-display',
templateUrl: './actors-display.component.html',
  styleUrls: ['./actors-display.component.scss']
})
export class ActorsDisplayComponent implements OnInit {

  @Input() actors: Actor[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);

  readonly displayedColumns = ['name', 'actions'];

  constructor() {
  }

  ngOnInit(): void {
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(actor: Actor) {
    this.edit.emit(actor._id);
  }

}
