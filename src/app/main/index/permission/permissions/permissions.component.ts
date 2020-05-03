import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../core/authentification.service';
import {Router} from '@angular/router';
import {RolesService} from '../../../../core/roles.service';
import {PermissionsService} from '../../../../core/permissions.service';
import { I18nComponent } from 'src/app/shared/lang/i18n/container/i18n.component';
import * as fromI18n from '../../../../shared/lang/i18n/reducers';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent extends I18nComponent implements OnInit {

  permissions: any;
  constructor(private authService: AuthenticationService,
              private router: Router,
              private permissionsService: PermissionsService,
              readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
    ) { 
      super(store, translate);
      
    this.doSearch();
    }


  doSearch() {
    this.permissionsService.getPermissions()
      .subscribe(data => {
        this.permissions = data;
      }, error => {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      });
  }

}
