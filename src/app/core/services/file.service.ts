import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';
import { GlobalName } from '../utils/global-name';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http:HttpClient) { }

  
  getBlob(filePath:any){
    return this.http.get(filePath, { responseType: 'blob' });
  }
  get(ressource:any){
    return this.http.post<any>(`${ConfigService.toApiUrl("get-file")}`, ressource,
     ConfigService.addAction('list'));
  }

   getMat(ressource:any){
    return this.http.post<any>(`${ConfigService.toMataccueilApiUrl("get-file")}`, ressource,
     ConfigService.addAction('list'));
  }
  get2(ressource:any){
    return this.http.post<any>(`${ConfigService.toApiUrl("get-file2")}`, ressource,
     ConfigService.addAction('list'));
  }
}
