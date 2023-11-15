import { HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(req: any, next: any) {
    this.loadingService.show(); // antes del request

    return next.handle(req).pipe(
      finalize(() => this.loadingService.hide()) // después de la response
    );
  }
}
