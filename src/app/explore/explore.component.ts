import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IExploreTile } from '../../shared/models/explore-tile.model';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  from,
  Observable,
  of,
  Subject,
} from 'rxjs';
import { MockDbService } from '../services/mock-db.service';
import { DogApiService } from '../services/dog-api.service';
import { map, mergeMap, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExploreComponent implements OnInit, OnDestroy {
  private untilDestroyed$: Subject<void> = new Subject();

  public isLoggedIn$: Observable<boolean> = this.accountService.isLoggedIn();
  public breedNames: string[] = [];
  public exploreTiles$: Observable<IExploreTile[]> = new Observable();

  constructor(
    private dogApiService: DogApiService,
    private mockDbService: MockDbService,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.breedNames = this.mockDbService.getRandomDogBreeds(5);
    this.exploreTiles$ = forkJoin(
      this.breedNames.map((names, index) =>
        this.dogApiService.getDogPhoto(names + ' dog').pipe(
          map((imageUrl) => {
            return {
              breedName: this.breedNames[index],
              imageUrl: imageUrl,
            } as IExploreTile;
          })
        )
      )
    );
  }

  toBreedDetails(tile: IExploreTile): void {
    this.router.navigate(['/dog-breed', { breedName: tile.breedName }]);
  }

  saveBreed(tile: IExploreTile) {
    this.accountService.saveBreed(tile.breedName);
  }

  ngOnDestroy() {
    this.untilDestroyed$.next();
  }
}
