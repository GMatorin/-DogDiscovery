import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MockDbService {
  saveBreedNames() {
    localStorage.setItem(
      'breedNames',
      JSON.stringify(['spaniel', 'borzoi', 'shepherd', 'afgan', 'hasky'])
    );
  }

  getBreedNames(): string[] {
    return JSON.parse(localStorage.getItem('breedNames') ?? '[]');
  }
}
