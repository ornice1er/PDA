import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class ReportTransmissionService {
url=ConfigService.toMataccueilApiUrl('');

  constructor(private http:HttpClient) { }

    getAll(type?:any){
    return this.http.get<any[]>(`${this.url}report-transmissions/?type=${type}`, );
  }
 

  store(ressource:any){
    return this.http.post<any>(`${this.url}report-transmissions`, ressource,
      );
  }

  update(id:any,ressource:any){
    ressource['_method']='patch';
    //ressource.append('_method','patch');

    return this.http.post<any>(`${this.url}report-transmissions/${id}`, ressource,   );
  }
  delete(id:any){
    return this.http.delete<any>(`${this.url}report-transmissions/${id}`,
      );
  }

  get(id:any){
    return this.http.get<any>(`${this.url}report-transmissions/${id}`,
    );
  }

}
