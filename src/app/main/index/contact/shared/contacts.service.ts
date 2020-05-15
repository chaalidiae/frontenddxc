import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../../login/shared/authentification.service';
import {Contact} from '../../../../shared/model/contact';
import {GlobalConstants} from "../../../../shared/GlobalConstants";

@Injectable()
export class ContactsService {

constructor(private http: HttpClient, private authService: AuthenticationService) {
  }

getPageOfContacts(page: number, size: number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    (GlobalConstants.host + '/getPageOfContacts?page=' + page + '&size=' + size);
  }

searchForContactsWithOnekeyword(keyword: string, column: string, page: number, size: number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    (GlobalConstants.host + '/searchForContactsWithOnekeyword?page=' + page + '&size=' + size + '&keyword=' + keyword + '&column=' + column);
  }

searchForContactsWithTwokeywords(keyword1: string, keyword2: string, column: string, page: number, size: number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    (GlobalConstants.host + '/searchForContactsWithTwoKeywords?page='
      + page + '&size=' + size + '&keyword1=' + keyword1 + '&keyword2=' + keyword2 + '&column=' + column);
  }

saveContact(contact) {
  if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
  return this.http.post(GlobalConstants.host + '/contacts' , contact);
  }

deleteContact(id) {
  if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
  return this.http.delete(GlobalConstants.host + '/contacts/' + id);
}
updateContact(contact: Contact) {
  return this.http.put(GlobalConstants.host + '/contacts/' + contact.id , contact);
}

getContactById(id) {
  return this.http.get(GlobalConstants.host + '/contacts/' + id);
}
}
