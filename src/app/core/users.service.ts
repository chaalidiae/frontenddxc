import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentification.service';
import { User } from '../shared/model/user';

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

  getPageOfUsers(page:number,size:number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    ("http://localhost:8080/getPageOfUsers?page="+page+"&size="+size,{headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
  }

  searchForUsers(keyword:string, column:string, page:number, size:number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    ("http://localhost:8080/searchForUsers?page="+page+"&size="+size+"&keyword="+keyword+"&column="+column,{headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
  }
  getUserById(id) {
    return this.http.get(this.host + '/' + id, {headers: new HttpHeaders({Authorization: this.authService.jwtToken})} );
  }
  saveUser(user) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.post(this.host , user, {headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
    }
  updateUser(user: User) {
    return this.http.put(this.host + '/' + user.id , user, {headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
  }
}
