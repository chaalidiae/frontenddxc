import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {AuthenticationService} from '../../../core/authentification.service';
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

  

  onLogin(user) {
    this.authService.login(user)
      .subscribe(resp => {
          const a = JSON.stringify(resp.body);
          const b = JSON.parse(a);
          const token = 'Bearer ' + b.jwt;
          // console.log(token);
          this.authService.saveToken(token);
          this.router.navigateByUrl('/contacts');
        },
        error => {
          this.mode = 1;
        });
  }

}
