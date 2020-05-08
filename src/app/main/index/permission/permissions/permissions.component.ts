import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../core/authentification.service';
import {Router} from '@angular/router';
import {PermissionsService} from '../../../../core/permissions.service';
import { I18nComponent } from 'src/app/shared/lang/i18n/container/i18n.component';
import * as fromI18n from '../../../../shared/lang/i18n/reducers';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { Permission } from 'src/app/shared/model/permission';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent extends I18nComponent implements OnInit {

  permissions: any;
  properties : any;
  property : any;
  keyword: any;
  refrechChildSubject: Subject<boolean> = new Subject<boolean>();
  allPermissions:boolean=true;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private permissionsService: PermissionsService,
              readonly store: Store<fromI18n.State>,
              readonly translate: TranslateService
    ) { 
      super(store, translate);
      let permission : Permission =new Permission();
      this.properties = Object.getOwnPropertyNames(permission);
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
  this.allPermissions=false;
  this.refrechChild();

}
}
