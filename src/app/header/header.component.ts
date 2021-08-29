import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnChanges, OnInit {
  title: string = 'Dog Discovery';
  isExploreSelected$: Observable<boolean>;
  isLoggedIn$: Observable<boolean> = this.accountService.isLoggedIn();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit() {}

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

  toSignIn(): void {
    this.router.navigate(['sign-in'], { relativeTo: this.route });
  }

  toAccount(): void {
    this.router.navigate(['account'], { relativeTo: this.route });
  }
}
