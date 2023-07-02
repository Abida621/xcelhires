import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginDetails } from '../shared/credential';
import { environmentPath } from '../shared/environment';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  redirectUrl = ''
  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) { }

  loginTokenAccess(username: string, password: string): Observable<any> | undefined {
    if (username == loginDetails.username && password == loginDetails.password) {
      let isUserLogIn = {
        username: username,
        password: password
      }
      sessionStorage.setItem('sessionUser', JSON.stringify(isUserLogIn))
      return this.http.post<any>(environmentPath.commonApi+'/test/auth/login', isUserLogIn)
    }
  }

  refreshToken(refreshData: any): Observable<any> {
    return this.http.get<any>(environmentPath.commonApi + `/test/auth/tokenRegenerate?token=${refreshData}`)
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }




}
