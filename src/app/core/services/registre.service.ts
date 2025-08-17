import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class RegistreService {
url=ConfigService.toMataccueilApiUrl('');

  constructor(private http: HttpClient) { }

  getAll(startDate:any,endDate:any,sex?:any){
    return this.http.get<any[]>(`${this.url}registre?startDate=${startDate}&endDate=${endDate}&sex=${sex}`);
  }

  getStats(resource:any){
    return this.http.post<any[]>(`${this.url}registres-reports-stats`,resource);
  }

  getStats2(resource:any){
    return this.http.post<any[]>(`${this.url}registres-reports-stats-comparaison`,resource);
  }

}
