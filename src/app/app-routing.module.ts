import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesListComponent } from './modules/heroes-list/heroes-list.component';

const routes: Routes = [
  {
    path: 'heroes',
    loadChildren: () => import('./modules/heroes-list/heroes-list.module').then(m => m.HeroesListModule)
  },
  {
    path: 'form-heroes',
    loadChildren: () => import('./modules/heroes-form/heroes-form.module').then(m => m.HeroesFormModule)
  },
  {
    path: '', redirectTo: '/heroes', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: '/heroes', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
