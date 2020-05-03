import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../core/authentification.service';
import {Router} from '@angular/router';

import { I18nComponent } from '../../lang/i18n/container/i18n.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../lang/i18n/reducers';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent extends I18nComponent {

  constructor(
     private authService: AuthenticationService,
     private router: Router,
     readonly store: Store<fromI18n.State>,
     readonly translate: TranslateService
     ) {
      super(store, translate);
      }

  

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
