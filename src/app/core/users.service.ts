import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private host = 'http://localhost:8080/users';
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getUsers() {
    if (this.authService.jwtToken == null) { this.authService.LoadToken();}
    return this.http.get
    (this.host,{headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
  }
}
