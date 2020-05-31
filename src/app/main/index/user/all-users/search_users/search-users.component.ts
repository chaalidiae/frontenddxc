import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AuthenticationService} from '../../../login/shared/authentification.service';
import {Router} from '@angular/router';
import {UsersService} from '../../shared/users.service';
import {Store} from '@ngrx/store';
import * as fromI18n from '../../../../../shared/lang/i18n/reducers';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {

  users: any;
  private page :number=0;
  pages:Array<number>;
  private size: number=5;
  @Input() keyword: any;
  @Input() property: any;
  @Input() refrechChildSubject: Subject<boolean> = new Subject<boolean>();
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userService: UsersService,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
  ) {

  }
  ngOnInit(): void {
    this.getPageOfUsers();
    this.refrechChildSubject.subscribe(response => {
      if(response){
        console.log("keyword :\n"+this.keyword);
        this.getPageOfUsers();
      }
    }, error => {
      this.router.navigateByUrl('/**');
    });

  }

  getPageOfUsers() {
    this.userService.searchForUsers(this.keyword,this.property,this.page,this.size)
      .subscribe(data => {
        console.log(data)
        this.users = data['content'];
        this.pages=new Array(data['totalPages']);
      }, error => {
        this.router.navigateByUrl('/**');
      });
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

  OnUpdate(id){
    this.router.navigate(['/new-user'], {queryParams: {id}});
  }

}
