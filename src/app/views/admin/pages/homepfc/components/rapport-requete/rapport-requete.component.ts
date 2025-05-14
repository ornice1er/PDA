import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../../../components/loading/loading.component';
import { StatutComponent } from '../../../../../components/statut/statut.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';
import { AppSweetAlert } from '../../../../../../core/utils/app-sweet-alert';
import { ConfigService } from '../../../../../../core/utils/config-service';
import { GlobalName } from '../../../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../../../core/utils/local-stoarge-service';
import { TitleService } from '../../../../../../core/utils/title.service';
import { ReportTransmissionService } from '../../../../../../core/services/report-transmission.service';
import { ReportService } from '../../../../../../core/services/report.service';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileService } from '../../../../../../core/services/file.service';


@Component({
  selector: 'app-rapport-requete',
    standalone: true,
       imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent,NgxExtendedPdfViewerModule,FontAwesomeModule  ],
  templateUrl: './rapport-requete.component.html',
  styleUrl: './rapport-requete.component.css'
})
export class RapportRequeteComponent {
active=1
  @ViewChild('contentRetraite') contentRetraite : any;
  @ViewChild('contentCarriere') contentCarriere : any;
  years: number[] = [];


  @ViewChild('contentPDF') contentPDF:TemplateRef<any> | undefined
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";


  loadFile(file:any){
    return ConfigService.toFile(file)
  }
  page = 1;
  pagerv = 1;
  registresReports:any[] =[]
search_text=""


  subs:Subscription | undefined
pg={
    pageSize:10,
    p:0,
    total:0
  }
  pg2={
    pageSize:10,
    p:0,
    total:0
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
  constructor(
    private user_auth_service:AuthService, 
    private  local_service:LocalStorageService,
     private  reportService:ReportService,
    private  reportTransmissionService:ReportTransmissionService,
    private router:Router,
    private modalService: NgbModal,
    private localStorageService:LocalStorageService,
    private fileService: FileService,
    private titleService: TitleService,
    private offcanvasService: NgbOffcanvas
    ) { 
    if(localStorage.getItem(GlobalName.tokenNameMat)!=undefined) this.user=this.local_service.get(GlobalName.tokenNameMat);
    const currentYear = new Date().getFullYear();
    const range = 5;

    this.years = Array.from({ length: 2 * range + 1 }, (_, i) => currentYear - range + i);
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
  searchText=""
  
  selected_data:any
  closeResult = '';
  departements:any[]=[]
  detailpiece:any[]=[]
  structures:any[]=[]
  natures:any[]=[]
  dataNT: any[] = [];
  themes:any[]=[]
  services:any[]=[]
  onglet_What = false
  mat_aff = false
  descrCarr=[]
  selected_data_note: any
  notes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  // Declaration 
  matricu_rv =""
  loading2:any =false

  ngOnInit(): void {
    this.titleService.setTitle('Rapports mensuels de visite')

    this.getReports()
  }



   checkedRegistreReport(el:any){
    this.selected_data=el
  }

 

  getReports(){
  this.loading2=true
  this.reportService.getAll().subscribe((res: any) => {
    this.registresReports=res.data 
    this.pg2.pageSize=10
    this.pg2.p=1
    this.pg2.total=res.data.length
    this.modalService.dismissAll()
    this.loading2=false
  }, (err:any) => {
    this.loading2=false
     AppSweetAlert.simpleAlert('error',"Visites", "Erreur, Verifiez que vous avez une bonne connexion internet")  })
}

storeReport(value:any){
  this.loading2=true
  this.reportService.store(value).subscribe((res: any) => {
      this.getFile(res.data)
      this.modalService.dismissAll()
      this.getReports()
    
    this.loading2=false

  }, (err:any) => {
    this.loading2=false
     AppSweetAlert.simpleAlert('error',"Visites", "Erreur, Verifiez que vous avez une bonne connexion internet")
  })
}
updateReport(value:any){
  this.loading2=true
  this.reportService.update(this.selected_data.id, value).subscribe((res: any) => {
    this.getFile(res.data)
    this.modalService.dismissAll()
    this.loading2=false
    this.getReports()
  }, (err:any) => {
    this.loading2=false
     AppSweetAlert.simpleAlert('error',"Visites", "Erreur, Verifiez que vous avez une bonne connexion internet")  })
}
deleteReport(id:any){
  let confirmed=AppSweetAlert.confirmBox('info','Suppression','Voulez vous vraiment retirer cet élément?',);
  confirmed.then((result:any)=>{
  if (result.isConfirmed) {
      this.reportService.delete(id).subscribe((res:any)=>{
          this.getReports()
      },
      (err:any)=>{
           AppSweetAlert.simpleAlert("error","Type de dossier",err.error.message)
      })
    }
    })
}

  getFile(filename:any){
    let filePath=ConfigService.toMatFile(`storage/${filename}`)
     window.open(filePath,'_blank')
    // this.fileService.getMat({
    //   path:`storage/${filename}`
    // }).subscribe((res:any) => {
    //   this.pdfSrc =res.data;
    //       this.offcanvasService.open(this.contentPDF,{  panelClass: 'details-panel', position: 'end'  });
    // });
  }

  transmit(id:any){
    this.loading2=true
    this.reportTransmissionService.store({
      report_id:id,
      sens:1
    }).subscribe((res: any) => {
      this.loading2=false
      this.getReports()
    }, (err:any) => {
      this.loading2=false
       AppSweetAlert.simpleAlert('error',"Visites", "Erreur, Verifiez que vous avez une bonne connexion internet")    })
  }
getPage(event:any){
  this.pg.p=event
}

getPage2(event:any){
  this.pg2.p=event
}

    
  show_step(id:any) {
    return this.etapes.find((e:any) => (e.id == id))
  }
  openNoteModal(content:any, el:any) {
    this.selected_data_note = el
    this.loading=false
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "lg" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  noterRequete(value:any) {
    var param = {
      codeRequete: this.selected_data_note.codeRequete,
      noteDelai: value.noteDelai,
      noteResultat: value.noteResultat,
      idEntite:this.selectedEntie,
      commentaireNotation: value.commentaireNotation,
    };
    this.loading=true
    this.user_auth_service.noterRequetePfc(param).subscribe((res: any) => {
      this.modalService.dismissAll()
      this.loadRequest()
      this.loading=false
      if(res.status=="error"){
        AppSweetAlert.simpleAlert("Erreur",res.message, 'error')
      }else{
        AppSweetAlert.simpleAlert("Appreciation", "Appreciation envoyé avec succès", 'succes');
      }
    })
  }

  openAddModal(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
  ChangerFile(file:any){
    window.location.href="https://api.mataccueil.gouv.bj/api/downloadFile?file="+file
    //window.location.href="https://preprodmtfp.gouv.bj/pprod-mataccueilapi/api/downloadFile?file="+file
    // window.location.href="http://api.mataccueil.sevmtfp.test/api/downloadFile?file="+file
    // window.location.href="http://localhost:8003/api/downloadFile?file="+file
  }

  addRequeteusager(value:any){

    let service :any= null
    if (this.link_to_prestation==1 ) {
      service = this.services.filter((e:any) => (e.id == value.idPrestation))[0]
    }else{
      service=this.services.filter((e:any) => (e.hide_for_public == 1))[0]
    }

    if (this.selected_type_preoccupation == 0) {
      AppSweetAlert.simpleAlert("Sélectionner le type de requête", "Champ obligatoire", 'error')
    }else if(!value.idEntite){
      AppSweetAlert.simpleAlert("Sélectionner la structure destinatrice", "Champ obligatoire", 'error')
    }else if(!value.contactUs){
      AppSweetAlert.simpleAlert("Renseigner le contact", "Champ obligatoire", 'error')
    }else if(this.mat_aff == true && value.matricule == ''){
      AppSweetAlert.simpleAlert("Renseigner le matricule", "Champ obligatoire", 'error')
    }else if((value.idPrestation == "" || value.idPrestation == null) && this.link_to_prestation==1){
      AppSweetAlert.simpleAlert("Sélectionner la prestation", "Champ obligatoire", 'error')
    }else if(!value.objet){
      AppSweetAlert.simpleAlert("Renseigner l'objet", "Champ obligatoire", 'error')
    }else if(!value.msgrequest){
      AppSweetAlert.simpleAlert("Renseigner le message", "Champ obligatoire", 'error')
    }else{
      let interfa = null
      let idReg = null
      let idEsWha = null
      let natur = null
      if(this.selected_data_rvMat == null){
        interfa = this.link_to_prestation == 1 ? "USAGER"  : "SRU"
        idReg = ""
        if(this.selected_data_Whats == null){
          natur = 5 //En ligne 
        }else{
          natur = 12 //WhatsApp
          idEsWha = this.selected_data_Whats.id
        }
      }else{
        interfa = "registre"
        idReg = this.selected_data_rvMat.id
      }
      var param = {
        objet: value.objet,
        contactUs: value.contactUs,
        mailPfc: this.user?.email,
        link_to_prestation:this.link_to_prestation,
        idPrestation: this.link_to_prestation==0  ? '435' : value.idPrestation, //cas d'une requete
        nbreJours: service == null ? 0 : service.nbreJours,
        msgrequest: value.msgrequest,
        idregistre : idReg,
        idEchanWhat : idEsWha,
        email:value.mailUs,
        matricule: this.mat_aff == true ? value.matricule : '',
        natureRequete:natur,
        // nom:this.user?.agent_user.nomprenoms, natureRequete
        nom:"",
        tel:'',
        idDepartement:'',
        interfaceRequete: interfa,
        idUser:this.user?.id,
        idEntite:value.idEntite,
        plainte: value.plainte,
        visible: this.visible
        // visible: 1
     };

     this.user_auth_service.createrequeteusager(param).subscribe((rest:any)=>{
      this.loadRequest()
      this.loadRequestrv()
      this.loadWhatsApp()
      this.visible=0
      this.modalService.dismissAll()
      if(rest.status=="error"){
        AppSweetAlert.simpleAlert("Erreur",rest.message, 'error')
      }else{
        if(param.visible==0){
          AppSweetAlert.simpleAlert("Ajout requête", "Requête ajoutée avec succès", 'success')
        }else{
          AppSweetAlert.simpleAlert("Ajout requête", "Requete ajouté et transmis avec succès", 'success')
        }
      }
    })     
    this.selected_data_rvMat = ''
    this.selected_data_Whats = ''
    }
  }
  addReponse(value:any){

    if (value.reponse_whats == "") {
      AppSweetAlert.simpleAlert("Renseigner la réponse à cette discusion", "Champ obligatoire", 'error')
      return;
    }else{
      let formData = new FormData()
      formData.append('reponse', value.reponse_whats)
      formData.append('fichier', this.file)

      this.user_auth_service.updateWhatsReponse(formData, this.selected_data_Whats.id).subscribe((res:any)=>{
          if(res.status=="error"){
            AppSweetAlert.simpleAlert("Erreur",res.message, 'error')
          }else{
            this.loadWhatsApp()
            AppSweetAlert.simpleAlert("Réponse d'une discussion whatsapp",  "Réponse donnée avec succès", 'success')
          }
          this.modalService.dismissAll()
      })     
      this.selected_data_rvMat = ''
      this.selected_data_Whats = ''
    }
  }
  
  saveRequeteusager(value:any) {
    let service:any = null
    if (this.link_to_prestation==1 ) {
      service = this.services.filter((e:any)=> (e.id == value.idPrestation2))[0]
    }else{
      service=this.services.filter((e:any) => (e.hide_for_public == 1))[0]
    }
    if (this.selected_type_preoccupation == 0) {
      AppSweetAlert.simpleAlert("Sélectionner le type de requête", "Champ obligatoire", 'error')
    }else if(!value.idEntite2){
      AppSweetAlert.simpleAlert("Sélectionner la structure destinatrice", "Champ obligatoire", 'error')
    }else if(!value.contactUs2){
      AppSweetAlert.simpleAlert("Renseigner le contact", "Champ obligatoire", 'error')
    }else if(this.mat_aff == true && value.matricul == ''){
      AppSweetAlert.simpleAlert("Renseigner le matricule", "Champ obligatoire", 'error')
    }else if((value.idPrestation2 == "" || value.idPrestation2 == null) && this.link_to_prestation==1){
      AppSweetAlert.simpleAlert("Sélectionner la prestation", "Champ obligatoire", 'error')
    }else if(!value.objet2){
      AppSweetAlert.simpleAlert("Renseigner l'objet", "Champ obligatoire", 'error')
    }else if(!value.msgrequest2){
      AppSweetAlert.simpleAlert("Renseigner le message", "Champ obligatoire", 'error')
    }else{
      var param = {
        objet: value.objet2,
        id: this.selected_data_req.id,
        contactUs: value.contactUs2,
        mailPfc: this.user?.email,
        link_to_prestation:this.link_to_prestation,
        idPrestation: this.link_to_prestation==0  ? '435' : value.idPrestation2, //cas d'une requete
        nbreJours: service == null ? 0 : service.nbreJours,
        msgrequest: value.msgrequest2,
        email:value.mailUs2,
        matricule: this.mat_aff == true ? value.matricul : '',
        // nom:this.user?.agent_user.nomprenoms,
        nom:"",
        tel:'',
        idDepartement:'',
        interfaceRequete: this.link_to_prestation==1 ? "USAGER"  : "SRU" ,
        idUser:this.user?.id,
        idEntite:value.idEntite2,
        plainte: value.plainte2,
        visible: this.visible
     };

     this.user_auth_service.Updaterequeteusager(param, this.selected_data_req.id).subscribe((rest:any)=>{
      this.loadRequest()
      this.visible=0
      this.modalService.dismissAll()
      if(rest.status=="error"){
        AppSweetAlert.simpleAlert("Erreur",rest.message, 'error')
      }else{
        if(param.visible==0){
          AppSweetAlert.simpleAlert("Modification requête", "Requête modifiée avec succès", 'success')
        }else{
          AppSweetAlert.simpleAlert("Modification requête", "Requete modifiée et transmis avec succès", 'success')
        }
      }
    })     

    }
  }
  
  transmettreRequete() {
    if (this.selected_data_req == null) {
      AppSweetAlert.simpleAlert("Erreur", "Veuillez selectionnez un élément puis réessayer", 'error');
      return;
    }
    if (this.selected_data_req.visible == 1) {
      AppSweetAlert.simpleAlert("Erreur", "Vous avez déjà transmis cette requête.", 'error');
      return;
    }
    var msgConfirm = "Voulez-vous transmettre la requête ?";
    var confirmResult = confirm(msgConfirm);
    if (confirmResult === false) return;

    var param = {
      idRequete: this.selected_data_req.id,
      idEntite:this.selectedEntie,
      fichier_requete: this.selected_data_req.request_file_data,
    };

    this.user_auth_service.transmettreRequeteExterne(param).subscribe((res: any) => {
      this.modalService.dismissAll()
      this.loadRequest()
      AppSweetAlert.simpleAlert("Transmission requête", "Requête transmise avec succès", 'success');
    })
  }
  addRequeteRv(value:any){
    if (value.contactMatri == "") {
      AppSweetAlert.simpleAlert("Renseigner le matricule ou le contact du visiteur", "Champ obligatoire", 'error')
    }else if(!value.plainterv){
      AppSweetAlert.simpleAlert("Sélectionner le type", "Champ obligatoire", 'error')
    }else if(value.nom_pre_rv == ""){
      AppSweetAlert.simpleAlert("Renseigner le nom et prénom (s) du visiteur", "Champ obligatoire", 'error')
    }else if(!value.idEntite){
      AppSweetAlert.simpleAlert("Sélectionner la structure destinatrice", "Champ obligatoire", 'error')
    }else if((value.preoccurv == "" || value.preoccurv == null)){
      AppSweetAlert.simpleAlert("Renseigner la préoccupation du visiteur", "Champ obligatoire", 'error')
    }else if(value.satisfaitrv == ""){
      AppSweetAlert.simpleAlert("Sélectionner une appréciation", "Champ obligatoire", 'error')
    }else if(value.satisfaitrv && value.observarv == ""){
      AppSweetAlert.simpleAlert("Renseigner l'observation", "Champ obligatoire", 'error')
    }else{
      var param = {
        contactMatri: value.contactMatri,
        plainterv: value.plainterv,
        nom_pre_rv: value.nom_pre_rv,
        idEntite:value.idEntite,
        preoccurv:value.preoccurv,
        idUser:this.user?.id,
        satisfaitrv: value.satisfaitrv,
        created_at: this.dateACloture =="" ? new Date() : new Date(this.dateACloture),
        observarv: value.observarv,
     };

     this.user_auth_service.createrequeteVisite(param).subscribe((res:any)=>{
      if(res.status=="error"){
        AppSweetAlert.simpleAlert("Erreur",res.message, 'error')
      }else{
        this.loadRequestrv()
        
        AppSweetAlert.simpleAlert("Ajout requête",  "Visite ajoutée avec succès", 'success')
      }
      this.modalService.dismissAll()
    })     
    }
  }

  addWhatsApp(value:any){
    if (value.contWhatsapp == "") {
      AppSweetAlert.simpleAlert("Renseigner le contact WhatsApp", "Champ obligatoire", 'error')
    }else if(value.discussiontxt == ""){
      AppSweetAlert.simpleAlert("Renseigner la discussion", "Champ obligatoire", 'error')
    }else{
      var param = {
        contWhatsapp: value.contWhatsapp,
        discussiontxt: value.discussiontxt,
        idUser:this.user?.id,
     };
      this.user_auth_service.createDiscussionWhats(param).subscribe((res:any)=>{
        if(res.status=="error"){
          AppSweetAlert.simpleAlert("Erreur",res.message, 'error')
        }else{
          this.loadWhatsApp()
          AppSweetAlert.simpleAlert("Ajout d'une discussion whatsapp",  "Discussions ajoutée avec succès", 'success')
        }
        this.modalService.dismissAll()
      })     

    }
  }
  addClotureRv(value:any){
    
    // if(this.file == ""){
    //   AppSweetAlert.simpleAlert("Joindre le fichier", "Champ obligatoire", 'error')
    // }else{
    
     let formData = new FormData()
     formData.append('id_user', this.user?.id)
     formData.append('date_cloture', this.dateACloture)
     formData.append('nbrvisite', value.nbrevisite)
     formData.append('fichier', this.file)
     this.user_auth_service.CloturerequeteVisite(formData).subscribe((res:any)=>{
       
      if(res.status=="error"){
        AppSweetAlert.simpleAlert("Erreur",res.message, 'error')
      }else{
        this.loadRequestrv()
        AppSweetAlert.simpleAlert("Clôture de registre", "Opération effectuée avec succès", 'success')
      }
      this.file = ""
      this.dateACloture = ""
      this.modalService.dismissAll()
    })     

    // }
  }
  UpdateRequeteRv(value:any){
    
    if (value.contactMatri == "") {
      AppSweetAlert.simpleAlert("Renseigner le matricule ou le contact du visiteur", "Champ obligatoire", 'error')
    }else if(!value.plainterv){
      AppSweetAlert.simpleAlert("Sélectionner le type", "Champ obligatoire", 'error')
    }else if(value.nom_pre_rv == ""){
      AppSweetAlert.simpleAlert("Renseigner le nom et prénom (s) du visiteur", "Champ obligatoire", 'error')
    }else if(!value.idEntite){
      AppSweetAlert.simpleAlert("Sélectionner la structure destinatrice", "Champ obligatoire", 'error')
    }else if((value.preoccurv == "" || value.preoccurv == null)){
      AppSweetAlert.simpleAlert("Renseigner la préoccupation du visiteur", "Champ obligatoire", 'error')
    }else if(value.satisfaitrv == ""){
      AppSweetAlert.simpleAlert("Sélectionner une appréciation", "Champ obligatoire", 'error')
    }else if(value.satisfaitrv && value.observarv == ""){
      AppSweetAlert.simpleAlert("Renseigner l'observation", "Champ obligatoire", 'error')
    }else{
      var param = {
        contactMatri: value.contactMatri,
        plainterv: value.plainterv,
        nom_pre_rv: value.nom_pre_rv,
        idEntite:value.idEntite,
        preoccurv:value.preoccurv,
        idUser:this.user?.id,
        satisfaitrv: value.satisfaitrv,
        observarv: value.observarv,
     };

     this.user_auth_service.updaterequeteVisite(param, this.selected_data_reqrv.id).subscribe((res:any)=>{
        if(res.status=="error"){
          AppSweetAlert.simpleAlert("Erreur",res.message, 'error')
        }else{
          this.loadRequestrv()
          AppSweetAlert.simpleAlert("Ajout requête",  "Visite ajoutée avec succès", 'success')
        }
        this.modalService.dismissAll()
    })     

    }
  }
  UpdateRequeteWhats(value:any){
    if (value.contWhatsapp == "") {
      AppSweetAlert.simpleAlert("Renseigner le contact WhatsApp", "Champ obligatoire", 'error')
    }else if(value.discussiontxt == ""){
      AppSweetAlert.simpleAlert("Renseigner la discussion", "Champ obligatoire", 'error')
    }else{
      var param = {
        contWhatsapp: value.contWhatsapp,
        discussiontxt: value.discussiontxt,
        idUser:this.user?.id,
     };
     this.user_auth_service.updateWhatsapp(param, this.selected_data_Whats.id).subscribe((res:any)=>{
          if(res.status=="error"){
            AppSweetAlert.simpleAlert("Erreur",res.message, 'error')
          }else{
            this.loadWhatsApp()
            AppSweetAlert.simpleAlert("Modification d'une discussion whatsapp",  "Discussions modifiée avec succès", 'success')
          }
          this.modalService.dismissAll()
      })     
    }
    this.selected_data_Whats = '';
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
      (res:any)=>{ },
      (err:any)=>{
          this.loading=false;
          // console.log(err:any)
         // AppSweetAlert.simpleAlert("Applications","Echec de récupération des applications","error")
        }
  )
  }

  init(page:any){
    this.selected_traiteWha = 'non'

    // console.log(this.user)
    this.loadRequest()
    this.loadRequestrv()
    this.loadWhatsApp()
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

    this.institutions=[]
    this.user_auth_service.getAllInstitu().subscribe((res: any) => {
     this.institutions = res
     })

     this.prepare(this.user?.idEntite)
  }

  file: string | Blob =""
  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }



  openEditModalCloture(content:any){
   
    if (this.dateACloture == "") {
      AppSweetAlert.simpleAlert("Erreur", "Veuillez selectionnez la date à clôturer", 'error');
      return;
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditModalVisi(content:any){

    if (this.nbreDay.length != 0 && this.dateACloture == "") {
      AppSweetAlert.simpleAlert("Erreur", "Veuillez clôturer les régistres des dates précédentes", 'error');
      return;
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditModalWhatsApp(content:any){

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditModalAdd(content:any){
    this.selected_data_Whats = null
    this.selected_data_rvMat = null
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditModal(content:any){
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditModalAddRv(content:any){
    this.selected_data_Whats = null
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditModalLg(content:any){
    if (this.selected_data_req == null) {
      AppSweetAlert.simpleAlert("Erreur", "Veuillez selectionnez un élément puis réessayer", 'error');
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
searchTextReqrv=""
searchTextWhats=""
selected_Status=""
selected_satist=""
selected_traiteWha=""

show_actions=true;
show_actionsrv=true;
show_actionsWhats=true;
selected_data_req: any
selected_data_reqrv: any
selected_data_Whats: any
selected_data_rvMat: any
selectedEntie:any=null
visible = 0
pageSize = 10;
pageSizerv = 100;
collectionSize = 0;
collectionSizerv = 0;
collectionSizeWhats = 0;
dataReq:any[]=[]
dataReqrv:any[]=[]
dataWhats:any[] = []
etapes:any[] = []
_tempReq: any[]=[];
_tempReqrv: any[]=[];
_tempWhats: any[]=[];
// pageReq = 1;
institutions:any = []
nbreDay:any = []
dateACloture = ""
errormessage = ""



searchReq() {
  this.dataReq = this._tempReq.filter(r => {
    const term = this.searchTextReq.toLowerCase();
    const stat = this.selected_Status
    return (r.objet.toLowerCase().includes(term) || r.msgrequest.toLowerCase().includes(term)) && r.traiteOuiNon == stat
  })
  this.collectionSize = this.dataReq.length
}

searchReqrv() {
  this.dataReqrv = this._tempReqrv.filter(r => {
    const term = this.searchTextReqrv.toLowerCase();
    const stat = this.selected_satist
    if(this.dateACloture == ""){
      return (r.nom_prenom.toLowerCase().includes(term) 
              || r.matri_telep.toLowerCase().includes(term) 
              || r.contenu_visite.toLowerCase().includes(term)) 
              &&  r.satisfait.toLowerCase().includes(stat)
    }else{
      return (r.nom_prenom.toLowerCase().includes(term) 
              || r.matri_telep.toLowerCase().includes(term) 
              || r.contenu_visite.toLowerCase().includes(term)) 
              &&  r.satisfait.toLowerCase().includes(stat)
              &&  r.created_at.includes(this.dateACloture)
    }
  })
  this.collectionSizerv = this.dataReqrv?.length
}

searchWhats() {
  this.dataWhats = this._tempWhats.filter(r => {
    const term = this.searchTextWhats.toLowerCase();
    const trai = this.selected_traiteWha
      return (r.numerowhatsapp.toLowerCase().includes(term) 
              || r.discussions.toLowerCase().includes(term)) 
  })
  // const term = this.searchTextWhats.toLowerCase();
  // this.user_auth_service.getAllForWhatsapp(1,term,this.selected_traiteWha).subscribe((res: any) => {
  //   this.dataWhats = res
  //   this._tempWhats = this.dataWhats
  //   this.collectionSizeWhats = this.dataWhats?.length
  // })
  this.collectionSizeWhats = this.dataWhats?.length
}

dropRequeteusager() {
  if (this.selected_data_req == null) {
    AppSweetAlert.simpleAlert("Erreur", "Veuillez selectionnez un élément puis réessayer", 'error');
    return;
  }
  if (this.selected_data_req.visible == 1) {
    AppSweetAlert.simpleAlert("Erreur", "Vous ne pouvez plus supprimer cette requête. Elle est déjà en cours de traitement.", 'error');
    return;
  }
  AppSweetAlert.confirmBox("Suppression requete",
    "Cette action est irreversible. Voulez-vous continuer ?")
    
    .then((result:any) => {
      if (result.value) {
        this.user_auth_service.deleteReq(this.selected_data_req.id).subscribe((res: any) => {
          this.loadRequest()
          AppSweetAlert.simpleAlert("Suppression requete", "Suppression effectuée avec succès", 'success')
        }, (err:any) => {
          AppSweetAlert.simpleAlert("Suppression requete", "Erreur, Verifiez que vous avez une bonne connexion internet", 'error')
        })
      }
    })
}

loadRequest() {
  this._tempReq = []
  this.dataReq = []
  // this.dataNTreq = []
  this.user_auth_service.getAllForPfcom(this.user?.id, 1).subscribe((res: any) => {
      this.dataReq = res.data
      this._tempReq = this.dataReq
      this.collectionSize = this.dataReq.length
    })
    this.ChechEtape();
}

loadRequestrv() {
  // console.log(this.user)
  this._tempReqrv = []
  this.dataReqrv = []
  this.user_auth_service.getAllForRegistreVis(this.user?.id, 1).subscribe((res: any) => {
      this.dataReqrv = res.data
      this._tempReqrv = this.dataReqrv
      this.collectionSizerv = this.dataReqrv?.length
    })
    // this.ChechEtape();
 
    this.nbreDay=[]
    this.user_auth_service.getListDay(this.user?.id).subscribe((res: any) => {
      res.forEach((element:any) => {
        let date= new Date(element);
        let dayOfWeek =date.getDay();

        if (dayOfWeek!=6 && dayOfWeek!=0) {
          this.nbreDay.push(element)
        }
      });
     this.gotoHashtag('nav-tabs')
     })
    }
    
    gotoHashtag(fragment: string) {
      
      if(this.nbreDay.length != 0){
        AppSweetAlert.simpleAlert('info',"Vous aviez "+this.nbreDay.length+" date(s) non cloturée(s).")
        setTimeout(function () {
            const element: any = document.querySelector("." + fragment);
            if (element) {
                element.scrollIntoView();
                
            }
        })
      }
    }

loadWhatsApp() {
  // console.log(this.user)
  this._tempWhats = []
  this.dataWhats = []
  this.user_auth_service.getAllForWhatsapp(1,this.selected_traiteWha).subscribe((res: any) => {
      this.dataWhats = res
      this._tempWhats = this.dataWhats
      this.collectionSizeWhats = this.dataWhats?.length
    })
    this.searchTextWhats = ''
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
onEntiteChange(event:any){
  this.selectedEntie=+event.target.value
  this.prepare(this.selectedEntie)
}

ChechEtape(){
  this.etapes = []
  this.user_auth_service.getAllEtap(0).subscribe((res: any) => {
    this.etapes = res.data
  })
}

setVisible() {
  this.visible = 1
}

checkedReq(event:any, el:any) {
  this.selected_data_req = el
  console.log('-----------------------')
  console.log(el)
  this.selected_type_preoccupation = el.plainte
  this.link_to_prestation = el.link_to_prestation
  if(el.visible==0){
    this.show_actions=true
  }else{
    this.show_actions=false
  }
  this.selectedEntie = el.idEntite
  
  this.user_auth_service.getAllThe(this.selected_data_req.idEntite).subscribe((res: any) => {
    this.themes = res
  })
  if(this.selected_data_req.service.type.libelle== "Formation" || this.selected_data_req.service.type.libelle == "Carrière"){
    this.mat_aff = true
  }else{
    this.mat_aff = false
  }
  // this.user_auth_service.getThema(this.selected_data_req).subscribe((res:any)=>{
  //   this.descrCarr = res.descr
  // })
  this.user_auth_service.getAllTypePrest(this.selected_data_req.service.idType).subscribe((res:any)=>{
    this.services=res
  })
}

checkedReqrv(event:any, el:any) {
  this.selected_data_reqrv = el
}

checkedWhatsap(event:any, el:any) {
  
  this.selected_data_Whats = el
}

checkedRv_Mat(event:any, el:any) {
  
  this.selected_data_rvMat = el
  this.selected_type_preoccupation = el.plainte
}


openEditModalrv(content:any) {
  this.loading=false
  if (this.selected_data_reqrv != null) {
    // this.prepare(this.selectedEntie)
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "lg" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } else {
    AppSweetAlert.simpleAlert("Erreur", "Veuillez selectionnez un élément puis réessayer", 'error')
  }
}

openEditModalWhats(content:any) {
  this.loading=false
  if (this.selected_data_Whats != null) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "lg" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } else {
    AppSweetAlert.simpleAlert("Erreur", "Veuillez selectionnez un élément puis réessayer", 'error')
  }
}

dropRequeteusagerrv() {

  if (this.selected_data_reqrv == null) {
    AppSweetAlert.simpleAlert("Erreur", "Veuillez selectionnez un élément puis réessayer", 'error');
    return;
  }else if (this.selected_data_reqrv.cloture == 1) {
    AppSweetAlert.simpleAlert("Erreur", "Impossible de supprimer ce régistre car il est déjà cloturé", 'error');
    return;
  }
  AppSweetAlert.confirmBox("Suppression cette visite",
    "Cette action est irreversible. Voulez-vous continuer ?").then((result:any) => {
      if (result.value) {
        this.user_auth_service.deleteRegistreVis(this.selected_data_reqrv.id).subscribe((res: any) => {
          this.loadRequestrv()
          AppSweetAlert.simpleAlert("Suppression visite", "Suppression effectuée avec succès", 'success')
        }, (err:any) => {
          AppSweetAlert.simpleAlert("Suppression visite", "Erreur, Verifiez que vous avez une bonne connexion internet", 'error')
        })
      }
    })
}

dropDiscussionWhat() {
  if (this.selected_data_Whats == null) {
    AppSweetAlert.simpleAlert("Erreur", "Veuillez selectionnez un élément puis réessayer", 'error');
    return;
  }
  AppSweetAlert.confirmBox("Suppression cette discussion", "Cette action est irreversible. Voulez-vous continuer ?").then((result:any) => {
      if (result.value){
        this.user_auth_service.deleteDiscWhats(this.selected_data_Whats.id).subscribe((res: any) => {
          this.loadWhatsApp()
          AppSweetAlert.simpleAlert("Suppression discussions", "Suppression effectuée avec succès", 'success')
        }, (err:any) => {
          AppSweetAlert.simpleAlert("Suppression discussions", "Erreur, Verifiez que vous avez une bonne connexion internet", 'error')
        })
      }
    })
}

ConfirmerTraitement(el:any) {
  
  AppSweetAlert.confirmBox("Confirmer l'ajout", "Souhaitez-vous ajouter cette discussion dans mataccueil ?").then((result:any) => {
      if (result.value){
        this.user_auth_service.ConfirmerDiscWhats(this.user?.id, el.id).subscribe((res: any) => {
          if(res.status=="error"){
            AppSweetAlert.simpleAlert("Erreur",res.message, 'error')
          }else{
            this.loadWhatsApp()
            AppSweetAlert.simpleAlert("Confirmer l'ajout", "Confirmation effectuée avec succès", 'success')
          }
          
        }, (err:any) => {
          AppSweetAlert.simpleAlert("Confirmer l'ajout", "Erreur, Verifiez que vous avez une bonne connexion internet", 'error')
        })
      }
    })
}

openReportModal(content:any){
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "lg" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  openReportEditModal(content:any,el:any){
    this.selected_data=el
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "lg" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openReportShowModal(content:any,el:any){
    this.selected_data=el
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "lg" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }




}
