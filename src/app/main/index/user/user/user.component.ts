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
  private page :number=0;
  pages:Array<number>;
  private size: number=5;
  constructor(private authService: AuthenticationService,
    private router: Router,
    private usersService: UsersService,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService) {
      super(store, translate);
      this.getPageOfUsers();
     }

  
  getPageOfUsers() {
    this.usersService.getPageOfUsers(this.page,this.size)
      .subscribe(data => {
        this.users = data['content'];
        this.pages=new Array(data['totalPages']);
      }, error => {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      });
  }

  setPage(i,event:any){
    event.preventDefault();
    this.page=i;
    this.getPageOfUsers(); 
  }
  setPrevious(event:any){
    event.preventDefault();
    if (this.page>0){
    this.page--;
    this.getPageOfUsers(); 
    }
  }
  setNext(event:any){
    event.preventDefault();
    let j:number=this.pages.length-1;
    if (this.page<j){
      this.page++;
      this.getPageOfUsers(); 
    } 
  }

  selectSize(event:any){
    event.preventDefault();
    this.size=event.target.value;
    this.page=0;
    this.getPageOfUsers(); 
    }

}
