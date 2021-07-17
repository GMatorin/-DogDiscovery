import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { DogInfoModule } from './dog-info/dog-info.module';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dog-breed',
    pathMatch: 'prefix',
    loadChildren: () =>
      import('../app/dog-info/dog-info.module').then((m) => m.DogInfoModule),
  },
  { path: 'dog-search', component: SearchComponent },
  { path: '', redirectTo: 'dog-search', pathMatch: 'full' },
  { path: '**', redirectTo: 'dog-search', pathMatch: 'full' },
];

@NgModule({
  imports: [AuthModule, DogInfoModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
