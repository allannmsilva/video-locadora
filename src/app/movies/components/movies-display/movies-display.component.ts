import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../model/movie';

@Component({
  selector: 'app-movies-display',
  templateUrl: './movies-display.component.html',
  styleUrls: ['./movies-display.component.scss']
})
export class MoviesDisplayComponent {
  @Input() movies: Movie[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  readonly displayedColumns = ['name', 'year', 'synopsis', 'category', 'director', 'c', 'actions'];

  constructor() {
  }

  ngOnInit(): void {
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(movie: Movie) {
    this.edit.emit(movie._id);
  }

  onDelete(movie: Movie) {
    this.delete.emit(movie);
  }

}
