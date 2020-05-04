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
  private page :number=0;
  pages:Array<number>;
  private size: number=5;
  constructor(private authService: AuthenticationService,
              private router: Router,
              private rolesService: RolesService,
              readonly store: Store<fromI18n.State>,
              readonly translate: TranslateService) {
                super(store, translate);
                this.getPageOfRoles();
               }

  getPageOfRoles() {
    this.rolesService.getPageOfRoles(this.page,this.size)
      .subscribe(data => {
        this.roles = data['content'];
        this.pages=new Array(data['totalPages']);
      }, error => {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      });
  }

  setPage(i,event:any){
    event.preventDefault();
    this.page=i;
    this.getPageOfRoles(); 
  }
  setPrevious(event:any){
    event.preventDefault();
    if (this.page>0){
    this.page--;
    this.getPageOfRoles(); 
    }
  }
  setNext(event:any){
    event.preventDefault();
    let j:number=this.pages.length-1;
    if (this.page<j){
      this.page++;
      this.getPageOfRoles(); 
    } 
  }

  selectSize(event:any){
    event.preventDefault();
    this.size=event.target.value;
    this.page=0;
    this.getPageOfRoles(); 
    }

}
