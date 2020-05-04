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
  private page :number=0;
  pages:Array<number>;
  private size: number=5;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private auditService: AuditsService,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
    ) { 
      super(store, translate);
      this.getPageOfAudits();
      
    }

  
  onLogout() {
      this.authService.logout();
      this.router.navigateByUrl('/login');
    }

  OnSearch() {
    this.getPageOfAudits();
  }

  getPageOfAudits() {
    this.auditService.getPageOfAudits(this.page,this.size)
      .subscribe(data => {
        this.audits = data['content'];
        this.pages=new Array(data['totalPages']);
      }, error => {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      });
  }

  setPage(i,event:any){
    event.preventDefault();
    this.page=i;
    this.getPageOfAudits(); 
  }
  setPrevious(event:any){
    event.preventDefault();
    if (this.page>0){
    this.page--;
    this.getPageOfAudits(); 
    }
  }
  setNext(event:any){
    event.preventDefault();
    let j:number=this.pages.length-1;
    if (this.page<j){
      this.page++;
      this.getPageOfAudits(); 
    } 
  }

  selectSize(event:any){
    event.preventDefault();
    this.size=event.target.value;
    this.page=0;
    this.getPageOfAudits(); 
    }


}
