import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesFormComponent } from './heroes-form.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesFormRoutingModule { }
