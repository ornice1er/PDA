import { Component, OnInit } from '@angular/core';
// import {AuthService} from '../../core/_services/auth.service';
// import {AlertNotif} from '../../alert';
// import { Usager } from '../../core/_models/usager.model';
import {NgbModal, ModalDismissReasons, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, Subscription } from 'rxjs';
// import {clientData, GlobalName} from '../../core/_utils/utils';
// import {LocalStorageService} from '../../core/_services/storage_services/local.service';
// import { Subscription } from 'rxjs';
// import { Config } from '../../app.config';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';
import { AuthService } from '../../../../core/services/auth.service';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { ConfigService } from '../../../../core/utils/config-service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';

@Component({
  selector: 'app-homepfc',
  standalone: true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent],
  templateUrl: './homepfc.component.html',
  styleUrls: ['./homepfc.component.css']
})
export class HomepfcComponent implements OnInit {

  loadFile(file:any){
    return ConfigService.toFile(file)
  }
  page = 1;
  

  subs:Subscription | undefined

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  constructor(
    private user_auth_service:AuthService, 
    private  local_service:LocalStorageService,
    private router:Router,
    private modalService: NgbModal,
    private localStorageService:LocalStorageService,
    private activatedRoute: ActivatedRoute,
    ) { 
    if(localStorage.getItem(GlobalName.current_user)!=undefined) this.user=this.local_service.get('matUserData');
  }
  loading:boolean=false
  id:any
  data:any
  user:any
  access_token:any
  _temp: any[]=[];
  
  subject = new Subject<any>();
  pager: any = {current_page: 0,
    data:[],
    last_page: 0,
    per_page: 0,
    to: 0,
    total: 0
  }
  link_to_prestation=1
  selected_type_preoccupation=0
  error=""
  searchText:any=""
  
  selected_data:any
  closeResult = '';
  departements:[]=[]
  detailpiece=[]
  structures=[]
  natures=[]
  dataNT: any[] = [];
  themes=[]
  services=[]
  descrCarr=[]

  ngOnInit(): void {
    if (localStorage.getItem('matUserData') != null) {
      this.user = this.localStorageService.get("matUserData")
    }
        console.log(this.user)
      this.activatedRoute.queryParams.subscribe((x:any) => this.init(x.page || 1));
  
      this.subject.subscribe((val) => {
       this.pager=val
       this.page=this.pager.current_page
  
       let pages=[]
       if(this.pager.last_page  <= 5){
        for (let index = 1; index <= this.pager.last_page; index++) {
          pages.push(index)
        }
       }else{
         let start=(this.page >3 ? this.page-2 : 1 )
         let end=(this.page+2 < this.pager.last_page ? this.page+2 : this.pager.last_page )
        for (let index = start; index <= end; index++) {
          pages.push(index)
        }
       }
      
       this.pager.pages=pages
    });
  }

  search(){ 
    this.data=[]
    this._temp=[]
    this.user_auth_service.getAll(this.searchText,this.page).subscribe((res:any)=>{
      // this.spinner.hide();
      // user_auth_service
      this.data=res.data
      this._temp=this.data
      this.subject.next(res);
    })
  }
  checked(event:any, el:any) {
    this.selected_data = el
    console.log(el)
    
    this.user_auth_service.getAllForUsagerNT(el.id,1).subscribe((res: any) => {
      this.dataNT = res
    })
    
  }
  openAddModal(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  createUsager(value:any){
    if(value.idDepartement == ""){
      // this.error="Les deux mot de passe doivent être identique"
      AppSweetAlert.simpleAlert("error","Nouvel ajout", "Sélectionner le département")
    }else if(value.password!=value.conf_password && value.password != ""){
      AppSweetAlert.simpleAlert("error","Nouvel ajout", "Les deux mot de passe doivent être identique")
    }else{
      this.user_auth_service.createUsager(value).subscribe((res:any)=>{
      
        this.modalService.dismissAll()
        AppSweetAlert.simpleAlert("success","Nouvel ajout","Ajout effectué avec succès" )
         this.init(this.page) 
       },(err:any)=>{
         
         if(err.error.detail!=null){    
           AppSweetAlert.simpleAlert("error","Nouvel ajout", err.error.detail)
         }else{
           AppSweetAlert.simpleAlert("error","Nouvel ajout", err.error.message)
         }
       })
    }
    
  }

  editUsager(value:any) {
    value.id=this.selected_data.id
    value.code=this.selected_data.code
    value.codeComplet=this.selected_data.codeComplet
    if(value.password!=value.conf_password){
      value.password=""
      this.error="Le  mot de passe n'a pas été pris en compte car les deux ne sont pas identique"
    }else{
      this.user_auth_service.updateUsager(value,this.selected_data.id).subscribe((res)=>{
        this.modalService.dismissAll()
        this.init(this.page)
        AppSweetAlert.simpleAlert("success","Nouvelle modification",  "Motification effectué avec succès")
      }, (err:any)=>{
        AppSweetAlert.simpleAlert("error","Nouvelle modification", err.error.message)
      })
    }
    
	}

  chargerPrestation(event:any){
    this.services=[]
    this.user_auth_service.getAllTypePrest(event.target.value,this.selectedEntie).subscribe((res:any)=>{
      this.services=res
    })
    
    this.user_auth_service.getThema(event.target.value).subscribe((res:any)=>{
      this.descrCarr = res.descr
    })
    
  }

  addRequeteusager(value:any){
    let service:any = null
    // if (this.link_to_prestation==1 || this.selected_type_preoccupation==0) {
    if (this.link_to_prestation==1) {
      service = this.services.filter((e:any) => (e.id == value.idPrestation))[0]
    }else{
      service=this.services.filter((e:any)  => (e.hide_for_public == 1))[0]
    }
    if(!value.objet){
      AppSweetAlert.simpleAlert("error","Renseigner l'objet", "Champ obligatoire")
    }else if(!value.msgrequest){
      AppSweetAlert.simpleAlert("error","Renseigner le message", "Champ obligatoire")
    }else{
      var param = {
        objet: value.objet,
        idPrestation: this.link_to_prestation==0  ? '435' : value.idPrestation, //cas d'une requete
        nbreJours: service == null ? 0 : service.nbreJours,
        msgrequest: value.msgrequest,
        email:this.selected_data.email,
        nom:this.selected_data.nom,
        tel:this.selected_data.tel,
        idDepartement:this.selected_data.idDepartement,
        interfaceRequete: this.link_to_prestation==1 ? "USAGER"  : "SRU" ,
        idUser:this.user.id,
        idEntite:this.user.idEntite,
        plainte: value.plainte,
        visible:1
     };

     this.user_auth_service.createrequeteusager(param).subscribe((rest:any)=>{
      this.modalService.dismissAll()
      AppSweetAlert.simpleAlert("success","Ajout requête",  "Requête ajoutée avec succès")
    })     

    }
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

  setNotif(){
    this.user_auth_service.setNotif({
    }).subscribe(
      (res:any)=>{
             
      },
      (err:any)=>{
          this.loading=false;
          console.log(err)
         // AppSweetAlert.simpleAlert("Applications","Echec de récupération des applications","error")
        }
  )
  }

  init(page:any){
    this.loadRequest()

    this._temp=[]
    this.data=[]
    this.user_auth_service.getAll(null,page).subscribe((res:any)=>{
      // this.spinner.hide();
      this.data=res.data
      this._temp=this.data
      this.subject.next(res);
    })
 
    this.departements=[]
    this.user_auth_service.getAllDepartement().subscribe((res:any)=>{
      this.departements=res
    })

 
    this.structures = []
    this.user_auth_service.getAllServ(1,this.user.idEntite).subscribe((res:any)=>{
      this.structures = res
    })

   this.natures=[]
    this.user_auth_service.getAllNatu(this.user.idEntite).subscribe((res:any)=>{
      this.natures=res
    })

    this.themes=[]
    this.user_auth_service.getAllThe(this.user.idEntite).subscribe((res:any)=>{
      this.themes=res
    })

  }
  
  openEditModal(content:any){
    if (this.selected_data == null) {
      AppSweetAlert.simpleAlert("error","Erreur", "Veuillez selectionnez un élément puis réessayer");
      return;
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  openEditModalLg(content:any){
    if (this.selected_data == null) {
      AppSweetAlert.simpleAlert("error","Erreur", "Veuillez selectionnez un élément puis réessayer");
      return;
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
// --------------------------------------------------------_______________________-------------- LISTE DES REQUETES 
searchTextReq=""
show_actions=true;
selected_data_req: any
selectedEntie=null
pageSize = 10;
collectionSize = 0;
dataReq:any
etapes = []
_tempReq: any[]=[];
pageReq = 1;

searchReq() {
  this.dataReq = this._temp.filter(r => {
    const term = this.searchTextReq.toLowerCase();
    return r.objet.toLowerCase().includes(term) ||
    r.msgrequest.toLowerCase().includes(term)
  })
  this.collectionSize = this.dataReq.length
}
dropRequeteusager() {
  if (this.selected_data_req == null) {
    AppSweetAlert.simpleAlert("error","Erreur", "Veuillez selectionnez un élément puis réessayer");
    return;
  }
  if (this.selected_data_req.visible == 1) {
    AppSweetAlert.simpleAlert("error","Erreur", "Vous ne pouvez plus supprimer cette requête. Elle est déjà en cours de traitement.");
    return;
  }
  AppSweetAlert.confirmBox("Suppression requete",
    "Cette action est irreversible. Voulez-vous continuer ?").then((result:any) => {
      if (result.value) {
        this.user_auth_service.deleteReq(this.selected_data_req.id).subscribe((res: any) => {
          this.loadRequest()
          AppSweetAlert.simpleAlert("success","Suppression requete", "Suppression effectuée avec succès")
        }, (err:any) => {
          AppSweetAlert.simpleAlert("error","Suppression requete", err.error.message)
        })
      }
    })
}

loadRequest() {
  this._tempReq = []
  this.dataReq = []
  // this.dataNTreq = []
  
  
  this.user_auth_service.getAllForPfcom(this.user.id
    , 1).subscribe((res: any) => {
      this.dataReq = res
      this._tempReq = this.dataReq
      this.collectionSize = this.dataReq.length
    })
    this.ChechEtape();
}

ChechEtape(){
  this.etapes = []
  this.user_auth_service.getAllEtap(0).subscribe((res: any) => {
    this.etapes = res
  })
}

checkedReq(event:any, el:any) {
  this.selected_data_req = el

  console.log('++++++++++++++++++++++++++++++++')
  console.log(this.selected_data_req)
  if(el.visible==0){
    this.show_actions=true
  }else{
    this.show_actions=false
  }
  this.selectedEntie=el.idEntite
  
  this.user_auth_service.getAllThe(this.selected_data_req.idEntite).subscribe((res: any) => {
    this.themes = res
  })
  this.user_auth_service.getThema(this.selected_data_req).subscribe((res:any)=>{
    this.descrCarr = res.descr
  })
  this.user_auth_service.getAllTypePrest(this.selected_data_req.service.idType,this.selected_data_req.idEntite).subscribe((res:any)=>{
    this.services=res
  })
}

}
