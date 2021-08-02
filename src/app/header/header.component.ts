import { Component, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnChanges {
  title: string = 'Dog Discovery';
  isExploreSelected$: Observable<boolean> = new Observable();

  constructor(private route: ActivatedRoute, private router: Router) {}

  // ToDo: fix mat-tab bug: when using company logo to navigate out the active tab stays selected
  ngOnChanges() {
    this.isExploreSelected$ = this.route.paramMap.pipe(
      switchMap(() => {
        return of(this.router.url.includes('explore'));
      })
    );
  }

  navigateToSearch(): void {
    this.router.navigate(['dog-search'], { relativeTo: this.route });
  }

  tabClick(event: any): void {
    if (event.index === 1) {
      this.router.navigate(['explore'], { relativeTo: this.route });
    } else {
      this.navigateToSearch();
    }
  }

  toSignUp(): void {
    this.router.navigate(['sign-up'], { relativeTo: this.route });
  }
}
