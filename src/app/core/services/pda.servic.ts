import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { state } from '@angular/animations';
import { LocalStorageService } from '../utils/local-stoarge-service';

@Injectable({
  providedIn: 'root',
})
export class PdaService {
  // url = "http://localhost:8003/api";
  // url = "http://api.mataccueil.sevmtfp.test/api";
  //  url = "https://api.mataccueil.gouv.bj/api";
  // url_igsep="https://api.igsep.hebergeappli.bj/api"
  // url= "https://preprodmtfp.gouv.bj/pprod-mataccueilapi/api/"

  url = ConfigService.toMataccueilApiUrl('');
  url2 = ConfigService.toEServiceApiUrl('');

  constructor(
    private http: HttpClient,
    private lsService: LocalStorageService
  ) {}

  getEservices(): Observable<any> {
    return this.http.get<any[]>(
      `${this.url}eservices`,
      ConfigService.httpHeader()
    );
  }

  getSettings(): Observable<any> {
    return this.http.get<any[]>(
      `${this.url}settings2`,
      ConfigService.httpHeader()
    );
  }

  createrequeteusager(ressource: any) {
    return this.http.post<any>(
      `${this.url + '/requeteusager'}`,
      ressource,
      ConfigService.httpHeader(null, true)
    );
  }

  getFaqs(): Observable<any> {
    return this.http.get<any[]>(`${this.url}faq`, ConfigService.httpHeader());
  }

  getEvenementsDeclencheur(): Observable<any> {
    return this.http.get<any[]>(`${this.url}evt/1`, ConfigService.httpHeader());
  }
  getEntiteFromIGSEP(): Observable<any> {
    return this.http.get<any[]>(
      `${this.url}institution`,
      ConfigService.httpHeader()
    );
  }
  getStructures(onlyDirection: any, entite: any): Observable<any> {
    return this.http.get<any[]>(
      `${this.url}structure/${onlyDirection}${entite}`,
      ConfigService.httpHeader()
    );
  }
  getStructures_new(entite: any): Observable<any> {
    return this.http.get<any[]>(
      `${this.url}structure/${entite}`,
      ConfigService.httpHeader()
    );
  }
  getOneStructure(id: any): Observable<any> {
    return this.http.get<any[]>(
      `${this.url}structure/getLine/${id}`,
      ConfigService.httpHeader()
    );
  }
  getThematiques(): Observable<any> {
    return this.http.get<any[]>(`${this.url}type/1`);
  }
  getOneThematique(id: any): Observable<any> {
    return this.http.get<any[]>(
      `${this.url}type/getLine/${id}`,
      ConfigService.httpHeader()
    );
  }
  getPrestationsByThematique(type_id: any): Observable<any> {
    return this.http.get<any[]>(
      `${this.url}service/type/${type_id}`,
      ConfigService.httpHeader()
    );
  }
  getPrestations(): Observable<any> {
    return this.http.get<any[]>(
      `${this.url}service/1`,
      ConfigService.httpHeader()
    );
  }

  getPrestationsStat(): Observable<any> {
    return this.http.get<any>(
      `${this.url}statistiques/prestations/1`,
      ConfigService.httpHeader()
    );
  }

  getEServices(): Observable<any> {
    return this.http.get<any>(
      `${this.url2}prestation`,
      ConfigService.httpHeader()
    );
  }

   getPDC(): Observable<any> {
    return this.http.get<any>(
      `${this.url}ccsps`,
      ConfigService.httpHeader()
    );
  }

  getPrestationsByStructure(structure_id: any): Observable<any> {
    return this.http.get<any[]>(
      `${this.url}service/structure/${structure_id}`,
      ConfigService.httpHeader()
    );
  }
  getRdvCreneaux(): Observable<any> {
    return this.http.get<any[]>(
      `${this.url}rdvcreneau/1`,
      ConfigService.httpHeader()
    );
  }
  getStat(param: any, idEntite: any) {
    return this.http.post<any[]>(
      `${this.url}statistiques/prestations/${idEntite}`,
      param,
      ConfigService.httpHeader(this.lsService.get('mataccueilToken'), true)
    );
  }

  storeRDV(ressource: object) {
    return this.http.post(
      `${this.url}usagers/externe/rdv_new`,
      ressource,
      ConfigService.httpHeader()
    );
  }
  storePreoccupation(ressource: object) {
    return this.http.post(
      `${this.url}usagers/externe/requete_new`,
      ressource,
      ConfigService.httpHeader()
    );
  }
  verifyRecaptcha(token: any) {
    //  return this.http.get(`https://www.google.com/recaptcha/api/siteverify?secret=${environment.recaptcha.secret}&response=${token}`, ConfigService.httpHeader());
  }
  storeDenonciation(ressource: object) {
    return this.http.post(
      `${this.url}requeteusager`,
      ressource,
      ConfigService.httpHeader()
    );
  }
  storeDenonciation2(ressource: object) {
    return this.http.post(
      `${this.url}usagers/externe/je_denonce`,
      ressource,
      ConfigService.httpHeader()
    );
  }

  storeQuestion(ressource: object) {
    return this.http.post(
      `${this.url}question`,
      ressource,
      ConfigService.httpHeader()
    );
  }
  store(ressource: object) {
    return this.http.post(this.url, ressource, ConfigService.httpHeader());
  }
  show(id: number) {
    return this.http.get(`${this.url}${id}`, ConfigService.httpHeader());
  }
  update(ressource: object, id: number) {
    return this.http.put(
      `${this.url}${id}`,
      ressource,
      ConfigService.httpHeader()
    );
  }
  delete(id: number) {
    return this.http.delete(`${this.url}${id}`, ConfigService.httpHeader());
  }
  state(id: number) {
    return this.http.get(`${this.url}${id}status`, ConfigService.httpHeader());
  }
}
