import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AuthenticationService} from '../../../login/shared/authentification.service';
import {Router} from '@angular/router';
import {PermissionsService} from '../../shared/permissions.service';
import {Store} from '@ngrx/store';
import * as fromI18n from '../../../../../shared/lang/i18n/reducers';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-search-permissions',
  templateUrl: './search-permissions.component.html',
  styleUrls: ['./search-permissions.component.css']
})
export class SearchPermissionsComponent implements OnInit {

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
      this.router.navigateByUrl('/**');
    });

  }

  searchForPermissions() {
    this.permissionsService.searchForPermissions(this.keyword,this.property,this.page,this.size)
      .subscribe(data => {
        this.permissions = data['content'];
        this.pages=new Array(data['totalPages']);
      }, error => {
        this.router.navigateByUrl('/**');
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

  OnUpdate(id) {
    this.router.navigate(['/new-permission'], {queryParams: {id}});
  }

}
