import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DogApiService } from 'src/app/services/dog-api.service';
import { MockDbService } from 'src/app/services/mock-db.service';
import { Breed } from 'src/shared/models/breed.model';

@Component({
  templateUrl: './dog-breed.component.html',
  styleUrls: ['./dog-breed.component.scss'],
})
export class DogBreedComponent implements OnInit {
  public breedName: string = '';
  public image$: Observable<string> = new Observable();
  public imageUrl: string = '';
  public breedInfo$: Observable<Breed> = new Observable();

  constructor(
    private route: ActivatedRoute,
    private dogApiService: DogApiService,
    private mockDbService: MockDbService,
    private router: Router
  ) {}

  ngOnInit() {
    this.breedName = this.route.snapshot.params['breedName'];
    this.image$ = this.dogApiService.getDogPhoto(this.breedName);
    this.breedInfo$ = this.mockDbService.getBreedInfo(this.breedName);
  }

  navigateToSearch() {
    this.router.navigate(['dog-search'], { relativeTo: this.route });
  }

  // this.heroes$ = this.route.paramMap.pipe(
  //   switchMap(params => {
  //     this.selectedId = Number(params.get('id'));
  //     return this.service.getHeroes();
  //   })
  // );
}
