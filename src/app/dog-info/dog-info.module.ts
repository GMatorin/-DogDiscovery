import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogInfoRoutingModule } from './dog-info-routing.module';
import { DogBreedComponent } from './dog-breed/dog-breed.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [DogBreedComponent],
  imports: [
    CommonModule,
    DogInfoRoutingModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class DogInfoModule {}
