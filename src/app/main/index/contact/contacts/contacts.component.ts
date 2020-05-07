import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../core/authentification.service';
import {Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../../../shared/lang/i18n/reducers';
import { I18nComponent } from 'src/app/shared/lang/i18n/container/i18n.component';
import { Contact } from 'src/app/shared/model/contact';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent extends I18nComponent {
  
  properties : any;
  property : any;
  public showTwoInputs:boolean = false;
  public showOneInput:boolean = true;
  keyword1: any;
  keyword2: any;
  keyword3: any;
  refrechChildSubject: Subject<boolean> = new Subject<boolean>();

  allContacts:boolean=true;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
    ) {
      super(store, translate);
      let contact:Contact = new Contact();
      this.properties = Object.getOwnPropertyNames(contact);
      console.log(this.properties);
  }

  refrechChild(){
   this.refrechChildSubject.next(true);
}
  isDate(val):boolean {
      return val instanceof Date;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  onNewContact() {
    this.router.navigateByUrl('/new-contact');
  }


  
  
  selectProperty(event){
    let contact:Contact = new Contact();
    event.preventDefault();
    this.property = event.target.value;
    if (this.isDate(contact[this.property])) {
      console.log(this.property +' is a date');
      this.showTwoInputs = true;
      this.showOneInput = false;
      this.keyword1=null;
    }else{
      console.log(this.property+' is not a date');
      this.showTwoInputs = false;
      this.showOneInput = true;
    }

  }

  OnSubmitOneInput(){
    console.log("property : "+this.property + "\n");
    console.log("value : "+this.keyword1 + "\n");
    this.allContacts=false;
    this.keyword2=null;
    this.keyword3=null;
    this.refrechChild();

  }

  OnSubmitTwoInputs(){
    console.log("property : "+this.property + "\n");
    console.log("values : "+this.keyword2 + "\n");
    console.log("values : "+this.keyword3 + "\n");
    this.allContacts=false;
    this.keyword1=null;
    this.refrechChild();

  }
}
