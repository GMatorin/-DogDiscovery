import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { partApi2 } from 'src/shared/part-api2';
import { partApi } from 'src/shared/part-api';
import { Observable, of } from 'rxjs';
import { Breed } from 'src/shared/models/breed.model';

@Injectable({ providedIn: 'root' })
export class DogApiService {
  urls = {
    byBreed: 'https://api.thedogapi.com/v1/breeds/search?q=:breed',
    allBreeds: 'https://api.thedogapi.com/v1/breeds',
  };
  private klych: string;

  constructor(private http: HttpClient) {
    this.klych = partApi2[1] + partApi + partApi2[0];
  }

  getDogInfoByBreed(breed: string): Observable<any> {
    const url = this.urls.byBreed.replace(':breed', breed.toString());
    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.klych,
    });

    // this.http.get(url, { headers: header }).subscribe((info) => {
    //   console.log(JSON.stringify(info));
    // });
    return of(response);
  }

  getAllBreedsInfo(): Observable<Breed[]> {
    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.klych,
    });

    return this.http.get<Breed[]>(this.urls.allBreeds, { headers: header });
  }
}

const response = [
  {
    weight: { imperial: '55 - 120', metric: '25 - 54' },
    height: { imperial: '26 - 28', metric: '66 - 71' },
    id: 52,
    name: 'Borzoi',
    bred_for: 'Coursing wolves',
    breed_group: 'Hound',
    life_span: '10 - 13 years',
    temperament:
      'Respectful, Independent, Athletic, Gentle, Intelligent, Quiet',
  },
];
