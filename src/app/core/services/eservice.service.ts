import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../utils/config-service';
import { LocalStorageService } from '../utils/local-stoarge-service';
import { GlobalName } from '../utils/global-name';

@Injectable({
  providedIn: 'root'
})
export class EserviceService {

  constructor(private http: HttpClient,private local_service:LocalStorageService) {
    
  }

  store(resource:any){
    return this.http.post<any[]>(`${ConfigService.toBoApiUrl()}/eservice`,resource, ConfigService.httpHeader(this.local_service.get("mataccueilToken"),true));
  }

  getStatus(code:any){
    return this.http.get<any[]>(`${ConfigService.toBoApiUrl()}/eservice-status/${code}`, ConfigService.httpHeader(this.local_service.get("mataccueilToken"),true));
  }

  getDetailsByToken(token:any){
    return this.http.get<any[]>(`${ConfigService.toBoApiUrl()}/eservice-details-by-token/${token}`, ConfigService.httpHeader(this.local_service.get("mataccueilToken"),true));
  }
  setProof(resource:any){
    return this.http.post<any[]>(`${ConfigService.toBoApiUrl()}/eservice-set-proof`,resource, ConfigService.httpHeader(this.local_service.get("mataccueilToken"),true));
  }

  getEntrepriseDetails(code:any){
    return this.http.get<any[]>(`${ConfigService.toBoApiUrl()}/eservice-entreprise-details/${code}`, ConfigService.httpHeader(this.local_service.get("mataccueilToken"),true));
  }

  getAllDepart(){
    return this.http.get<any[]>(`${ConfigService.toMatApiUrl()}/departement`, ConfigService.httpHeader(this.local_service.get("mataccueilToken"),true));
  }

  getAllCommune(idDepar:any){
    return this.http.get<any[]>(`${ConfigService.toMatApiUrl()}/commune/${idDepar}`, ConfigService.httpHeader(this.local_service.get("mataccueilToken"),true));
  }
  getTypeStructures(){
    return this.http.get<any[]>(`${ConfigService.toMatApiUrl()}/typestructures`, ConfigService.httpHeader(this.local_service.get("mataccueilToken"),true));
  }
  getNatureContracts(){
    return this.http.get<any[]>(`${ConfigService.toMatApiUrl()}/naturecontracts`, ConfigService.httpHeader(this.local_service.get("mataccueilToken"),true));
  }
  get(code:any,slug:any,prestation_code?:any): Observable<any> {
    return this.http.get<any>(`${ConfigService.toBoApiUrl()}/requete/get-one-correction/${code}/${slug}?prestation_code=${prestation_code}`, ConfigService.httpHeader(this.local_service.get(GlobalName.token)));
  }
}
