import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogBreedComponent } from './dog-breed/dog-breed.component';

const routes: Routes = [
  {
    path: 'dog-breed',
    component: DogBreedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DogInfoRoutingModule {}
