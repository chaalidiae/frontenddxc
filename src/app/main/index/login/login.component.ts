import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {AuthenticationService} from './shared/authentification.service';
import { I18nComponent } from 'src/app/shared/lang/i18n/container/i18n.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../../shared/lang/i18n/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends I18nComponent {
  mode = 0;
  constructor(
    private authService: AuthenticationService,
     private router: Router,
     readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
     ) {
      super(store, translate);
     }


  /**
   * Cette fonction permet de faire l'authentification.
   * @param user
   */
  onLogin(user) {
    this.authService.login(user)
      .subscribe(resp => {
          const a = JSON.stringify(resp.body);
          const b = JSON.parse(a);
          const token = 'Bearer ' + b.jwt;
          this.authService.saveToken(token);
          this.router.navigateByUrl('/user');
        },
        error => {
          this.mode = 1;
        });
  }

}
