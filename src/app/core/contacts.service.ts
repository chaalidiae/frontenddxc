import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentification.service';
import {Contact} from '../shared/model/contact';

@Injectable()
export class ContactsService {
  private host = 'http://localhost:8080/contacts';

constructor(private http: HttpClient, private authService: AuthenticationService) {
  }
getContacts() {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    (this.host,{headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
  }

getPageOfContacts(page:number,size:number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    ("http://localhost:8080/getPageOfContacts?page="+page+"&size="+size,{headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
  }

searchForContactsWithOnekeyword(keyword:string, column:string, page:number, size:number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    ("http://localhost:8080/searchForContactsWithOnekeyword?page="+page+"&size="+size+"&keyword="+keyword+"&column="+column,{headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
  }

searchForContactsWithTwokeywords(keyword1:string, keyword2:string, column:string, page:number, size:number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    ("http://localhost:8080/searchForContactsWithTwoKeywords?page="+page+"&size="+size+"&keyword1="+keyword1+"&keyword2="+keyword2+"&column="+column,{headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
  }

saveContact(contact) {
  if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
  return this.http.post(this.host , contact, {headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
  }

deleteContact(id) {
  if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
  return this.http.delete(this.host + id, {headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
}
updateContact(contact: Contact) {
  return this.http.put(this.host + '/' + contact.id , contact, {headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
}

getContactById(id) {
  return this.http.get(this.host + '/' + id, {headers: new HttpHeaders({Authorization: this.authService.jwtToken})} );
}
}
