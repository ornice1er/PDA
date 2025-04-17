import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Config} from "../../app.config";
import {clientData, globalName} from '../_utils/utils';
import {LocalService} from './storage_services/local.service';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private userLoggedIn = new Subject<boolean>();
    constructor(private http: HttpClient,private local_service:LocalService) { this.userLoggedIn.next(false);}

    // url = "http://localhost:8003/api/"

    // url = "http://api.mataccueil.sevmtfp.test/api/"
    //url = "https://api.mataccueil.gouv.bj/api/"
    url= "https://preprodmtfp.gouv.bj/pprod-mataccueilapi/api/"
    
    setUserLoggedIn(userLoggedIn: boolean) {
        this.userLoggedIn.next(userLoggedIn);
    }

    setUserData(data) {
      this.userLoggedIn.next(data);
    }
    getUserLoggedIn(): Observable<boolean> {
        return this.userLoggedIn.asObservable();
    }

    login(ressource: object) {

        return this.http.post(ConfigService.toApiUrl('oauth/token'), ressource, ConfigService.httpHeader());
    }
    // MATACCUEIL EXTERNE   this.localStorage.setJsonValue('mataccueilUserData', res);
    // Authentication/Authorization
    loginUsager(value) {
        return this.http.post(`${this.url+"authusers"}`, value,{headers:ConfigService.httpHeader(null,false)});
      }
    loginpfc(value) {
        return this.http.post(this.url+`authpfc`, value,ConfigService.httpHeader());
    }
    noterRequetePfc(ressource){
      
      return this.http.post<any>(`${this.url+"noter"}`, ressource,ConfigService.httpHeader(localStorage.getItem("matToken"),true));
    }
    getUserByToken(token){
        
        return this.http.get(`${this.url+'auth/userdatamat'}?token=${token}`, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
      }
    getAll(search=null,page){
        
        if(search==null){
          return this.http.get<any[]>(`${this.url+"usager"}?page=${page}`, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
        }else{
          return this.http.get<any[]>(`${this.url+"usager"}?search=${search}&page=${page}`, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
        }
      }
      createUsager(ressource){
        return this.http.post<any>(`${this.url+"usager"}`, ressource,ConfigService.httpHeader(localStorage.getItem("matToken"),true));
      }
      updateUsager(ressource,id){
        return this.http.post<any>(`${this.url+"usager/"}${id}`, ressource, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
      }
      resetPasswordpfc(ressource: object){
        return this.http.post<any>(`${this.url+"reset-password"}`, ressource, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
      }

        getAllTypePrest(type){
    
          return this.http.get<any[]>(`${this.url+"service/type"}/${type}`, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
        }
      
        getThema(id){
            return this.http.get<any>(`${this.url+"type/getLine/"}${id}`, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
        }
        createrequeteusager(ressource){
            return this.http.post<any>(`${this.url+"requeteusager"}`, ressource, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
        }
        transmettreRequeteExterne(ressource){
          return this.http.post<any>(`${this.url+"requeteusager/transmettre/externe"}`, ressource,ConfigService.httpHeader(localStorage.getItem("matToken"),true));
        }
        Updaterequeteusager(ressource,id){
            return this.http.post<any>(`${this.url+"requeteusagerpfc/"}${id}`, ressource, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
        }
        createrequeteVisite(ressource){
            return this.http.post<any>(`${this.url+"registre"}`, ressource, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
        }
        createDiscussionWhats(ressource){
            return this.http.post<any>(`${this.url+"echange"}`, ressource, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
        }
        CloturerequeteVisite(ressource){
            return this.http.post<any>(`${this.url+"cloturerv"}`, ressource, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
        }
        updaterequeteVisite(ressource,id){
            return this.http.post<any>(`${this.url+"registreup/"}${id}`, ressource, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
        }
        updateWhatsapp(ressource,id){
            return this.http.post<any>(`${this.url+"echangeup/"}${id}`, ressource, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
        }
        updateWhatsReponse(ressource,id){
            return this.http.post<any>(`${this.url+"echangeupreponse/"}${id}`, ressource, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
        }
        deleteReq(id:number){
            return this.http.delete<any[]>(`${this.url+"requeteusager/"}${id}`,ConfigService.httpHeader(localStorage.getItem("matToken"),false));
        }
        getAllDepartement(){
            return this.http.get<any[]>(`${this.url+"departement"}`, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
        }
        
        getAllInstitu(){
        
          return this.http.get<any[]>(`${this.url+"institution"}`, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
        }
        
        getListDay(id){
        
          return this.http.get<any[]>(`${this.url+"nbrDay"}/${id}`, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
        }
        getAllForPfcom(idUsager,page){
   
            return this.http.get<any[]>(`${this.url+"requetepfc/getrequetebypfc"}/${idUsager}?page=${page}`, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
          }
        getAllForRegistreVis(idUsager,page){
   
            return this.http.get<any[]>(`${this.url+"requeteRv/getrequetebypfcRv"}/${idUsager}?page=${page}`, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
          }
        getAllForWhatsapp(page, traite){
   
            return this.http.get<any[]>(`${this.url+"getEchangeWhat"}?page=${page}&traite=${traite}`, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
          }
        
          deleteRegistreVis(id:number){
   
            return this.http.delete<any[]>(`${this.url+"registre/"}${id}`, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
          }
          deleteDiscWhats(id:number){
   
            return this.http.delete<any[]>(`${this.url+"echange/"}${id}`, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
          }
          ConfirmerDiscWhats(idus, id){
   
            return this.http.get<any[]>(`${this.url+"echangeConfi/"}${idus}/${id}`, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
          }
          getAllEtap(idEntite){
            return this.http.get<any[]>(`${this.url+"etape"}/${idEntite}`, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
          }
        getServPiece(idSer){
   
            return this.http.get<any[]>(`${this.url+"servicePiece"}/${idSer}`, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
          }
      getAllServ(OnlyDirection,idEntite){

         return this.http.get<any[]>(`${this.url+"structure"}/${OnlyDirection}/${idEntite}`, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
      }
      getAllForUsagerNT(idUsager,page){
        return this.http.get<any[]>(`${this.url+"requeteusager/getrequetebyusagerNT"}/${idUsager}?page=${page}`, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
      }
       
        getAllNatu(idEntite){
        
            return this.http.get<any[]>(`${this.url+"nature"}/${idEntite}`, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
        }
        
        getAllThe(idEntite){
        
            return this.http.get<any[]>(`${this.url+"type"}/${idEntite}`, ConfigService.httpHeader(localStorage.getItem("matToken"),true));
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

        return this.http.post(ConfigService.toApiUrl('user/reset-password'), ressource, ConfigService.httpHeader(this.local_service.getItem(globalName.token)));
    }
    update(ressource: object) {

        return this.http.post(ConfigService.toApiUrl('user/update'), ressource, ConfigService.httpHeader(this.local_service.getItem(globalName.token)));
    }
    setNotif(ressource: object) {

        return this.http.post(ConfigService.toApiUrl('notifications'), ressource, ConfigService.httpHeader(this.local_service.getItem(globalName.token)));
    }

    checkMail(ressource: object) {

        return this.http.post(ConfigService.toApiUrl('register'), ressource, ConfigService.httpHeader());
    }

    logout() {
        return this.http.post(ConfigService.toApiUrl('logout'),{}, ConfigService.httpHeader(this.local_service.getItem(globalName.token)));
    }

    getApps(id:number){
        return this.http.get(ConfigService.toApiUrl(`status_has_applications/${id}`), ConfigService.httpHeader(this.local_service.getItem(globalName.token)));
    }
}
