import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { DogApiService } from '../services/dog-api.service';
import { MockDbService } from '../services/mock-db.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  title = 'dog-discovery';
  breedName: string = '';
  dogs: string[] = [];
  showDogs = false;

  formControl = new FormControl();
  breedNames: string[] = [];
  filteredBreedNames: Observable<string[]> = new Observable();
  filteredBreedNamesCache: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  constructor(private mockDbService: MockDbService, private router: Router) {}

  ngOnInit() {
    this.breedNames = this.mockDbService.getBreedNames();

    this.filteredBreedNames = this.filteredBreedNamesCache.asObservable();

    this.formControl.valueChanges
      .pipe(
        startWith(''),
        filter((breedValue: string) => breedValue.length > 0),
        map((value) => this._filter(value))
      )
      .subscribe((value) => {
        this.filteredBreedNamesCache.next(value);
      });
  }

  openBreedInfo() {
    this.router.navigate(['/dog-breed', { breedName: this.formControl.value }]);
  }

  refreshFormControl() {
    if (!this.formControl.value) {
      this.filteredBreedNamesCache.next([]);
    }
  }

  private _filter(value: string): string[] {
    this.breedName = value;
    const filterValue = value.toLowerCase();

    return this.breedNames.filter((breed) =>
      breed.toLowerCase().includes(filterValue)
    );
  }
}
