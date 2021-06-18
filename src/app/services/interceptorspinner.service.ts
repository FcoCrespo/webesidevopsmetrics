import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorspinnerService implements HttpInterceptor{

  constructor(private spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.callSpinner();
    return next.handle(req).pipe(
      finalize( () => this.spinnerService.stopSpinner())
    );
  }
}
