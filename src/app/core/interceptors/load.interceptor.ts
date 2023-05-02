import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Injectable()
export class LoadInterceptor implements HttpInterceptor {

  constructor(private readonly loadService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadService.show()
    return next.handle(request).pipe(
      finalize(() => this.loadService.hide()),
    );
  }
}
