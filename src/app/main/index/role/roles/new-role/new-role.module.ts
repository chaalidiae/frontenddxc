import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRoleRoutingModule } from './new-role-routing.module';
import { NewRoleComponent } from './new-role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { I18nModule } from 'src/app/shared/lang/i18n/i18n.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../../../assets/i18n/', '/new-role.json');
}

@NgModule({
  declarations: [NewRoleComponent],
  imports: [
    CommonModule,
    NewRoleRoutingModule,
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
export class NewRoleModule { }
