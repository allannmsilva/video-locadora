import { Component, Input, OnInit } from '@angular/core';

import { Actor } from '../model/actor';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actors-display',
  templateUrl: './actors-display.component.html',
  styleUrls: ['./actors-display.component.scss']
})
export class ActorsDisplayComponent implements OnInit {

  @Input() actors: Actor[] = [];

  readonly displayedColumns = ['name', 'actions'];

  constructor(private router: Router,
    private route: ActivatedRoute) {

  };

  ngOnInit(): void {
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
