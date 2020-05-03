import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../core/authentification.service';
import {Router} from '@angular/router';
import {ContactsService} from '../../../../core/contacts.service';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../../../shared/lang/i18n/reducers';
import { I18nComponent } from 'src/app/shared/lang/i18n/container/i18n.component';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent extends I18nComponent {
  contacts: any;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private contactService: ContactsService,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
    ) {
      super(store, translate);
      this.doSearch();

  }


  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  onNewContact() {
    this.router.navigateByUrl('/new-contact');
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

  OnSearch() {
    this.doSearch();
  }

  doSearch() {
    this.contactService.getContacts()
      .subscribe(data => {
        this.contacts = data;
      }, error => {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      });
  }
}
