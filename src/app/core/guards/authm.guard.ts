import { Injectable } from '@angular/core';

import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../utils/local-stoarge-service';
import { GlobalName } from '../utils/global-name';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardm implements CanActivate {
  constructor(
    private  router:Router,
    private user_auth_service:AuthService,
    private localService:LocalStorageService
  
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.localService.get(GlobalName.tokenNameMat)==undefined || this.localService.get(GlobalName.tokenNameMat)==""){
        this.router.navigate(['/main'])
        return false;
  
        }else{
          this.user_auth_service.setUserLoggedIn(true);
          // if (this.localService.get('mataccueilUserData')!=undefined && this.localService.get('mataccueilUserData')!=null) {
          //   this.user_auth_service.setUserData(this.localStorage.getJsonValue("mataccueilUserData"));
          // }
          return true;
        }
  }

}
