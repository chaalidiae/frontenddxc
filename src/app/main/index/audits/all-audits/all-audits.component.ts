import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/main/index/login/shared/authentification.service';
import { Router } from '@angular/router';
import { AuditsService } from 'src/app/main/index/audits/shared/audit.service';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../../../shared/lang/i18n/reducers';

@Component({
  selector: 'app-all-audits',
  templateUrl: './all-audits.component.html',
  styleUrls: ['./all-audits.component.css']
})
export class AllAuditsComponent implements OnInit {
  audits: any;
  private page :number=0;
  pages:Array<number>;
  private size: number=5;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private auditService: AuditsService,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
  ) {

  }
  ngOnInit(): void {
    this.getPageOfAudits();
  }

  /**
   * Cette fonction permet de retourner une page des audits.
   */
  getPageOfAudits() {
    this.auditService.getPageOfAudits(this.page,this.size)
      .subscribe(data => {
        console.log(data)
        this.audits = data['content'];
        this.pages=new Array(data['totalPages']);
        //this.Audits = data;
      }, error => {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      });
  }

  /**
   * L'ensemble des fonctions ci-dessous est responsable de la pagination.
   */
  selectSize(event: any){
    event.preventDefault();
    this.size = event.target.value;
    this.page = 0;
    this.getPageOfAudits();
  }

  setPage(i, event: any){
    event.preventDefault();
    this.page=i;
    this.getPageOfAudits();
  }
  setPrevious(event: any){
    event.preventDefault();
    if (this.page>0){
    this.page--;
    this.getPageOfAudits();
    }
  }
  setNext(event: any){
    event.preventDefault();
    let j: number = this.pages.length - 1;
    if (this.page < j){
      this.page++;
      this.getPageOfAudits();
    }

  }

}
