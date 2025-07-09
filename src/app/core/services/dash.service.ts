import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';
import { GlobalName } from '../utils/global-name';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashService {
  url = ConfigService.toApiUrl('dash/');

  constructor(private http: HttpClient) {}

  getDash() {
    return this.http.get<any>(`${this.url}`, ConfigService.addAction('list'));
  }
  getDashboardPFC(month?: number, year?: number): Observable<any> {
    let params = new HttpParams();
    if (month) params = params.set('mois', month);
    if (year) params = params.set('annee', year);
    return this.http.get<any>(
      `${ConfigService.toMataccueilApiUrl('dashboard/pfc')}`,
      { params }
    );
  }
}
