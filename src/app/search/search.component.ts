import { Component } from '@angular/core';
import { DogApiService } from '../services/dog-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  title = 'dog-discovery';
  breedName: string = '';
  dogs: string[] = [];
  showDogs = false;

  constructor(private dogApiService: DogApiService) {}

  getDog() {
    this.dogApiService.getDogInfoByBreed(this.breedName).subscribe((info) => {
      console.log(info);
    });
  }
}
