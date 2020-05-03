import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { ContactsComponent } from './contact/contacts/contacts.component';
import { NewContactComponent } from './contact/new-contact/new-contact.component';
import { NewUserComponent } from './user/new-user/new-user.component';
import { UserComponent } from './user/user/user.component';
import { RolesComponent } from './role/roles/roles.component';
import { NewRoleComponent } from './role/new-role/new-role.component';
import { PermissionsComponent } from './permission/permissions/permissions.component';
import { NewPermissionComponent } from './permission/new-permission/new-permission.component';
import { AuditsComponent } from './audit/audits/audits.component';
import { I18nModule } from 'src/app/shared/lang/i18n/i18n.module';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IndexComponent } from './index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FooterModule } from 'src/app/shared/layout/footer/footer.module';
import { NavBarModule } from 'src/app/shared/layout/nav-bar/nav-bar.module';
import { IndexRoutingModule } from './index-routing.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../assets/i18n/', '/login.json');
}

@NgModule({
  declarations: [IndexComponent],
  imports: [
    IndexRoutingModule,
    FooterModule,
    NavBarModule,
    SharedModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule
  ],exports:[
    IndexComponent
  ]
})
export class IndexModule { }
