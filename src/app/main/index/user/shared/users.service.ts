import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../../login/shared/authentification.service';
import { User } from '../../../../shared/model/user';
import {GlobalConstants} from '../../../../shared/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient, private authService: AuthenticationService) { }
  getPageOfUsers(page: number, size: number) {
    return this.http.get
    (GlobalConstants.host + '/getPageOfUsers?page=' + page + '&size=' + size);
  }

  searchForUsers(keyword: string, column: string, page: number, size: number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    (GlobalConstants.host + '/searchForUsers?page=' + page + '&size=' + size + '&keyword=' + keyword + '&column=' + column);
  }
  getUserById(id) {
    return this.http.get(GlobalConstants.host + '/users/' + id);
  }
  saveUser(user) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.post(GlobalConstants.host + '/users' , user);
    }
  updateUser(user: User) {
    return this.http.put(GlobalConstants.host + + '/users/' + user.id , user);
  }
}
