import { Injectable } from '@angular/core';

const ACCESS_TOEKN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  
  getToken() {
    return sessionStorage.getItem('sessionUser');
  }
  getRefreshToken() {
    return sessionStorage.getItem(REFRESH_TOKEN);
  }
  saveToken(token: any): void {
    sessionStorage.setItem(ACCESS_TOEKN, token);
  }
  saveRefreshToken(refreshToken: any): void {
     sessionStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  removeToken(): void {
    sessionStorage.removeItem('sessionUser');
  }

  refreshRefreshToken(): void {
    sessionStorage.removeItem(REFRESH_TOKEN);
  }
}
