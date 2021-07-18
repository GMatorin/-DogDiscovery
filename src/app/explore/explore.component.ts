import { Component } from '@angular/core';
import { IExploreTile } from '../../shared/models/explore-tile.model';
import { Observable, of } from 'rxjs';

@Component({
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent {
  exploreTiles$: Observable<IExploreTile[]> = new Observable();

  constructor() {
    const data: IExploreTile = {} as IExploreTile;
    this.exploreTiles$ = of([
      { ...data },
      { ...data },
      { ...data },
      { ...data },
    ]);
  }
}
