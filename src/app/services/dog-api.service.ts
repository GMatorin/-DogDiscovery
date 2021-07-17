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
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class DogApiService {
  urls = {
    byBreed: 'https://api.thedogapi.com/v1/breeds/search?q=:breed',
    allBreeds: 'https://api.thedogapi.com/v1/breeds',
    image: 'https://pixabay.com/api/?key=:key&q=:breed&per_page=3',
  };
  private klych: string;
  private klych2: string;

  constructor(private http: HttpClient) {
    this.klych = partApi2[1] + partApi[0] + partApi2[0];
    this.klych2 = partApi[1] + partApi2[3] + partApi2[2];
  }

  getDogInfoByBreed(breed: string): Observable<any> {
    const url = this.urls.byBreed.replace(':breed', breed);
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

  getDogPhoto(breed: string): Observable<string> {
    const url = this.urls.image
      .replace(':key', this.klych2)
      .replace(':breed', breed);

    return this.http.get<any>(url).pipe(
      map((imagesResponse) => {
        return imagesResponse.hits[0].largeImageURL;
      })
    );
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
