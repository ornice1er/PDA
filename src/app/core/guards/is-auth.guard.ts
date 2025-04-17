import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { GlobalName } from '../utils/global-name';
import { LocalStorageService } from '../utils/local-stoarge-service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthGuard implements CanActivate {
    constructor(private  router:Router,private user_auth_service:AuthService,private local_service:LocalStorageService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.local_service.get(GlobalName.token)!=undefined && this.local_service.get(GlobalName.token)=="")
      {
        this.user_auth_service.setUserLoggedIn(true);
      }else{
        this.user_auth_service.setUserLoggedIn(false);
      }
      return true;
  }
  
}
