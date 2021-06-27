import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthModule } from './auth/auth.module';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: 'dog-search', component: SearchComponent },
  { path: '', redirectTo: 'dog-search', pathMatch: 'full' },
  { path: '**', redirectTo: 'dog-search', pathMatch: 'full' },
];

@NgModule({
  imports: [AuthModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
