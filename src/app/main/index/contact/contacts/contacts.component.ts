import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../login/shared/authentification.service';
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
  properties: any;
  property: any;
  public showTwoInputs = false;
  public showOneInput = true;
  keyword1: any;
  keyword2: any;
  keyword3: any;
  refrechChildSubject: Subject<boolean> = new Subject<boolean>();

  allContacts = true;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
    ) {
      super(store, translate);
      const contact: Contact = new Contact();
      this.properties = Object.getOwnPropertyNames(contact);
      this.property = this.properties[0];
  }

  refrechChild() {
   this.refrechChildSubject.next(true);
}
  isDate(val): boolean {
      return val instanceof Date;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  onNewContact() {
    this.router.navigateByUrl('/new-contact');
  }




  selectProperty(event) {
    const contact: Contact = new Contact();
    event.preventDefault();
    this.property = event.target.value;
    if (this.isDate(contact[this.property])) {
      this.showTwoInputs = true;
      this.showOneInput = false;
      this.keyword1 = null;
    } else {
      this.showTwoInputs = false;
      this.showOneInput = true;
    }

  }

  OnSubmitOneInput() {
    this.allContacts = false;
    this.keyword2 = null;
    this.keyword3 = null;
    this.refrechChild();

  }

  OnSubmitTwoInputs() {
    this.allContacts = false;
    this.keyword1 = null;
    this.refrechChild();

  }
}
