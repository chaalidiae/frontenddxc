import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/main/index/login/shared/authentification.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../../../shared/lang/i18n/reducers';
import { PermissionsService } from 'src/app/main/index/permissions/shared/permissions.service';

@Component({
  selector: 'app-all-permissions',
  templateUrl: './all-permissions.component.html',
  styleUrls: ['./all-permissions.component.css']
})
export class AllPermissionsComponent implements OnInit {
  permissions: any;
  private page :number=0;
  pages:Array<number>;
  private size: number=5;
  constructor(private authService: AuthenticationService,
    private router: Router,
    private permissionsService: PermissionsService,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService) {
      this.getPageOfPermissions();
     }

  ngOnInit(): void {
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

    OnUpdate(id) {
      this.router.navigate(['/new-permission'], {queryParams: {id}});
    }

    OnDelete(id) {
      const confirm = window.confirm('Est vous sure ?');
      if (confirm === true) {
        this.permissionsService.deletePermission(id).subscribe(
          data => {
            this.getPageOfPermissions();
          }
        );
      }
    }
}
