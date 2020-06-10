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
import { finalize } from 'rxjs/operators';
import {LoaderService} from './loader/shared/loader.service';

/**
 * Cette classe permet d'interpréter tout les requette sortante en ajoutant le Token à chaque requette,
 * ainsi au cas de latence, elle va afficher un spinner.
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthenticationService, public router: Router, public loaderService: LoaderService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url !== 'http://localhost:8080/authenticate') {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.auth.LoadToken()}`
        }
      });
    }
    this.loaderService.show();
    console.log('loading ..')
    return next.handle(request).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
}
