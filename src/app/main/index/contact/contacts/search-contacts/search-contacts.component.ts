import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentification.service';
import { Router } from '@angular/router';
import { ContactsService } from 'src/app/core/contacts.service';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../../../../shared/lang/i18n/reducers';
import { Subject } from 'rxjs';
import { isNull } from 'util';

@Component({
  selector: 'app-search-contacts',
  templateUrl: './search-contacts.component.html',
  styleUrls: ['./search-contacts.component.css']
})
export class SearchContactsComponent implements OnInit{
  contacts: any;
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
    private contactService: ContactsService,
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
    /*this.authService.logout();
    this.router.navigateByUrl('/login');*/
    this.router.navigateByUrl('/**');
  });
    
  }

  doSearch(){
    if(this.keyword1 == null) {
      this.searchForContactsWithTwokeywords();
    }else if(this.keyword2==null&&this.keyword3==null){
      this.searchForContactsWithOnekeyword();
    }
  }

  searchForContactsWithOnekeyword() {
    this.contactService.searchForContactsWithOnekeyword(this.keyword1,this.property,this.page,this.size)
      .subscribe(data => {
        console.log(data)
        this.contacts = data['content'];
        this.pages=new Array(data['totalPages']);
      }, error => {
        /*this.authService.logout();
          this.router.navigateByUrl('/login');*/
          this.router.navigateByUrl('/**');
      });
  }

  searchForContactsWithTwokeywords() {
    this.contactService.searchForContactsWithTwokeywords(this.keyword2,this.keyword3,this.property,this.page,this.size)
      .subscribe(data => {
        console.log(data)
        this.contacts = data['content'];
        this.pages=new Array(data['totalPages']);
      }, error => {
        /*this.authService.logout();
          this.router.navigateByUrl('/login');*/
          this.router.navigateByUrl('/**');
      });
  }

  OnDelete(id) {
    const confirm = window.confirm('Est vous sure ?');
    if (confirm === true) {
      this.contactService.deleteContact(id).subscribe(
        data => {
          this.doSearch();
        }
      );
    }
  }

  OnUpdate(id) {
    this.router.navigate(['/new-contact'], {queryParams: {id}});
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
