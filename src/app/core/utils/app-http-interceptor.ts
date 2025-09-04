import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, retry, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-stoarge-service';
import { GlobalName } from './global-name';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from './config-service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private lsService: LocalStorageService,
    private modalService: NgbModal
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    var token: any = '';
    if (req.url && req.url.includes(ConfigService.toApiUrl(''))) {
      token = this.lsService.get(GlobalName.tokenName);
    } else {
      token = this.lsService.get(GlobalName.tokenNameMat);
    }
    req = req.clone({
      url: req.url,
      setHeaders: {
        Authorization: `Bearer ${token}`,
        Accept: `application/json`,
      },
    });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          if (
            typeof ErrorEvent !== 'undefined' &&
            error.error instanceof ErrorEvent
          ) {
            console.log('Error Event');
          } else {
            console.log(`error status : ${error.status}`);
            switch (error.status) {
              case 401:
                console.log(error.url);
                console.log(ConfigService.toApiUrl(''));
                console.log(ConfigService.toMataccueilApiUrl(''));
                if (
                  error.url &&
                  error.url.includes(ConfigService.toApiUrl(''))
                ) {
                  this.lsService.remove(GlobalName.tokenName);
                  this.lsService.remove(GlobalName.refreshTokenName);
                  this.lsService.remove(GlobalName.expireIn);
                  this.lsService.remove(GlobalName.userName);
                  this.lsService.remove(GlobalName.exercice);
                  this.modalService.dismissAll();
                  this.router.navigate(['/auth/logusager']);
                } else if (
                  error.url &&
                  error.url.includes(ConfigService.toMataccueilApiUrl('')) &&
                  this.lsService.get(GlobalName.tokenNameMat) != undefined
                ) {
                  this.lsService.remove(GlobalName.tokenNameMat);
                  this.lsService.remove(GlobalName.userNameMat);
                  this.router.navigate(['/auth/logusager']);
                }

                break;
              case 403:
                break;
              case 0:
              case 400:
              case 405:
              case 406:
              case 409:
              case 500:
                break;
            }
          }
        } else {
          console.error("Une erreur non identifiée s'est produit.");
        }

        return throwError(error);
      })
    );
  }
}
