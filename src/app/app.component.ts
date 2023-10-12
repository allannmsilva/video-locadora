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
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  onActor() {
    this.router.navigate(['actors'], { relativeTo: this.route });
  }

  onDirector() {
    this.router.navigate(['directors'], { relativeTo: this.route });
  }

  onClasses() {
    this.router.navigate(['classes'], { relativeTo: this.route });
  }

  onMenu() {
    this.router.navigate([''], { relativeTo: this.route });
  }
}
