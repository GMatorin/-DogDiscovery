import { Injectable } from '@angular/core';
import { Breed } from 'src/shared/models/breed.model';
import { EEndpoints } from 'src/shared/utils/EEndpoint.enum';
import { DogApiService } from './dog-api.service';

@Injectable({ providedIn: 'root' })
export class MockDbService {
  constructor(private dogApiService: DogApiService) {
    this.getAllBreedInfos();
  }

  getAllBreedInfos() {
    if (!localStorage.getItem(EEndpoints.BREED_INFO)) {
      this.dogApiService.getAllBreedsInfo().subscribe((breedsInfos) => {
        localStorage.setItem(
          EEndpoints.BREED_INFO,
          JSON.stringify(breedsInfos)
        );
      });
    }
  }

  saveBreedNames() {
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
    return JSON.parse(localStorage.getItem(EEndpoints.BREED_NAMES) ?? '[]');
  }
}
