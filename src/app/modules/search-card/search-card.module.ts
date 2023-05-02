import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchCardComponent } from './search-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SearchCardComponent],
  imports: [
    CommonModule,
    NgbModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    TranslateModule,
  ],
  exports: [
    SearchCardComponent
  ]
})
export class SearchCardModule { }
