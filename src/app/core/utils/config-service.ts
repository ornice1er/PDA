import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

export const ConfigService: any = {
  apiVersion: environment.API_VERSION,
  apiScheme: environment.API_SCHEME,
  apiFile: environment.API_FILE,
  apiDomain: environment.API_DOMAIN,
  apiMataccueilDomain: environment.API_MATACCUEIL_DOMAIN,
  apiEServiceDomain: environment.API_ESERVICE_DOMAIN,
  apiMatFile: environment.API_MATACCUEIL_FILE,
  toApiUrl(path: any) {
    return `${this.apiScheme}://${this.apiDomain}/${path}`;
  },
  toMataccueilApiUrl(path: any) {
    return `${this.apiScheme}://${this.apiMataccueilDomain}/${path}`;
  },
  toEServiceApiUrl(path: any) {
    return `${this.apiScheme}://${this.apiEServiceDomain}/${path}`;
  },
  toFile(path: any) {
    return `${this.apiScheme}://${this.apiFile}/${path}`;
  },
  toMatFile(path: any) {
    return `${this.apiScheme}://${this.apiMatFile}/${path}`;
  },
  getOrigin() {
    return `${this.apiScheme}://${this.apiFile}`;
  },
  httpHeader(token = null, isJson = true) {
    if (token != null) {
      return {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
        }),
      };
    }
    return {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      }),
    };
  },
  addAction(action: string) {
    return { headers: new HttpHeaders({ action: action }) };
  },
  toWsUrl(path: any) {
    return `wss://${this.apiDomain}/${path}`;
  },
};
