import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/main/index/login/shared/authentification.service';
import { Router } from '@angular/router';
import { UserConnectedService } from 'src/app/main/index/user-connected/shared/user-connected.service';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../../shared/lang/i18n/reducers';

@Component({
  selector: 'app-user-connected',
  templateUrl: './user-connected.component.html',
  styleUrls: ['./user-connected.component.css']
})
export class UserConnectedComponent {
  username:string;
  user:any;
  userRoles:Array<any>;
  roles :Array<any>= [];
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userConnectedService: UserConnectedService,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
  ) {

    this.userConnectedService.getAccount()
      .subscribe(data => {
        this.user = data;
        this.username = data['name'];
        this.roles = data['authorities']
                 .map(item => item.authority);
        this.roles.forEach(element => {
          console.log(element)
        });
      
      }, error => console.log('error : \n' + error));
  }

  
  


}
