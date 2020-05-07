import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../core/authentification.service';
import {Router} from '@angular/router';
import {AuditsService} from '../../../../core/audit.service';
import { I18nComponent } from 'src/app/shared/lang/i18n/container/i18n.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../../../shared/lang/i18n/reducers';
import { Subject } from 'rxjs';
import { Audit } from 'src/app/shared/model/audit';


@Component({
  selector: 'app-audits',
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.css']
})
export class AuditsComponent extends I18nComponent {
  audits: any;
  properties : any;
  property : any;
  public showTwoInputs:boolean = false;
  public showOneInput:boolean = true;
  keyword1: any='';
  keyword2: any= new Date();
  keyword3: any= new Date();
  refrechChildSubject: Subject<boolean> = new Subject<boolean>();

  allAudits:boolean=true;


  constructor(
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
    ) { 
      super(store, translate);
      let audit:Audit = new Audit();
      this.properties = Object.getOwnPropertyNames(audit);
      console.log(this.properties);
      
    }
    refrechChild(){
      this.refrechChildSubject.next(true);
   }
     isDate(val):boolean {
         return val instanceof Date;
     }
    selectProperty(event){
      let audit:Audit = new Audit();
      event.preventDefault();
      this.property = event.target.value;
      if (this.isDate(audit[this.property])) {
        console.log(this.property +' is a date');
        this.showTwoInputs = true;
        this.showOneInput = false;
      }else{
        console.log(this.property+' is not a date');
        this.showTwoInputs = false;
        this.showOneInput = true;
      }
  
    }
  
    OnSubmitOneInput(){
      console.log("property : "+this.property + "\n");
      console.log("value : "+this.keyword1 + "\n");
      this.allAudits=false;
      this.keyword2=null;
      this.keyword3=null;
      this.refrechChild();
  
    }
  
    OnSubmitTwoInputs(){
      console.log("property : "+this.property + "\n");
      console.log("values : "+this.keyword2 + "\n");
      console.log("values : "+this.keyword3 + "\n");
      this.allAudits=false;
      this.keyword1=null;
      this.refrechChild();
  
    }
}
