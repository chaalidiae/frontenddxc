import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/main/index/login/shared/authentification.service';
import { Router } from '@angular/router';
import { ContactsService } from 'src/app/main/index/contacts/shared/contacts.service';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../../../shared/lang/i18n/reducers';
import { ngModuleJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.css']
})
export class AllContactsComponent implements OnInit {
  contacts: any;
  private page :number=0;
  pages:Array<number>;
  private size: number=5;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private contactService: ContactsService,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
  ) {

  }
  ngOnInit(): void {
    this.getPageOfContacts();
  }
  getPageOfContacts() {
    this.contactService.getPageOfContacts(this.page,this.size)
      .subscribe(data => {
        this.contacts = data['content'];
        this.pages=new Array(data['totalPages']);
      }, error => {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      });
  }

  OnDelete(id) {
    const confirm = window.confirm('Est vous sure ?');
    if (confirm === true) {
      this.contactService.deleteContact(id).subscribe(
        data => {
          this.getPageOfContacts();
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
    this.getPageOfContacts();
  }

  setPage(i,event:any){
    event.preventDefault();
    this.page=i;
    this.getPageOfContacts();
  }
  setPrevious(event:any){
    event.preventDefault();
    if (this.page>0){
    this.page--;
    this.getPageOfContacts();
    }
  }
  setNext(event:any){
    event.preventDefault();
    let j:number=this.pages.length-1;
    if (this.page<j){
      this.page++;
      this.getPageOfContacts();
    }

  }

}
