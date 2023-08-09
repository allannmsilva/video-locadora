import { Component, Input, OnInit } from '@angular/core';

import { Movie } from '../model/movie';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movies-display',
  templateUrl: './movies-display.component.html',
  styleUrls: ['./movies-display.component.scss']
})
export class MoviesDisplayComponent implements OnInit {

  @Input() movies: Movie[] = [];

  readonly displayedColumns = ['title', 'genre', 'actions'];

  constructor(private router: Router,
    private route: ActivatedRoute) {

  };

  ngOnInit(): void {
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
