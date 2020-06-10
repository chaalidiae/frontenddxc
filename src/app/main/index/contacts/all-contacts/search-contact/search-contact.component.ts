import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AuthenticationService} from '../../../login/shared/authentification.service';
import {Router} from '@angular/router';
import {ContactsService} from '../../shared/contacts.service';
import {Store} from '@ngrx/store';
import * as fromI18n from '../../../../../shared/lang/i18n/reducers';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-search-contact',
  templateUrl: './search-contact.component.html',
  styleUrls: ['./search-contact.component.css']
})
export class SearchContactComponent implements OnInit {

  contacts: any;
  private page = 0;
  pages: Array<number>;
  private size = 5;
  @Input() keyword1: any;
  @Input() keyword2: any;
  @Input() keyword3: any;
  @Input() property: any;
  @Input() refrechChildSubject: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private contactService: ContactsService,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
  ) {

  }
  ngOnInit(): void {
    this.doSearch();
    this.refrechChildSubject.subscribe(response => {
      if (response) {
        this.doSearch();
      }
    }, error => {
      this.router.navigateByUrl('/**');
    });

  }

  /**
   * Cette fonction permet de faire la recherche selon le nombre de mots clé.
   */
  doSearch() {
    if (this.keyword1 == null) {
      this.searchForContactsWithTwokeywords();
    } else if (this.keyword2 == null && this.keyword3 == null) {
      this.searchForContactsWithOnekeyword();
    }
  }

  /**
   * Faire la recherche avec un seul mot clé.
   */
  searchForContactsWithOnekeyword() {
    this.contactService.searchForContactsWithOnekeyword(this.keyword1, this.property, this.page, this.size)
      .subscribe(data => {
        console.log(data);
        this.contacts = data['content'];
        this.pages = new Array(data['totalPages']);
      }, error => {
        this.router.navigateByUrl('/**');
      });
  }

  /**
   * Faire la recherche avec deux mots clé.
   */
  searchForContactsWithTwokeywords() {
    this.contactService.searchForContactsWithTwokeywords(this.keyword2, this.keyword3, this.property, this.page, this.size)
      .subscribe(data => {
        console.log(data);
        this.contacts = data['content'];
        this.pages = new Array(data['totalPages']);
      }, error => {
        this.router.navigateByUrl('/**');
      });
  }

  /**
   * supression d'un contact.
   * @param id
   * @constructor
   */
  OnDelete(id) {
    const confirm = window.confirm('Est vous sure ?');
    if (confirm === true) {
      this.contactService.deleteContact(id).subscribe(
        data => {
          this.doSearch();
        }
      );
    }
  }

  /**
   * Mise a jour d'un contact.
   * @param id
   * @constructor
   */
  OnUpdate(id) {
    this.router.navigate(['/new-contact'], {queryParams: {id}});
  }
  /*
  Les fonctions ci-dessous permet de faire la pagination.
   */
  selectSize(event: any) {
    event.preventDefault();
    this.size = event.target.value;
    this.page = 0;
    this.doSearch();
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.doSearch();
  }
  setPrevious(event: any) {
    event.preventDefault();
    if (this.page > 0) {
      this.page--;
      this.doSearch();
    }
  }
  setNext(event: any) {
    event.preventDefault();
    const j: number = this.pages.length - 1;
    if (this.page < j) {
      this.page++;
      this.doSearch();
    }

  }
}
