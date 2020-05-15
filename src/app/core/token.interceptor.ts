import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {AuthenticationService} from '../main/index/login/shared/authentification.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthenticationService, public router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url !== 'http://localhost:8080/authenticate') {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.auth.LoadToken()}`
        }
      });
    }
    return next.handle(request);
  }
}
