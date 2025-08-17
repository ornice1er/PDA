import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { AuthService } from '../../../../core/services/auth.service';
import { PdaService } from '../../../../core/services/pda.servic';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';

@Component({
  selector: 'app-requete',
  templateUrl: './requete.component.html',
   standalone: true,
      imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent],
  styleUrls: ['./requete.component.css']
})
export class RequeteComponent implements OnInit {
  loading:boolean=false
  link_to_prestation=1
  selected_type_preoccupation=0
  themes:any[]=[]
  services:any[]=[]
  onglet_What = false
  mat_aff = false
  is_administrative_officer=1
  selectedEntie:any=null
  errormessage=""
  selected_data_rvMat: any
  structures:any[]=[]
  natures:any[]=[]
  institutions:any[] = []
  descrCarr:any[]=[]
  detailpiece:any[]=[]
  closeResult = '';



  constructor(
    private pdaService: PdaService, 
    private user_auth_service: AuthService, 
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.institutions=[]
    this.user_auth_service.getAllInstitu().subscribe((res: any) => {
     this.institutions = res
     })
  }

  onEntiteChange(event:any){
    this.selectedEntie=+event.target.value
    this.prepare(this.selectedEntie)
  }
  
  prepare(idEntite:any){
  
    this.structures = []
    this.user_auth_service.getAllServ(1,idEntite).subscribe((res:any)=>{
      this.structures = res
    })
  
   this.natures=[]
    this.user_auth_service.getAllNatu(idEntite).subscribe((res:any)=>{
      this.natures=res
    })
  
    this.themes=[]
    this.user_auth_service.getAllThe(idEntite).subscribe((res:any)=>{
      this.themes=res
    })
  }

  addRequeteusager(value:any,form:NgForm) {
    
    let service = null
    if (this.link_to_prestation==1 || this.selected_type_preoccupation==0) {
      console.log(this.services)
      service = this.services.filter((e:any) => (e.id == value.idPrestation))[0]
    }else{
      service=this.services.filter((e:any) => (e.hide_for_public == 1))[0]
    }
    // if(service == null){
    //   AppSweetAlert.simpleAlert("error","Erreur","Aucune prestation (Service Usager) par défaut n'est lié à cet entité")
    //   return;
    // }
      var param:any = {
        objet: value.objet,
        idPrestation: this.link_to_prestation==0  ? 0: value.idPrestation,
       // idPrestation: this.link_to_prestation==0  ? service.id : value.idPrestation,
        nbreJours: service == null ? 0 : service.nbreJours,
        msgrequest: value.msgrequest,
        email: value.email,
        idEntite:this.selectedEntie,
        nom:value.lastname+" "+value.firstname,
        tel:value.phone,
        link_to_prestation:this.link_to_prestation,
        interfaceRequete: this.link_to_prestation==1 ? "USAGER"  : "SRU" ,
        plainte: value.plainte,
        matricule: this.is_administrative_officer == 1 ? value.matricule : '',
        visible: 1
      };
      // fichierJoint
        console.log('has_consent',param)
      if(param.idEntite == null || param.idEntite == ""){
        AppSweetAlert.simpleAlert("error","Erreur","Veuillez choisir une structure destrinatrice.")
      }else if(param.plainte == null || param.plainte == "0"){
        AppSweetAlert.simpleAlert("error","Erreur","Veuillez choisir un type de préoccupation.")
      }else if(this.mat_aff == true && param.matricule.trim() == ''){
        AppSweetAlert.simpleAlert("error","Renseigner le matricule", "Champ obligatoire")
      }
     /* else if(param.idPrestation == null || param.idPrestation == ""){
        AppSweetAlert.simpleAlert("error","Erreur","Veuillez choisir une prestation.")
      }*/
      else if(!param.objet){
        AppSweetAlert.simpleAlert("error","Renseigner l'objet", "Champ obligatoire")
      }else if(!param.msgrequest){
        AppSweetAlert.simpleAlert("error","Renseigner le message", "Champ obligatoire")
      }else if(!value.has_consent){
        AppSweetAlert.simpleAlert("Consentement", "Veuillez donner votre consentement")
      } else{
        this.loading=true
        console.log(param)
        this.pdaService.createrequeteusager(param).subscribe((rest: any) => {
            form.resetForm()
          this.loading=false
          if(rest.status=="error"){
            AppSweetAlert.simpleAlert("error","Erreur",rest.message)
          }else{
            AppSweetAlert.simpleAlert("success","Soumission de préoccupation", "Votre préoccupation a été bien transmise aux autorités compétentes")
          }
        })
      }
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  chargerPrestation(event:any){
    this.services=[]
    this.user_auth_service.getAllTypePrest(event.target.value).subscribe((res:any)=>{
      this.services=res
    })
    
    this.user_auth_service.getThema(event.target.value).subscribe((res:any)=>{
      this.descrCarr = res.descr
      if(res.libelle== "Formation" || res.libelle == "Carrière"){
        this.mat_aff = true
      }else{
        this.mat_aff = false
      }
    })
    
  }

  
  openDetailModal(event:any,content:any){

    this.detailpiece=[]
    this.user_auth_service.getServPiece(event.target.value).subscribe((res:any)=>{
      this.detailpiece=res
    })
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}
