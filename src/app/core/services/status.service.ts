import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
    url = ConfigService.toApiUrl('status');
    urlI = ConfigService.toApiUrl('institution');

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get<any[]>(this.url, ConfigService.httpHeader());
    }

    getAllStruc(): Observable<any> {
        return this.http.get<any[]>(this.urlI, ConfigService.httpHeader());
    }

    getNbreServ(): Observable<any> {
        return this.http.get<any[]>(ConfigService.toApiUrl('serviceEnLign'), ConfigService.httpHeader());
    }

    store(ressource: object) {
        return this.http.post(this.url, ressource, ConfigService.httpHeader());
    }
    show(id: number) {
        return this.http.get(`${this.url}/${id}`, ConfigService.httpHeader());
    }
    update(ressource: object, id: number) {
        return this.http.put(`${this.url}/${id}`, ressource, ConfigService.httpHeader());
    }
    delete(id: number) {
        return this.http.delete(`${this.url}/${id}`, ConfigService.httpHeader());
    }
    state(id: number) {
        return this.http.get(`${this.url}/${id}/status`, ConfigService.httpHeader());
    }

    stats() {
        return this.http.get(`${ConfigService.toApiUrl('stats')}`, ConfigService.httpHeader());
    }

    

}
