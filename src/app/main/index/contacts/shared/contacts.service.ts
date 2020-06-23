import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../../login/shared/authentification.service';
import {Contact} from '../../../../shared/model/contact';
import {GlobalConstants} from "../../../../shared/GlobalConstants";

@Injectable()
export class ContactsService {

constructor(private http: HttpClient, private authService: AuthenticationService) {
  }

  /**
   * Retourner une page des contacts.
   * @param page
   * @param size
   */
  getPageOfContacts(page: number, size: number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    (GlobalConstants.host + '/getPageOfContacts?page=' + page + '&size=' + size);
  }

  /**
   * Rechercher un contact avec un seul mot clé
   * @param keyword
   * @param column
   * @param page
   * @param size
   */
  searchForContactsWithOnekeyword(keyword: string, column: string, page: number, size: number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    (GlobalConstants.host + '/searchForContactsWithOnekeyword?page=' + page + '&size=' + size + '&keyword=' + keyword + '&column=' + column);
  }

  /**
   * Rechercher un contact avec deux mots clé.
   * @param keyword1
   * @param keyword2
   * @param column
   * @param page
   * @param size
   */
  searchForContactsWithTwokeywords(keyword1: string, keyword2: string, column: string, page: number, size: number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    (GlobalConstants.host + '/searchForContactsWithTwoKeywords?page='
      + page + '&size=' + size + '&keyword1=' + keyword1 + '&keyword2=' + keyword2 + '&column=' + column);
  }

  /**
   * Ajouter un contact
   * @param contact
   */
  saveContact(contact) {
  if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
  return this.http.post(GlobalConstants.host + '/contacts' , contact);
  }

  /**
   * Supprimer un contact.
   * @param id
   */
  deleteContact(id) {
  if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
  return this.http.delete(GlobalConstants.host + '/contacts/' + id);
}

  /**
   * La mise a jour d'un contact.
   * @param contact
   */
  updateContact(contact: Contact) {
  return this.http.put(GlobalConstants.host + '/contacts/' + contact.id , contact);
}

  /**
   * Récupération d'un contact en se basant sur son ID.
   * @param id
   */
  getContactById(id) {
  return this.http.get(GlobalConstants.host + '/contacts/' + id);
}
  /**
   * Récupération la list des contacts.
   */
  getContacts() {
  if (this.authService.jwtToken == null) { this.authService.LoadToken();}
  return this.http.get
  (GlobalConstants.host + '/contacts');
}
}
