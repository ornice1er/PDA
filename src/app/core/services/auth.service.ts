import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';
import { GlobalName } from '../utils/global-name';
import { LocalStorageService } from '../utils/local-stoarge-service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private userLoggedIn = new Subject<boolean>();

 // url :string =ConfigService.toApiUrl("logout");
  url2 :string =ConfigService.toFile('');
  url= "https://api.mataccueil.gouv.bj/api/"


  constructor(private appLocalStorage: LocalStorageService, private http:HttpClient) { }


  getJWTToken(){
    return this.appLocalStorage.get(GlobalName.tokenName)
  }
  setJWTToken(token:any){
    return this.appLocalStorage.set(GlobalName.tokenName,token)
  }
  setJWTRefreshToken(token:any){
    return this.appLocalStorage.set(GlobalName.refreshTokenName,token)
  }

  me(){
    return this.http.get<any>(`${this.url2}api/user`,
     ConfigService.httpHeader(null,true));
  }

  // login(ressource:any){

  //   /*ressource['grant_type']=LoginParamProd.grantType;
  //   ressource['client_id']=LoginParamProd.clientId;
  //   ressource['client_secret']=LoginParamProd.clientSecret;
  //   ressource['scope']=LoginParamProd.scope;*/

  //   return this.http.post<any>(`${this.url2}api/login`, ressource,
  //    ConfigService.httpHeader(null,true));
  // }

  sendMail(ressource:any){
    return this.http.post<any>(`${this.url2}api/send-reset-password-link`, ressource,
     ConfigService.httpHeader(null,true));
  }


  
  // update(ressource:any){
  //   return this.http.post<any>(`${this.url2}api/update-profile`, ressource,ConfigService.addAction('edit'));
  // }

  recoverPassword(token:any,ressource:any){
    return this.http.post<any>(`${this.url2}api/recovery-password/${token}`, ressource,
     ConfigService.httpHeader(null,true));
  }


  // logout(){
  //   return this.http.get<any>(`${this.url}`);
  // }

  changePassword(ressource:any){

    return this.http.post<any>(`${this.url2}api/change-password`, ressource,ConfigService.addAction('edit'));
    }
    changeFirstPassword(ressource:any){

    return this.http.post<any>(`${this.url2}api/change-first-password`, ressource,
    ConfigService.httpHeader(null,true));
    }

    saveDB(){

      return this.http.get<any>(`${this.url2}api/save-db`,ConfigService.addAction('add'));
      }

      getBackups(){

        return this.http.get<any>(`${this.url2}api/backups`,ConfigService.addAction('list'));
        }





        /*************************Ancien PDA*********************************** */


            
            setUserLoggedIn(userLoggedIn: boolean) {
                this.userLoggedIn.next(userLoggedIn);
            }
        
            setUserData(data:any) {
              this.userLoggedIn.next(data);
            }
            getUserLoggedIn(): Observable<boolean> {
                return this.userLoggedIn.asObservable();
            }
        
            login(ressource: object) {
        
                return this.http.post(ConfigService.toApiUrl('oauth/token'), ressource, ConfigService.httpHeader());
            }
            // MATACCUEIL EXTERNE   this.this.appLocalStorage.setJsonValue('mataccueilUserData', res);
            // Authentication/Authorization
            loginUsager(value:any) {
                return this.http.post(`${this.url+"authusers"}`, value,{headers:ConfigService.httpHeader(null,false)});
              }
            loginpfc(value:any) {
                return this.http.post(this.url+`authpfc`, value,ConfigService.httpHeader());
            }
            noterRequetePfc(ressource:any){
              
              return this.http.post<any>(`${this.url+"noter"}`, ressource,ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
            }
            getUserByToken(token:any){
                
                return this.http.get(`${this.url+'auth/userdatamat'}?token=${token}`, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
              }
            getAll(search=null,page:any){
                
                if(search==null){
                  return this.http.get<any[]>(`${this.url+"usager"}?page=${page}`, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                }else{
                  return this.http.get<any[]>(`${this.url+"usager"}?search=${search}&page=${page}`, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                }
              }
              createUsager(ressource:any){
                return this.http.post<any>(`${this.url+"usager"}`, ressource,ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
              }
              updateUsager(ressource:any,id:any){
                return this.http.post<any>(`${this.url+"usager/"}${id}`, ressource, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
              }
              resetPasswordpfc(ressource: object){
                return this.http.post<any>(`${this.url+"reset-password"}`, ressource, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
              }
        
                getAllTypePrest(type:any){
            
                  return this.http.get<any[]>(`${this.url+"service/type"}/${type}`, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                }
              
                getThema(id:any){
                    return this.http.get<any>(`${this.url+"type/getLine/"}${id}`, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                }
                createrequeteusager(ressource:any){
                    return this.http.post<any>(`${this.url+"requeteusager"}`, ressource, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                }
                transmettreRequeteExterne(ressource:any){
                  return this.http.post<any>(`${this.url+"requeteusager/transmettre/externe"}`, ressource,ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                }
                Updaterequeteusager(ressource:any,id:any){
                    return this.http.post<any>(`${this.url+"requeteusagerpfc/"}${id}`, ressource, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                }
                createrequeteVisite(ressource:any){
                    return this.http.post<any>(`${this.url+"registre"}`, ressource, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                }
                createDiscussionWhats(ressource:any){
                    return this.http.post<any>(`${this.url+"echange"}`, ressource, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                }
                CloturerequeteVisite(ressource:any){
                    return this.http.post<any>(`${this.url+"cloturerv"}`, ressource, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                }
                updaterequeteVisite(ressource:any,id:any){
                    return this.http.post<any>(`${this.url+"registreup/"}${id}`, ressource, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                }
                updateWhatsapp(ressource:any,id:any){
                    return this.http.post<any>(`${this.url+"echangeup/"}${id}`, ressource, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                }
                updateWhatsReponse(ressource:any,id:any){
                    return this.http.post<any>(`${this.url+"echangeupreponse/"}${id}`, ressource, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                }
                deleteReq(id:number){
                    return this.http.delete<any[]>(`${this.url+"requeteusager/"}${id}`,ConfigService.httpHeader(this.appLocalStorage.get("matToken"),false));
                }
                getAllDepartement(){
                    return this.http.get<any[]>(`${this.url+"departement"}`, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                }
                
                getAllInstitu(){
                
                  return this.http.get<any[]>(`${this.url+"institution"}`, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                }
                
                getListDay(id:any){
                
                  return this.http.get<any[]>(`${this.url+"nbrDay"}/${id}`, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                }
                getAllForPfcom(idUsager:any,page:any){
           
                    return this.http.get<any[]>(`${this.url+"requetepfc/getrequetebypfc"}/${idUsager}?page=${page}`, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                  }
                getAllForRegistreVis(idUsager:any,page:any){
           
                    return this.http.get<any[]>(`${this.url+"requeteRv/getrequetebypfcRv"}/${idUsager}?page=${page}`, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                  }
                getAllForWhatsapp(page:any,traite:any){
           
                    return this.http.get<any[]>(`${this.url+"getEchangeWhat"}?page=${page}&traite=${traite}`, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                  }
                
                  deleteRegistreVis(id:number){
           
                    return this.http.delete<any[]>(`${this.url+"registre/"}${id}`, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                  }
                  deleteDiscWhats(id:number){
           
                    return this.http.delete<any[]>(`${this.url+"echange/"}${id}`, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                  }
                  ConfirmerDiscWhats(idus:any,id:any){
           
                    return this.http.get<any[]>(`${this.url+"echangeConfi/"}${idus}/${id}`, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                  }
                  getAllEtap(idEntite:any){
                    return this.http.get<any[]>(`${this.url+"etape"}/${idEntite}`, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                  }
                getServPiece(idSer:any){
           
                    return this.http.get<any[]>(`${this.url+"servicePiece"}/${idSer}`, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                  }
              getAllServ(OnlyDirection:any,idEntite:any){
        
                 return this.http.get<any[]>(`${this.url+"structure"}/${OnlyDirection}/${idEntite}`, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
              }
              getAllForUsagerNT(idUsager:any,page:any){
                return this.http.get<any[]>(`${this.url+"requeteusager/getrequetebyusagerNT"}/${idUsager}?page=${page}`, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
              }
               
                getAllNatu(idEntite:any){
                
                    return this.http.get<any[]>(`${this.url+"nature"}/${idEntite}`, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                }
                
                getAllThe(idEntite:any){
                
                    return this.http.get<any[]>(`${this.url+"type"}/${idEntite}`, ConfigService.httpHeader(this.appLocalStorage.get("matToken"),true));
                }
               
            // MATACCUEIL EXTERNE
            resend(ressource: object) {
        
                return this.http.post(ConfigService.toApiUrl('user/mail/check'), ressource, ConfigService.httpHeader());
            }
        
            verifyCode(ressource: object) {
        
                //code, user_id, ip,client_id, client_secret, username, password, authorized_always_id
        
                return this.http.post(ConfigService.toApiUrl('oauth/verifyCode'), ressource, ConfigService.httpHeader());
            }
            resendCode(ressource: object) {
        
                return this.http.post(ConfigService.toApiUrl('oauth/resendCode'), ressource, ConfigService.httpHeader());
            }
        
            register(ressource: object) {
        
                return this.http.post(ConfigService.toApiUrl('register'), ressource, ConfigService.httpHeader());
            }
        
        
            forgotPassword(ressource: object) {
        
                return this.http.post(ConfigService.toApiUrl('user/forgot-password'), ressource, ConfigService.httpHeader());
            }
        
            resetPassword(ressource: object) {
        
                return this.http.post(ConfigService.toApiUrl('user/reset-password'), ressource, ConfigService.httpHeader(this.appLocalStorage.get(GlobalName.token)));
            }
            update(ressource: object) {
        
                return this.http.post(ConfigService.toApiUrl('user/update'), ressource, ConfigService.httpHeader(this.appLocalStorage.get(GlobalName.token)));
            }
            setNotif(ressource: object) {
        
                return this.http.post(ConfigService.toApiUrl('notifications'), ressource, ConfigService.httpHeader(this.appLocalStorage.get(GlobalName.token)));
            }
        
            checkMail(ressource: object) {
        
                return this.http.post(ConfigService.toApiUrl('register'), ressource, ConfigService.httpHeader());
            }
        
            logout() {
                return this.http.post(ConfigService.toApiUrl('logout'),{}, ConfigService.httpHeader(this.appLocalStorage.get(GlobalName.token)));
            }
        
            getApps(id:number){
                return this.http.get(ConfigService.toApiUrl(`status_has_applications/${id}`), ConfigService.httpHeader(this.appLocalStorage.get(GlobalName.token)));
            }
}
