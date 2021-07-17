import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DogApiService } from 'src/app/services/dog-api.service';

@Component({
  templateUrl: './dog-breed.component.html',
  styleUrls: ['./dog-breed.component.scss'],
})
export class DogBreedComponent implements OnInit {
  public breedName: string = '';
  public image$: Observable<string> = new Observable();
  public imageUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private dogApiService: DogApiService
  ) {
    console.log("I'm BUUILD");
  }

  ngOnInit() {
    this.image$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.breedName = params.get('breedName') ?? '';
        return this.dogApiService.getDogPhoto(this.breedName);
      })
    );
  }

  // this.heroes$ = this.route.paramMap.pipe(
  //   switchMap(params => {
  //     this.selectedId = Number(params.get('id'));
  //     return this.service.getHeroes();
  //   })
  // );
}
