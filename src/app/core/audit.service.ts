import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentification.service';

@Injectable()
export class AuditsService {
  private host = 'http://localhost:8080/audits';

constructor(private http: HttpClient, private authService: AuthenticationService) {
  }
getAudits() {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    (this.host,{headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
  }

  getPageOfAudits(page:number,size:number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    ("http://localhost:8080/getPageOfAudits?page="+page+"&size="+size,{headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
  }
  searchForAuditsWithOnekeyword(keyword:string, column:string, page:number, size:number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    ("http://localhost:8080/searchForAuditsWithOnekeyword?page="+page+"&size="+size+"&keyword="+keyword+"&column="+column,{headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
  }

  searchForAuditsWithTwokeywords(keyword1:string, keyword2:string, column:string, page:number, size:number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    ("http://localhost:8080/searchForAuditsWithTwoKeywords?page="+page+"&size="+size+"&keyword1="+keyword1+"&keyword2="+keyword2+"&column="+column,{headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
  }

}
