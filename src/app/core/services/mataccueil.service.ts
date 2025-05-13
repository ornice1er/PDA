import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class MataccueilService {

    constructor(private http:HttpClient) { }
    
    getAllForUsagerRDV(idUsager:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('rdv/usager')}/${idUsager}`, );
    }
    
    update(ressource:any,id:any) {
           
        return this.http.post(`${ConfigService.toMataccueilApiUrl('rdv')}/${id}`,ressource, );
    }

    saveRdvStatut(ressource:any) {
           
        return this.http.post(`${ConfigService.toMataccueilApiUrl('rdv/statut')}`,ressource, );
    }

    delete(id:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('rdv')}/${id}`, );
    }
    create(ressource:any) {
           
        return this.http.post(`${ConfigService.toMataccueilApiUrl('rdv')}`,ressource, );
    }

    getAllEtape(idEntite:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('etape')}/${idEntite}`, );
    }

    getAllForUsagerNT(idUsager:any,per_page:any,page:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('requeteusager/getrequetebyusagerNT')}/${idUsager}?page=${page}&per_page=${per_page}`, );
    }
    getAllForUsager(idUsager:any,per_page:any,page:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('requeteusager/getrequetebyusager')}/${idUsager}?page=${page}&per_page=${per_page}`, );
    }
    createRequete(ressource:any) {
           
        return this.http.post(`${ConfigService.toMataccueilApiUrl('requeteusager')}`,ressource, );
    }

    updateRequete(ressource:any,id:any) {
           
        return this.http.post(`${ConfigService.toMataccueilApiUrl('requeteusager')}`,ressource, );
    }

    genPdf(ressource:any) {
           
        return this.http.post(`${ConfigService.toMataccueilApiUrl('genererpdf')}`,ressource, );
    }
    deleteRequete(id:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('requeteusager')}/${id}`, );
    }
    noterRequete(ressource:any) {
           
        return this.http.post(`${ConfigService.toMataccueilApiUrl('noter')}`,ressource, );
    }
    transmettreRequeteExterne(ressource:any) {
           
        return this.http.post(`${ConfigService.toMataccueilApiUrl('requeteusager/transmettre/externe')}`,ressource, );
    }
    getAllType(type:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('service/type')}/${type}`, );
    }

    getAllService(idEntite:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('service')}/${idEntite}`, );
    }
    getServPiece(idSer:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('servicePiece')}/${idSer}`, );
    }
    getAllStructure(OnlyDirection:any,idEntite:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('structure')}/${OnlyDirection}/${idEntite}`, );
    }
    getAllThematique(type:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('type')}/${type}`, );
    }
    getThematique(id:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('type/getLine')}/${id}`, );
    }
    getAllDepartement() {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('departement')}`, );
    }
    updateUsager(ressource:any,id:any) {
           
        return this.http.post(`${ConfigService.toMataccueilApiUrl('usager')}/${id}`,ressource, );
    }

    getToken(uuid:any) {
           
        return this.http.post(`${ConfigService.toMataccueilApiUrl('usager/get-token')}`,uuid, );
    }
    getAllCreneauRdv(idEntite:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('rdvcreneau')}/${idEntite}`, );
    }

    getAllActif(idEntite:any) {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('daterdv')}/${idEntite}`, );
    }

    getAllInsitution() {
           
        return this.http.get(`${ConfigService.toMataccueilApiUrl('institution')}`, );
    }

}
