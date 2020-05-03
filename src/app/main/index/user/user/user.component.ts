import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../core/authentification.service';
import {Router} from '@angular/router';
import {UsersService} from '../../../../core/users.service';
import * as fromI18n from '../../../../shared/lang/i18n/reducers';
import { I18nComponent } from 'src/app/shared/lang/i18n/container/i18n.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends I18nComponent {
  users: any;
  constructor(private authService: AuthenticationService,
    private router: Router,
    private usersService: UsersService,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService) {
      super(store, translate);
      this.doSearch();
     }

  
  doSearch() {
    this.usersService.getUsers()
      .subscribe(data => {
        this.users = data;
      }, error => {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      });
  }

}
