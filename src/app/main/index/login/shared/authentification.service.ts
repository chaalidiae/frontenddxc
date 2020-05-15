import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from "../../../../shared/GlobalConstants";

@Injectable()
export class AuthenticationService {
  public jwtToken = null;
  private roles: Array<any>;
  constructor(private http: HttpClient) {
  }

  login(user) {
    return this.http.post(GlobalConstants.host + '/authenticate', user, {observe : 'response'});
  }

  saveToken(jwt: string) {
    localStorage.setItem('token', jwt);
  }

  LoadToken() {
    this.jwtToken = localStorage.getItem('token');
    return localStorage.getItem('token');
  }

  logout(){
    this.jwtToken = null;
    localStorage.removeItem('token');
  }
}
