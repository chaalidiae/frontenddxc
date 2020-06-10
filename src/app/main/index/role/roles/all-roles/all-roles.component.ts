import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/main/index/login/shared/authentification.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../../../../shared/lang/i18n/reducers';
import { RolesService } from 'src/app/main/index/role/shared/roles.service';

@Component({
  selector: 'app-all-roles',
  templateUrl: './all-roles.component.html',
  styleUrls: ['./all-roles.component.css']
})
export class AllRolesComponent implements OnInit {
  roles: any;
  private page :number=0;
  pages:Array<number>;
  private size: number=5;

  constructor(private authService: AuthenticationService,
    private router: Router,
    private rolesService: RolesService,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService) {
      this.getPageOfRoles();
     }

  ngOnInit(): void {
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

    OnUpdate(id){
      this.router.navigate(['/new-role'], {queryParams: {id}});
    }

    OnDelete(id) {
      const confirm = window.confirm('Est vous sure ?');
      if (confirm === true) {
        this.rolesService.deleteRole(id).subscribe(
          data => {
            this.getPageOfRoles();
          }
        );
      }
    }
}
