import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Breed } from 'src/shared/models/breed.model';
import { EEndpoints } from 'src/shared/utils/EEndpoint.enum';
import { DogApiService } from './dog-api.service';

@Injectable({ providedIn: 'root' })
export class MockDbService {
  additionalBreeds: string[] = ['borzoi'];

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
}
