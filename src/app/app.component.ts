import { Component, OnInit } from '@angular/core';
import { DogApiService } from './services/dog-api.service';
import { MockDbService } from './services/mock-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dog-discovery';
  constructor(private db: MockDbService) {}

  ngOnInit() {
    this.db.saveBreedNames();
    console.log(this.db.getBreedNames());
  }
}
