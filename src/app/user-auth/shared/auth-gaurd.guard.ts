import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthLoginService } from '../services/auth-login.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdGuard implements CanActivate {

  constructor(private authService: AuthLoginService, private router: Router, private tokenService: TokenService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLoginUrl(url);
  }

  checkLoginUrl(url: string): any {
    if(this.tokenService.getToken()) {
      return true;
    }
    this.authService.redirectUrl = url;
    this.router.navigate(['/login'])
  }
  
}
