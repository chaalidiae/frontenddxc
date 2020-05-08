import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../core/authentification.service';
import {Router} from '@angular/router';
import {RolesService} from '../../../../core/roles.service';
import { I18nComponent } from 'src/app/shared/lang/i18n/container/i18n.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../../../shared/lang/i18n/reducers';
import { Subject } from 'rxjs';
import { Role } from 'src/app/shared/model/role';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent extends I18nComponent implements OnInit {
  roles: any;
  properties : any;
  property : any;
  keyword: any;
  refrechChildSubject: Subject<boolean> = new Subject<boolean>();
  allRoles:boolean=true;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private rolesService: RolesService,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService) {
      super(store, translate);
      let role : Role =new Role();
      this.properties = Object.getOwnPropertyNames(role);
      this.property = this.properties[0];
      }

refrechChild(){
  this.refrechChildSubject.next(true);
}
  
selectProperty(event){
  event.preventDefault();
  this.property = event.target.value;
}

OnSubmitOneInput(){
  this.allRoles=false;
  this.refrechChild();

}
  
}
