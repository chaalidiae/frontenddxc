import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AuthenticationService} from '../../../../login/shared/authentification.service';
import {Router} from '@angular/router';
import {RolesService} from '../../../shared/roles.service';
import {Store} from '@ngrx/store';
import * as fromI18n from '../../../../../../shared/lang/i18n/reducers';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-search-roles',
  templateUrl: './search-roles.component.html',
  styleUrls: ['./search-roles.component.css']
})
export class SearchRolesComponent implements OnInit {

  roles:any;
  private page :number=0;
  pages:Array<number>;
  private size: number=5;
  @Input() keyword: any;
  @Input() property: any;
  @Input() refrechChildSubject: Subject<boolean> = new Subject<boolean>();
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private rolesService: RolesService,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.searchForRoles();
    this.refrechChildSubject.subscribe(response => {
      if(response){
        console.log("keyword :\n"+this.keyword);
        this.searchForRoles();
      }
    }, error => {
      /*this.authService.logout();
        this.router.navigateByUrl('/login');*/
      this.router.navigateByUrl('/**');
    });

  }

  searchForRoles() {
    this.rolesService.searchForRoles(this.keyword,this.property,this.page,this.size)
      .subscribe(data => {
        console.log(data)
        this.roles = data['content'];
        this.pages=new Array(data['totalPages']);
      }, error => {
        this.router.navigateByUrl('/**');
      });
  }

  OnUpdate(id){
    this.router.navigate(['/new-role'], {queryParams: {id}});
  }


  selectSize(event:any){
    event.preventDefault();
    this.size=event.target.value;
    this.page=0;
    this.searchForRoles();
  }

  setPage(i,event:any){
    event.preventDefault();
    this.page=i;
    this.searchForRoles();
  }
  setPrevious(event:any){
    event.preventDefault();
    if (this.page>0){
      this.page--;
      this.searchForRoles();
    }
  }
  setNext(event:any){
    event.preventDefault();
    let j:number=this.pages.length-1;
    if (this.page<j){
      this.page++;
      this.searchForRoles();
    }

  }

}
