import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../../../../shared/lang/i18n/reducers';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentification.service';
import { Router } from '@angular/router';
import { PermissionsService } from 'src/app/core/permissions.service';

@Component({
  selector: 'app-search-permission',
  templateUrl: './search-permission.component.html',
  styleUrls: ['./search-permission.component.css']
})
export class SearchPermissionComponent implements OnInit {
  permissions: any;
  private page :number=0;
  pages:Array<number>;
  private size: number=5;
  @Input() keyword: any;
  @Input() property: any;
  @Input() refrechChildSubject: Subject<boolean> = new Subject<boolean>();
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private permissionsService: PermissionsService,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.searchForPermissions();
    this.refrechChildSubject.subscribe(response => {
      if(response){
      console.log("keyword :\n"+this.keyword);
      this.searchForPermissions();
    }
    }, error => {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  });
    
  }

searchForPermissions() {
    this.permissionsService.searchForPermissions(this.keyword,this.property,this.page,this.size)
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
    this.searchForPermissions(); 
  }
  setPrevious(event:any){
    event.preventDefault();
    if (this.page>0){
    this.page--;
    this.searchForPermissions(); 
    }
  }
  setNext(event:any){
    event.preventDefault();
    let j:number=this.pages.length-1;
    if (this.page<j){
      this.page++;
      this.searchForPermissions(); 
    } 
  }

  selectSize(event:any){
    event.preventDefault();
    this.size=event.target.value;
    this.page=0;
    this.searchForPermissions(); 
    }

}
