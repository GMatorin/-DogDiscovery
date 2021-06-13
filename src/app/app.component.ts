import { Component } from '@angular/core';
import { DogApiService } from './services/dog-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dog-discovery';
  breedName: string = '';
  dogs: string[] = [];
  showDogs = false;

  constructor(private dogApiService: DogApiService) {}

  getDog() {
    this.dogApiService.getDogInfoByBreed(this.breedName);
  }
}
