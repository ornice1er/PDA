import { Injectable } from '@angular/core';
import {Config} from '../../app.config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
    url = ConfigService.toApiUrl('applications');

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get<any[]>(this.url, ConfigService.httpHeader());
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
        return this.http.get(`${this.url}/${id}/applications`, ConfigService.httpHeader());
    }

}
