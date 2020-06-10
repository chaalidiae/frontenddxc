import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../../login/shared/authentification.service';
import {GlobalConstants} from "../../../../shared/GlobalConstants";

@Injectable()
export class AuditsService {

constructor(private http: HttpClient, private authService: AuthenticationService) {
  }

  /**
   * Cette fonction permet de retourner une page des audits.
   * @param page
   * @param size
   */
  getPageOfAudits(page: number, size: number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    (GlobalConstants.host + '/getPageOfAudits?page=' + page + '&size=' + size);
  }

  /**
   * Cette fonction permet de faire la recherche avec un mot clé.
   * @param keyword
   * @param column
   * @param page
   * @param size
   */
  searchForAuditsWithOnekeyword(keyword: string, column: string, page: number, size: number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    (GlobalConstants.host + '/searchForAuditsWithOnekeyword?page='
      + page + '&size=' + size + '&keyword=' + keyword + '&column=' + column);
  }

  /**
   * Cette fonction permet de faire la recherche avec deux mots clé.
   * @param keyword1
   * @param keyword2
   * @param column
   * @param page
   * @param size
   */
  searchForAuditsWithTwokeywords(keyword1: string, keyword2: string, column: string, page: number, size: number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    (GlobalConstants.host + '/searchForAuditsWithTwoKeywords?page='
      + page + '&size=' + size + '&keyword1=' + keyword1 + '&keyword2=' + keyword2 + '&column=' + column);
  }

}
