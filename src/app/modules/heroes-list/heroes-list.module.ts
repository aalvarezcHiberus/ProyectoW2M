import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesListRoutingModule } from './heroes-list-routing.module';
import { HeroesListComponent } from './heroes-list.component';
import { SearchCardModule } from '../search-card/search-card.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [HeroesListComponent],
  imports: [
    CommonModule,
    NgbModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    SearchCardModule,
    HeroesListRoutingModule,
    TranslateModule,
  ]
})
export class HeroesListModule { }
