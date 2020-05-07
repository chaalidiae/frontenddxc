import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../core/authentification.service';
import {Router} from '@angular/router';
import {UsersService} from '../../../../core/users.service';
import * as fromI18n from '../../../../shared/lang/i18n/reducers';
import { I18nComponent } from 'src/app/shared/lang/i18n/container/i18n.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends I18nComponent {
  properties : any;
  property : any;
  keyword: any;
  refrechChildSubject: Subject<boolean> = new Subject<boolean>();
  allUsers:boolean=true;
  users: any;

  constructor(
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService) 
    {
      super(store, translate);
      let user : User=new User();
      this.properties = Object.getOwnPropertyNames(user);
     }

     refrechChild(){
      this.refrechChildSubject.next(true);
   }

   selectProperty(event){
    event.preventDefault();
    this.property = event.target.value;
  }

  OnSubmitOneInput(){
    console.log("property : "+this.property + "\n");
    console.log("value : "+this.keyword + "\n");
    this.allUsers=false;
    this.refrechChild();

  }

}
