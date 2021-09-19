import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Account } from 'src/shared/models/account.model';
import { EMockApiErrors } from 'src/shared/models/EMockApiErrors.enum';
import { MockDbService } from './mock-db.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private currentAccount$: BehaviorSubject<Account | null> =
    new BehaviorSubject<Account | null>(null);
  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private mockDbService: MockDbService) {}

  saveAccount(account: Account): void {
    this.mockDbService
      .saveAccount(account)
      .pipe(
        filter((acc) => !!acc),
        switchMap((account) => {
          this.currentAccount$.next(account);
          this.isLoggedIn$.next(true);
          return of(account);
        })
      )
      .subscribe();
  }

  getAccount(): Observable<Account | null> {
    return this.currentAccount$.asObservable();
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  logIn(email: string, password: string): void {
    this.mockDbService
      .getAccountByCredentials(email, password)
      .pipe(
        filter((acc) => !!acc),
        switchMap((account) => {
          this.currentAccount$.next(account);
          this.isLoggedIn$.next(true);
          return of(account);
        })
      )
      .subscribe();
  }

  logout(): void {
    this.isLoggedIn$.next(false);
    this.currentAccount$.next(null);
  }

  saveBreed(breedName: string): void {
    const currentAccount = this.currentAccount$.value;
    if (!currentAccount) {
      throw new Error(EMockApiErrors.ACCOUNT_NOT_FOUND);
    }
    if (!currentAccount.savedBreeds.includes(breedName)) {
      currentAccount?.savedBreeds.push(breedName);
      this.currentAccount$.next(currentAccount);

      this.mockDbService.saveAccount(currentAccount, true);
    }
  }
}
