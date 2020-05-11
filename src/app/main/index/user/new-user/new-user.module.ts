import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewUserRoutingModule } from './new-user-routing.module';
import { NewUserComponent } from './new-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { I18nModule } from 'src/app/shared/lang/i18n/i18n.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../../../assets/i18n/', '/new-user.json');
}

@NgModule({
  declarations: [NewUserComponent],
  imports: [
    CommonModule,
    NewUserRoutingModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    I18nModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: true
    }),
    ReactiveFormsModule
  ]
})
export class NewUserModule { }
