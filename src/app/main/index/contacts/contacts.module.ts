import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { I18nModule } from 'src/app/shared/lang/i18n/i18n.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AllContactsComponent } from './all-contacts/all-contacts.component';
import { RouterModule } from '@angular/router';
import { SearchContactComponent } from './all-contacts/search-contact/search-contact.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../../../assets/i18n/', '/contacts.json');
}

@NgModule({
  declarations: [ContactsComponent, AllContactsComponent, SearchContactComponent],
  imports: [
    RouterModule,
    CommonModule,
    ContactsRoutingModule,
    FormsModule,
    I18nModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: true
    })
  ], exports:[ContactsComponent]
})
export class ContactsModule { }
