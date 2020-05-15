import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/main/index/login/shared/authentification.service';
import { Router } from '@angular/router';
import { AuditsService } from 'src/app/main/index/audit/shared/audit.service';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../../../../shared/lang/i18n/reducers';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-audit',
  templateUrl: './search-audit.component.html',
  styleUrls: ['./search-audit.component.css']
})
export class SearchAuditComponent implements OnInit{
  audits: any;
  private page :number=0;
  pages:Array<number>;
  private size: number=5;
  @Input() keyword1: any;
  @Input() keyword2: any;
  @Input() keyword3: any;
  @Input() property: any;
  @Input() refrechChildSubject: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private auditService: AuditsService,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
  ) {

  }
  ngOnInit(): void {
    this.doSearch();
    this.refrechChildSubject.subscribe(response => {
      if(response){
      this.doSearch();
    }
   }, error => {
        this.router.navigateByUrl('/**');
  });

  }

  doSearch(){
    console.log("property : "+this.property);
    console.log("keyword1 : "+this.keyword1);
    console.log("keyword2 : "+this.keyword2);
    console.log("keyword3 : "+this.keyword3);
    if(this.keyword1 == null) {
      this.searchForAuditsWithTwokeywords();
    }else if(this.keyword2==null&&this.keyword3==null){
      this.searchForAuditsWithOnekeyword();
    }
  }

  searchForAuditsWithOnekeyword() {
    this.auditService.searchForAuditsWithOnekeyword(this.keyword1,this.property,this.page,this.size)
      .subscribe(data => {
        console.log(data)
        this.audits = data['content'];
        this.pages=new Array(data['totalPages']);
      }, error => {
        this.router.navigateByUrl('/**');
      });
  }

  searchForAuditsWithTwokeywords() {
    this.auditService.searchForAuditsWithTwokeywords(this.keyword2,this.keyword3,this.property,this.page,this.size)
      .subscribe(data => {
        console.log(data)
        this.audits = data['content'];
        this.pages=new Array(data['totalPages']);
      }, error => {
        this.router.navigateByUrl('/**');
      });
  }

  selectSize(event:any){
    event.preventDefault();
    this.size=event.target.value;
    this.page=0;
    this.doSearch();
  }

  setPage(i,event:any){
    event.preventDefault();
    this.page=i;
    this.doSearch();
  }
  setPrevious(event:any){
    event.preventDefault();
    if (this.page>0){
    this.page--;
    this.doSearch();
    }
  }
  setNext(event:any){
    event.preventDefault();
    let j:number=this.pages.length-1;
    if (this.page<j){
      this.page++;
      this.doSearch();
    }

  }

}
