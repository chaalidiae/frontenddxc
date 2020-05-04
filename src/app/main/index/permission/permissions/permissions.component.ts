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
  private page :number=0;
  pages:Array<number>;
  private size: number=5;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private permissionsService: PermissionsService,
              readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
    ) { 
      super(store, translate);
      
    this.getPageOfPermissions();
    }


    getPageOfPermissions() {
    this.permissionsService.getPageOfPermissions(this.page,this.size)
      .subscribe(data => {
        this.permissions = data['content'];
        this.pages=new Array(data['totalPages']);
      }, error => {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      });
  }

  setPage(i,event:any){
    event.preventDefault();
    this.page=i;
    this.getPageOfPermissions(); 
  }
  setPrevious(event:any){
    event.preventDefault();
    if (this.page>0){
    this.page--;
    this.getPageOfPermissions(); 
    }
  }
  setNext(event:any){
    event.preventDefault();
    let j:number=this.pages.length-1;
    if (this.page<j){
      this.page++;
      this.getPageOfPermissions(); 
    } 
  }

  selectSize(event:any){
    event.preventDefault();
    this.size=event.target.value;
    this.page=0;
    this.getPageOfPermissions(); 
    }

}
