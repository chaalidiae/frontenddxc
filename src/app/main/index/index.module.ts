import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IndexComponent } from './index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { FooterModule } from 'src/app/shared/layout/footer/footer.module';
import { NavBarModule } from 'src/app/shared/layout/nav-bar/nav-bar.module';
import { IndexRoutingModule } from './index-routing.module';
import { SideBarModule } from 'src/app/shared/layout/side-bar/side-bar.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../assets/i18n/', '/login.json');
}

@NgModule({
  declarations: [IndexComponent],
  imports: [
    SideBarModule,
    IndexRoutingModule,
    FooterModule,
    NavBarModule,
    SharedModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    //AppRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule
  ],exports:[
    IndexComponent
  ]
})
export class IndexModule { }
