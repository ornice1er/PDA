import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../utils/local-stoarge-service';

@Injectable({
  providedIn: 'root',
})
export class RegisterguardGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.localStorageService.get('is_registered') === undefined) {
      this.router.navigate(['/auth/register']);
      return false;
    } else if (this.localStorageService.get('is_mail_check') === undefined) {
      this.router.navigate(['/main']);
      return false;
    }
    return true;
  }
}
