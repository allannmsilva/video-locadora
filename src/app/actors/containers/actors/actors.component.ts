import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Actor } from '../../model/actor';
import { ActorsService } from '../../services/actors.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss']
})
export class ActorsComponent implements OnInit {

  actors$: Observable<Actor[]>;
  //actors: Actor[] = [];
  displayedColumns = ['name', 'actions'];
  //actorsService: ActorsService;

  constructor(
    private actorsService: ActorsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.actors$ = this.actorsService.list()
      .pipe(
        catchError(error => {
          this.onError('Error displaying actors!');
          return of([])
        })
      );
    //this.actors = this.actorsService.list().subscribe(actors => this.actors = actors);
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(_id: string) {
    this.router.navigate(['edit', _id], { relativeTo: this.route });
  }
}
