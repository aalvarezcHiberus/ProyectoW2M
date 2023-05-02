import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ContainerComponent } from './layout/container/container.component';
import { LoadInterceptor } from './interceptors/load.interceptor';
import { UppercaseDirective } from './directives/uppercase.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ContainerComponent,
    UppercaseDirective
  ],
  imports: [
    CommonModule,
    NgbModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    HttpClientModule,
    TranslateModule,
  ],
  exports: [
    HttpClientModule,
    UppercaseDirective,
    ContainerComponent
  ],
  providers: [
    {
       provide: HTTP_INTERCEPTORS,
       useClass: LoadInterceptor,
       multi: true,
    }
 ],
})
export class CoreModule { }
