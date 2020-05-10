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
import { Operation } from 'src/app/shared/model/operation.enum';


@Component({
  selector: 'app-audits',
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.css']
})
export class AuditsComponent extends I18nComponent {
  audits: any;
  properties : any;
  property : any = 'id';
  operations : any;
  operation : any;
  public showOperations:boolean = false;
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
      //this.property = this.properties[0];
      this.operations =  Object.keys(Operation).filter(k => typeof Operation[k as any] === "number");
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
        this.showTwoInputs = true;
        this.showOneInput = false;
        this.showOperations = false;
      }else if(this.property == "operation"){
        this.keyword1= this.operations[0];
        this.showTwoInputs = false;
        this.showOneInput = false;
        this.showOperations = true;
      }else{
        this.keyword1=null;
        this.showTwoInputs = false;
        this.showOneInput = true;
        this.showOperations = false;
      }
  
    }
    selectOperation(event){
      event.preventDefault();
      this.keyword1 = event.target.value;
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
