import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentification.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/users.service';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../../../../shared/lang/i18n/reducers';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users: any;
  private page :number=0;
  pages:Array<number>;
  private size: number=5;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userService: UsersService,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
  ) { 
    
    this.getPageOfUsers();
  }
  getPageOfUsers() {
    this.userService.getPageOfUsers(this.page,this.size)
      .subscribe(data => {
        console.log(data)
        this.users = data['content'];
        this.pages=new Array(data['totalPages']);
      }, error => {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      });
  }

  ngOnInit(): void {
  }

  selectSize(event:any){
    event.preventDefault();
    this.size=event.target.value;
    this.page=0;
    this.getPageOfUsers(); 
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

}
