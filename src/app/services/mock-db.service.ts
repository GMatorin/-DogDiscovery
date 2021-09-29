import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Account } from 'src/shared/models/account.model';
import { Breed } from 'src/shared/models/breed.model';
import { EMockApiErrors } from 'src/shared/models/EMockApiErrors.enum';
import { EEndpoints } from 'src/shared/utils/EEndpoint.enum';
import { DogApiService } from './dog-api.service';

@Injectable({ providedIn: 'root' })
export class MockDbService {
  additionalBreeds: string[] = ['Borzoi'];

  constructor(private dogApiService: DogApiService) {
    this.saveAllBreedInfos();
  }

  saveAllBreedInfos(): void {
    if (!localStorage.getItem(EEndpoints.BREED_INFO)) {
      this.dogApiService.getAllBreedsInfo().subscribe((breedsInfos) => {
        localStorage.setItem(
          EEndpoints.BREED_INFO,
          JSON.stringify(breedsInfos)
        );
      });
    }
  }

  saveBreedNames(): void {
    const breedsInfos: Breed[] = JSON.parse(
      localStorage.getItem(EEndpoints.BREED_INFO) ?? '[]'
    );

    const names: string[] = breedsInfos.map((breed) => breed.name);

    if (breedsInfos.length === 0) {
      throw new Error('Failed fetching breed names');
    }

    localStorage.setItem(EEndpoints.BREED_NAMES, JSON.stringify(names));
  }

  getBreedNames(): string[] {
    const breedNames: string[] = JSON.parse(
      localStorage.getItem(EEndpoints.BREED_NAMES) ?? '[]'
    );
    breedNames.push(...this.additionalBreeds);
    return breedNames;
  }

  getAllBreeds(): Breed[] {
    return JSON.parse(localStorage.getItem(EEndpoints.BREED_INFO) ?? '[]');
  }

  getBreedInfo(breedName: string): Observable<Breed> {
    const foundBreed: Breed | undefined = this.getAllBreeds().find(
      (breed) => breed.name === breedName
    );
    if (!foundBreed) {
      throw new Error('Breed info not found');
    }
    return of(foundBreed);
  }

  getRandomDogBreeds(breedsNumber: number): string[] {
    const numberOfBreeds = this.getBreedNames().length;
    const breedNames: string[] = [];

    for (let i = 0; i < breedsNumber; i++) {
      breedNames.push(
        this.getBreedNames()[Math.round(Math.random() * numberOfBreeds)]
      );
    }

    return breedNames;
  }

  getAccountByCredentials(
    accountEmail: string,
    password: string
  ): Observable<Account> {
    const account: Account | undefined = this.getAccountByEmail(accountEmail);

    if (!account) {
      throw new Error(EMockApiErrors.ACCOUNT_NOT_FOUND);
    }

    if (password && account.password !== password) {
      throw new Error(EMockApiErrors.WRONG_PASSWORD);
    }

    return of(account);
  }

  getAccountByEmail(accountEmail: string): Account | undefined {
    const accounts: Account[] = JSON.parse(
      localStorage.getItem(EEndpoints.ACCOUNTS) ?? '[]'
    );

    const account: Account | undefined = accounts.find(
      (acc) => acc.email === accountEmail
    );

    return account;
  }

  saveAccount(account: Account, updateAccount?: boolean): Observable<Account> {
    if (!updateAccount && this.getAccountByEmail(account.email)) {
      throw new Error(EMockApiErrors.ACCOUNT_EXISTS);
    }

    let accounts: Account[] = JSON.parse(
      localStorage.getItem(EEndpoints.ACCOUNTS) ?? '[]'
    );

    accounts = accounts.filter((acc) => acc.email !== account.email);
    accounts.push(account);

    localStorage.setItem(EEndpoints.ACCOUNTS, JSON.stringify(accounts));

    return of(account);
  }
}
