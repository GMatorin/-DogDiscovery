import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MockDbService {
  saveBreedNames() {
    localStorage.setItem('breedNames', JSON.stringify(['spaniel', 'borzoi']));
  }

  getBreedNames() {
    const names: string[] = JSON.parse(
      localStorage.getItem('breedNames') ?? '[]'
    );
    return names;
  }
}
