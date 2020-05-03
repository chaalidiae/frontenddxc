import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../core/authentification.service';
import {Router} from '@angular/router';
import {AuditsService} from '../../../../core/audit.service';
import { I18nComponent } from 'src/app/shared/lang/i18n/container/i18n.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../../../shared/lang/i18n/reducers';


@Component({
  selector: 'app-audits',
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.css']
})
export class AuditsComponent extends I18nComponent {
  audits: any;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private auditService: AuditsService,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
    ) { 
      super(store, translate);
      this.doSearch();
      
    }

  
  onLogout() {
      this.authService.logout();
      this.router.navigateByUrl('/login');
    }

  OnSearch() {
    this.doSearch();
  }

  doSearch() {
    this.auditService.getAudits()
      .subscribe(data => {
        this.audits = data;
      }, error => {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      });
  }

}
