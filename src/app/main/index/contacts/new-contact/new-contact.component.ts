import { Component, OnInit } from '@angular/core';
import {ContactsService} from '../shared/contacts.service';
import {Contact} from '../../../../shared/model/contact';
import {ActivatedRoute, Router} from '@angular/router';
import { I18nComponent } from 'src/app/shared/lang/i18n/container/i18n.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../../../shared/lang/i18n/reducers';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css'],
  providers: [ContactsService]
})
export class NewContactComponent extends I18nComponent{
contact: any;
id: string;
mode = 1;
  constructor(
    private contactservice: ContactsService,
    private router: Router,
    private route: ActivatedRoute,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
    ) {
      super(store, translate);
      this.contact = new Contact();
      this.route.queryParams.subscribe((params) => {
      this.id = params.id;
    });
      this.contactservice.getContactById(this.id)
      .subscribe(data => {
        if (typeof this.id === 'undefined'){
          this.mode = 1;
        } else {
          this.mode = 0;
        }
        this.contact = data;
        // HereICanAddNewDate
      }, error => console.log(error));
  }


  /**
   * Cette fonction permet de faire l'ajout ou bien la modification selon le mode.
   * @constructor
   */
  OnSubmit() {
    if (this.mode === 1) {
      this.contactservice.saveContact(this.contact).subscribe(data => console.log('contact added successfully'));
      this.router.navigate(['/contacts']);
    } else {
      this.contactservice.updateContact(this.contact).subscribe(data => console.log('contact updated successfully'));
      this.router.navigate(['/contacts']);
    }
  }
}
