import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud-angular';

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) {
  }

  onActors() {
    this._router.navigate(['actors'], { relativeTo: this._route });
  }

  onDirectors() {
    this._router.navigate(['directors'], { relativeTo: this._route });
  }

  onClasses() {
    this._router.navigate(['classes'], { relativeTo: this._route });
  }

  onMovies() {
    this._router.navigate(['movies'], { relativeTo: this._route });
  }

  onItems() {
    this._router.navigate(['items'], { relativeTo: this._route });
  }

  onPartners() {
    this._router.navigate(['partners'], { relativeTo: this._route });
  }

  onDependents() {
    this._router.navigate(['dependents'], { relativeTo: this._route });
  }

  onLocations() {
    this._router.navigate(['locations'], { relativeTo: this._route });
  }
}
