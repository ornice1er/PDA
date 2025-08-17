import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';
import { GlobalName } from '../utils/global-name';
import { LocalStorageService } from '../utils/local-stoarge-service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userLoggedIn = new Subject<boolean>();

  // url :string =ConfigService.toApiUrl("logout");
  url = ConfigService.toApiUrl('');
  url2 = ConfigService.toMataccueilApiUrl('');

  constructor(
    private appLocalStorage: LocalStorageService,
    private http: HttpClient
  ) {}

  getJWTToken() {
    return this.appLocalStorage.get(GlobalName.tokenName);
  }
  setJWTToken(token: any) {
    return this.appLocalStorage.set(GlobalName.tokenName, token);
  }
  setJWTRefreshToken(token: any) {
    return this.appLocalStorage.set(GlobalName.refreshTokenName, token);
  }

  me() {
    return this.http.get<any>(
      `${this.url2}api/user`,
      ConfigService.httpHeader(null, true)
    );
  }

  // login(ressource:any){

  //   /*ressource['grant_type']=LoginParamProd.grantType;
  //   ressource['client_id']=LoginParamProd.clientId;
  //   ressource['client_secret']=LoginParamProd.clientSecret;
  //   ressource['scope']=LoginParamProd.scope;*/

  //   return this.http.post<any>(`${this.url2}api/login`, ressource,
  //    ConfigService.httpHeader(null,true));
  // }

  sendMail(ressource: any) {
    return this.http.post<any>(
      `${this.url2}api/send-reset-password-link`,
      ressource,
      ConfigService.httpHeader(null, true)
    );
  }

  goTo(ressource: any) {
    return this.http.post<any>(
      `${this.url}go-to`,
      ressource,
      ConfigService.httpHeader(null, true)
    );
  }

  // update(ressource:any){
  //   return this.http.post<any>(`${this.url2}api/update-profile`, ressource,ConfigService.addAction('edit'));
  // }

  recoverPassword(token: any, ressource: any) {
    return this.http.post<any>(
      `${this.url2}api/recovery-password/${token}`,
      ressource,
      ConfigService.httpHeader(null, true)
    );
  }

  // logout(){
  //   return this.http.get<any>(`${this.url}`);
  // }

  changePassword(ressource: any) {
    return this.http.post<any>(
      `${this.url2}api/change-password`,
      ressource,
      ConfigService.addAction('edit')
    );
  }
  changeFirstPassword(ressource: any) {
    return this.http.post<any>(
      `${this.url2}api/change-first-password`,
      ressource,
      ConfigService.httpHeader(null, true)
    );
  }

  saveDB() {
    return this.http.get<any>(
      `${this.url2}api/save-db`,
      ConfigService.addAction('add')
    );
  }

  getBackups() {
    return this.http.get<any>(
      `${this.url2}api/backups`,
      ConfigService.addAction('list')
    );
  }

  /*************************Ancien PDA*********************************** */

  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }

  setUserData(data: any) {
    this.userLoggedIn.next(data);
  }
  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

  login(ressource: object) {
    return this.http.post(
      ConfigService.toApiUrl('login'),
      ressource,
      ConfigService.httpHeader()
    );
  }
  // MATACCUEIL EXTERNE   this.this.appLocalStorage.setJsonValue('mataccueilUserData', res);
  // Authentication/Authorization
  loginUsager(value: any) {
    return this.http.post(`${this.url2 + 'authusers'}`, value, {
      headers: ConfigService.httpHeader(null, false),
    });
  }
  loginpfc(value: any) {
    return this.http.post(
      this.url2 + `authpfc`,
      value,
      ConfigService.httpHeader()
    );
  }
  noterRequetePfc(ressource: any) {
    return this.http.post<any>(`${this.url2 + 'noter'}`, ressource);
  }
  getUserByToken() {
    return this.http.get(`${this.url2 + 'auth/userdatamat'}`);
  }
  getAll(search = null, page: any) {
    if (search == null) {
      return this.http.get<any[]>(`${this.url2 + 'usager'}?page=${page}`);
    } else {
      return this.http.get<any[]>(
        `${this.url2 + 'usager'}?search=${search}&page=${page}`
      );
    }
  }
  createUsager(ressource: any) {
    return this.http.post<any>(`${this.url2 + 'usager'}`, ressource);
  }
  updateUsager(ressource: any, id: any) {
    return this.http.post<any>(`${this.url2 + 'usager/'}${id}`, ressource);
  }
  resetPasswordpfc(ressource: object) {
    return this.http.post<any>(`${this.url2 + 'reset-password'}`, ressource);
  }

  getAllTypePrest(type: any) {
    return this.http.get<any[]>(`${this.url2 + 'service/type'}/${type}`);
  }

  getThema(id: any) {
    return this.http.get<any>(`${this.url2 + 'type/getLine/'}${id}`);
  }
  createrequeteusager(ressource: any) {
    return this.http.post<any>(`${this.url2 + 'requeteusager'}`, ressource);
  }
  transmettreRequeteExterne(ressource: any) {
    return this.http.post<any>(
      `${this.url2 + 'requeteusager/transmettre/externe'}`,
      ressource
    );
  }
  Updaterequeteusager(ressource: any, id: any) {
    return this.http.post<any>(
      `${this.url2 + 'requeteusagerpfc/'}${id}`,
      ressource
    );
  }
  createrequeteVisite(ressource: any) {
    return this.http.post<any>(`${this.url2 + 'registre'}`, ressource);
  }
  createDiscussionWhats(ressource: any) {
    return this.http.post<any>(`${this.url2 + 'echange'}`, ressource);
  }
  CloturerequeteVisite(ressource: any) {
    return this.http.post<any>(`${this.url2 + 'cloturerv'}`, ressource);
  }
  updaterequeteVisite(ressource: any, id: any) {
    return this.http.post<any>(`${this.url2 + 'registreup/'}${id}`, ressource);
  }
  updateWhatsapp(ressource: any, id: any) {
    return this.http.post<any>(`${this.url2 + 'echangeup/'}${id}`, ressource);
  }
  updateWhatsReponse(ressource: any, id: any) {
    return this.http.post<any>(
      `${this.url2 + 'echangeupreponse/'}${id}`,
      ressource
    );
  }
  deleteReq(id: number) {
    return this.http.delete<any[]>(
      `${this.url2 + 'requeteusager/'}${id}`,
      ConfigService.httpHeader(this.appLocalStorage.get('matToken'), false)
    );
  }
  getAllDepartement() {
    return this.http.get<any[]>(`${this.url2 + 'departement'}`);
  }

  getAllInstitu() {
    return this.http.get<any[]>(`${this.url2 + 'institution'}`);
  }

  getListDay(id: any) {
    return this.http.get<any[]>(`${this.url2 + 'nbrDay'}/${id}`);
  }
  getAllForPfcom(idUsager: any, page: any) {
    return this.http.get<any[]>(
      `${this.url2 + 'requetepfc/getrequetebypfc'}/${idUsager}?page=${page}`
    );
  }
  getAllForRegistreVis(idUsager: any, page: any) {
    return this.http.get<any[]>(
      `${this.url2 + 'requeteRv/getrequetebypfcRv'}/${idUsager}?page=${page}`
    );
  }
  getAllForWhatsapp(page: any, traite: any) {
    return this.http.get<any[]>(
      `${this.url2 + 'getEchangeWhat'}?page=${page}&traite=${traite}`
    );
  }

  deleteRegistreVis(id: number) {
    return this.http.delete<any[]>(`${this.url2 + 'registre/'}${id}`);
  }
  deleteDiscWhats(id: number) {
    return this.http.delete<any[]>(`${this.url2 + 'echange/'}${id}`);
  }
  ConfirmerDiscWhats(idus: any, id: any) {
    return this.http.get<any[]>(`${this.url2 + 'echangeConfi/'}${idus}/${id}`);
  }
  getAllEtap(idEntite: any) {
    return this.http.get<any[]>(`${this.url2 + 'etape'}/${idEntite}`);
  }
  getServPiece(idSer: any) {
    return this.http.get<any[]>(`${this.url2 + 'servicePiece'}/${idSer}`);
  }
  getAllServ(OnlyDirection: any, idEntite: any) {
    return this.http.get<any[]>(
      `${this.url2 + 'structure'}/${OnlyDirection}/${idEntite}`
    );
  }
  getAllForUsagerNT(idUsager: any, page: any) {
    return this.http.get<any[]>(
      `${
        this.url2 + 'requeteusager/getrequetebyusagerNT'
      }/${idUsager}?page=${page}`
    );
  }

  getAllNatu(idEntite: any) {
    return this.http.get<any[]>(`${this.url2 + 'nature'}/${idEntite}`);
  }

  getAllThe(idEntite: any) {
    return this.http.get<any[]>(`${this.url2 + 'type'}/${idEntite}`);
  }

  // MATACCUEIL EXTERNE
  resend(ressource: object) {
    return this.http.post(
      ConfigService.toApiUrl('user/mail/check'),
      ressource,
      ConfigService.httpHeader()
    );
  }

  verifyCode(ressource: object) {
    //code, user_id, ip,client_id, client_secret, username, password, authorized_always_id

    return this.http.post(
      ConfigService.toApiUrl('verifyCode'),
      ressource,
      ConfigService.httpHeader()
    );
  }
  resendCode(ressource: object) {
    return this.http.post(
      ConfigService.toApiUrl('resendCode'),
      ressource,
      ConfigService.httpHeader()
    );
  }

  register(ressource: object) {
    return this.http.post(
      ConfigService.toApiUrl('register'),
      ressource,
      ConfigService.httpHeader()
    );
  }

  forgotPassword(ressource: object) {
    return this.http.post(
      ConfigService.toApiUrl('user/forgot-password'),
      ressource,
      ConfigService.httpHeader()
    );
  }

  resetPassword(ressource: object) {
    return this.http.post(
      ConfigService.toApiUrl('user/reset-password'),
      ressource
    );
  }
  update(ressource: object) {
    return this.http.post(ConfigService.toApiUrl('user/update'), ressource);
  }
  setNotif(ressource: object) {
    return this.http.post(ConfigService.toApiUrl('notifications'), ressource);
  }

  checkMail(ressource: object) {
    return this.http.post(
      ConfigService.toApiUrl('register'),
      ressource,
      ConfigService.httpHeader()
    );
  }

  logout() {
    return this.http.get(ConfigService.toMataccueilApiUrl('logout'));
  }
  logout2() {
    return this.http.post(ConfigService.toApiUrl('logout'), {});
  }

  getApps(id: number) {
    return this.http.get(
      ConfigService.toApiUrl(`status_has_applications/${id}`)
    );
  }
}
