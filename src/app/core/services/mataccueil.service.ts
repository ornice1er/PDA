import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class MataccueilService {

    constructor(private http:HttpClient) { }
    
    getAllForUsagerRDV(idUsager:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('rdv/usager')}/${idUsager}`, ConfigService.httpHeader());
    }
    
    update(ressource:any,id:any) {
           
        return this.http.post(`${ConfigService.toMataccueilApiUrl('rdv')}/${id}`,ressource, ConfigService.httpHeader());
    }

    saveRdvStatut(ressource:any) {
           
        return this.http.post(`${ConfigService.toMataccueilApiUrl('rdv/statut')}`,ressource, ConfigService.httpHeader());
    }

    delete(id:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('rdv')}/${id}`, ConfigService.httpHeader());
    }
    create(ressource:any) {
           
        return this.http.post(`${ConfigService.toMataccueilApiUrl('rdv')}`,ressource, ConfigService.httpHeader());
    }

    getAllEtape(idEntite:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('etape')}/${idEntite}`, ConfigService.httpHeader());
    }

    getAllForUsagerNT(idUsager:any,page:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('requeteusager/getrequetebyusagerNT')}/${idUsager}?page=${page}`, ConfigService.httpHeader());
    }
    getAllForUsager(idUsager:any,page:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('requeteusager/getrequetebyusager')}/${idUsager}?page=${page}`, ConfigService.httpHeader());
    }
    createRequete(ressource:any) {
           
        return this.http.post(`${ConfigService.toMataccueilApiUrl('requeteusager')}`,ressource, ConfigService.httpHeader());
    }

    updateRequete(ressource:any,id:any) {
           
        return this.http.post(`${ConfigService.toMataccueilApiUrl('requeteusager')}`,ressource, ConfigService.httpHeader());
    }

    genPdf(ressource:any) {
           
        return this.http.post(`${ConfigService.toMataccueilApiUrl('genererpdf')}`,ressource, ConfigService.httpHeader());
    }
    deleteRequete(id:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('requeteusager')}/${id}`, ConfigService.httpHeader());
    }
    noterRequete(ressource:any) {
           
        return this.http.post(`${ConfigService.toMataccueilApiUrl('noter')}`,ressource, ConfigService.httpHeader());
    }
    transmettreRequeteExterne(ressource:any) {
           
        return this.http.post(`${ConfigService.toMataccueilApiUrl('rdv/usager')}`,ressource, ConfigService.httpHeader());
    }
    getAllType(type:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('service/type')}/${type}`, ConfigService.httpHeader());
    }

    getAllService(idEntite:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('service')}/${idEntite}`, ConfigService.httpHeader());
    }
    getServPiece(idSer:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('servicePiece')}/${idSer}`, ConfigService.httpHeader());
    }
    getAllStructure(OnlyDirection:any,idEntite:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('structure')}/${OnlyDirection}/${idEntite}`, ConfigService.httpHeader());
    }
    getAllThematique(type:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('type')}/${type}`, ConfigService.httpHeader());
    }
    getThematique(id:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('type/getLine')}/${id}`, ConfigService.httpHeader());
    }
    getAllDepartement() {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('departement')}`, ConfigService.httpHeader());
    }
    updateUsager(ressource:any,id:any) {
           
        return this.http.post(`${ConfigService.toMataccueilApiUrl('usager')}/${id}`,ressource, ConfigService.httpHeader());
    }

    getToken(uuid:any) {
           
        return this.http.post(`${ConfigService.toMataccueilApiUrl('usager/get-token')}`,uuid, ConfigService.httpHeader());
    }
    getAllCreneauRdv(idEntite:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('rdvcreneau')}/${idEntite}`, ConfigService.httpHeader());
    }

    getAllActif(idEntite:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('daterdv')}/${idEntite}`, ConfigService.httpHeader());
    }

    getAllInsitution() {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('institution')}`, ConfigService.httpHeader());
    }

}
