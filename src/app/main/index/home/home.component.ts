import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../../shared/lang/i18n/reducers';
import { I18nComponent } from 'src/app/shared/lang/i18n/container/i18n.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends I18nComponent {

  constructor(
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService) {
      super(store, translate);
     }

 

}
