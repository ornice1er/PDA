import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { ConfigService } from '../utils/config-service';

@Injectable({
    providedIn: 'root'
})
export class IpServiceService  {

    constructor(private http:HttpClient) { }
    
    getIPAddress() {
           
        return this.http.get(ConfigService.toApiUrl('ip'), ConfigService.httpHeader());
    }
}