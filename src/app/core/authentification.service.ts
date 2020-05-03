import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AuthenticationService {
  private host = 'http://localhost:8080';
  public jwtToken = null;
  private roles: Array<any>;
  constructor(private http: HttpClient) {
  }

  login(user) {
    return this.http.post(this.host + '/authenticate', user, {observe : 'response'});
  }

  saveToken(jwt: string) {
    localStorage.setItem('token', jwt);
  }

  LoadToken() {
    this.jwtToken = localStorage.getItem('token');
  }
 /*
  getContacts() {
    if (this.jwtToken == null) { this.LoadToken(); }
    return this.http.get(this.host + '/contacts',{headers: new HttpHeaders({Authorization: this.jwtToken})});
  }
  */
  logout(){
    this.jwtToken = null;
    localStorage.removeItem('token');
  }

  isAdmin(){

  }
}
