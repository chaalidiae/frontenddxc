import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../core/authentification.service';
import {Router} from '@angular/router';
import {UsersService} from '../../../../core/users.service';
import {RolesService} from '../../../../core/roles.service';
import { I18nComponent } from 'src/app/shared/lang/i18n/container/i18n.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../../../shared/lang/i18n/reducers';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent extends I18nComponent implements OnInit {
  roles: any;
  constructor(private authService: AuthenticationService,
              private router: Router,
              private rolesService: RolesService,
              readonly store: Store<fromI18n.State>,
              readonly translate: TranslateService) {
                super(store, translate);
                this.doSearch();
               }

  doSearch() {
    this.rolesService.getRoles()
      .subscribe(data => {
        this.roles = data;
        console.log(this.roles);
      }, error => {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      });
  }

}
