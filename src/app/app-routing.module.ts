import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthModule } from './auth/auth.module';
import { DogInfoModule } from './dog-info/dog-info.module';
import { ExploreComponent } from './explore/explore.component';
import { SearchComponent } from './search/search.component';
import { SignUpComponent } from './sign-up/sign-up.component';

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
  { path: 'explore', component: ExploreComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'account', component: AccountComponent },
  { path: '', redirectTo: 'dog-search', pathMatch: 'full' },
  { path: '**', redirectTo: 'dog-search', pathMatch: 'full' },
];

@NgModule({
  imports: [AuthModule, DogInfoModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
