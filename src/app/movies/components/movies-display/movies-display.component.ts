import { Component, EventEmitter, Input, Output, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Movie } from '../../model/movie';
import { MatTableDataSource } from '@angular/material/table';
import { MoviesService } from '../../services/movies.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-movies-display',
  templateUrl: './movies-display.component.html',
  styleUrls: ['./movies-display.component.scss']
})
export class MoviesDisplayComponent implements OnInit, AfterViewInit {
  @Input() movies: Movie[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  readonly displayedColumns = ['name', 'year', 'synopsis', 'category', 'director', 'c', 'cast', 'actions'];
  dataSource = new MatTableDataSource<Movie>();

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private moviesService: MoviesService) {
  }

  ngOnInit(): void {
    this.moviesService.list().subscribe({
      next: (movie: Movie[]) => {
        this.dataSource.data = movie;
      },
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
