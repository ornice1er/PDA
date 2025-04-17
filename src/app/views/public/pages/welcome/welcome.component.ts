import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';
import { ConfigService } from '../../../../core/utils/config-service';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApplicationService } from '../../../../core/services/application.service';
import { AuthService } from '../../../../core/services/auth.service';
import { IpServiceService } from '../../../../core/services/ip-service.service';
import { PdaService } from '../../../../core/services/pda.servic';
import { StatusService } from '../../../../core/services/status.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { clientData, GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { Subject } from 'rxjs';
import { PrestationItemComponent } from '../../../components/prestation-item/prestation-item.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent,CarouselModule,RouterModule,PrestationItemComponent ],

  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  ServiceEnligne:any;
    ServiceTotal:any;
    active = 1
    loadFile(file:any) {
        return ConfigService.toFile(file)
    }
    searchTextReq=""
searchTextReqrv=""
searchTextWhats=""
selected_Status=""
selected_satist=""
selected_traiteWha=""

show_actions=true;
show_actionsrv=true;
show_actionsWhats=true;
selected_data_req: any[]=[]
selected_data_reqrv: any[]=[]
selected_data_Whats: any[]=[]
selected_data_rvMat: any[]=[]
selectedEntie:any=null
visible = 0
pageSize = 10;
pageSizerv = 100;
collectionSize = 0;
collectionSizerv = 0;
collectionSizeWhats = 0;
dataReq:any[]=[]
dataReqrv:any[]=[]
dataWhats:any[]=[]
etapes = []
_tempReq: any[]=[];
_tempReqrv: any[]=[];
_tempWhats: any[]=[];
// pageReq = 1;
institutions = []
nbreDay:any
dateACloture = ""
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
errormessage=""
searchText=""

selected_data:any
closeResult = '';
departements:any[]=[]
detailpiece: any[]=[]
structures: any[]=[]
natures: any[]=[]
dataNT: any[] = [];
themes: any[]=[]
services: any[]=[]
onglet_What = false
mat_aff = false
descrCarr=[]
selected_data_note: any
notes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Declaration 
matricu_rv =""
eservices:any[]=[]


    gotoHashtag(fragment: string) {
        
        if (this.local_service.get(GlobalName.current_user) != undefined) {
            this.router.navigateByUrl('/home')
        } else {
            AppSweetAlert.simpleAlert('info', "Entrez vos identifiants et Connectez-vous")
            setTimeout(function () {
                const element: any = document.querySelector("#" + fragment);
                if (element) {
                    element.scrollIntoView();
                    
                }
            })
            
        }


    }
    // AlertNotif.MsgToast().fire({
    //     icon: 'info',
    //     title: 'Entrez vos identifiants et Connectez-vous'
    //   })
    showNavigationIndicators = false


    e_services = [
        {
            label: "Adminstration du travail",
            key: "administration-travail"
        },
        {
            label: "Fonction publique",
            key: "fonction-publique"
        },
        {
            label: "Formation",
            key: "espace-formation"
        },
        {
            label: "Administration centrale",
            key: "administration-centrale"
        },
        {
            label: "Procédures d'utilisation pdf",
            key: "telechargement"
        },
    ]

    default_services = this.e_services[0]
    loadServices(event:any) {
        this.default_services = this.e_services.filter((e:any) => (e.key == event.target.value))[0]
    }

    confirmation(service:any) {
        Swal.fire({
            text: "Inscrivez-vous et authentifiez-vous pour acceder au service " + service,
            icon: 'warning',
            title: 'Service en ligne',
            showCancelButton: true,
            confirmButtonText: 'Poursuivre',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload()
            } else {
                result.dismiss === Swal.DismissReason.cancel
            }
        }, function (dismiss) {
            return false;
        })
    }

    customOptions: OwlOptions = {
        loop: true,
        margin: 10,
        nav: false,
        autoplay: true,
        //autoplayTimeout:1000,
        //autoplayHoverPause:true
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    }
    visitor: boolean = false
    client_id: string | undefined;
    client_secret: string | undefined;
    needMailCheck: boolean = false
    email: string | undefined
    is_administrative_officer=1
    ipAddress: string | undefined
    settings:any
    need_notif=false
    totalInfo=0
    totalPlainte=0
    pourcent=0
    totalPrestation=0
    constructor(
        private status_service:StatusService,
        private applicationService: ApplicationService, 
        private user_auth_service: AuthService, 
        private local_service: LocalStorageService, 
        private router: Router,
        private route: ActivatedRoute, 
        private ip: IpServiceService, 
        private pdaService: PdaService, 
        private statusService:StatusService,
        private modalService: NgbModal) {

        if (this.route.snapshot.paramMap.get('client_id') && this.route.snapshot.paramMap.get('client_secret')) {
            this.visitor = true;
            this.client_id = this.route.snapshot.paramMap.get('client_id') ?? ""
            this.client_secret = this.route.snapshot.paramMap.get('client_secret') ?? ""
        }
        /* if(!isExpired){
             this.refreshTokenAndRedirect();
         }*/
    }
    count_prestation = 0

    getIP() {
        this.ip.getIPAddress().subscribe((res: any) => {
            this.ipAddress = res.ip;
        });
    }

    applications: any[] = []
    events = []


    first_faq:any={question:""}
    first_prestation={libelle:""}
    stats_guv={
        user_count:0
    }
     

    ngOnInit(): void {
    
        this.getIP();
        this.status_service.getNbreServ().subscribe((res:any) =>{
            this.ServiceEnligne = res.nbreServ
            this.ServiceTotal = res.nbreToServ
        })
        this.applications = []
        this.applicationService.getAll().subscribe((res: any) => {
            this.applications = res.data
        });
        this.events = []
        this.pdaService.getEvenementsDeclencheur().subscribe((res: any) => {
            this.events = res
        });
        this.statusService.stats().subscribe((res: any) => {
            this.stats_guv = res.data
        });
        
        this.pdaService.getPrestations().subscribe(
            (res: any) => {
                this.count_prestation = res.length
            })
            this.pdaService.getFaqs().subscribe(
                (res:any)=>{
                        this.first_faq=res[0]
                },)
                let param={"idUser":2,"startDate":"all","endDate":"all"}
                this.pdaService.getStat(param,1).subscribe((res:any)=>{
                  console.log('stat',res)
                 this.first_prestation=res.stats[0]
                // this.pourcent=res.pourcent
                 this.totalPrestation=res.stats.length
                 res.stats.forEach((element:any) => {
                  this.totalInfo+=parseInt(element.totalInfo)
                  this.totalPlainte+=parseInt(element.totalPlainte)
                 });
                })
                this.pdaService.getSettings().subscribe((res: any) => {
                
                    this.local_service.set('pdaSetting',JSON.stringify(res.data))
                });

                this.init()
    }

    init(){

        this.departements=[]
        this.user_auth_service.getAllDepartement().subscribe((res:any)=>{
          this.departements=res
        })
    
        this.institutions=[]
        this.user_auth_service.getAllInstitu().subscribe((res: any) => {
         this.institutions = res
         })
    
         this.pdaService.getEservices().subscribe((res:any)=>{
          this.eservices=res.data
        })

        this.pdaService.getPrestations().subscribe(
          (res:any)=>{
                  this.data=res
               //  this.totalPrestation=res.length
          },)
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
      open(content:any){
        this.modalService.open(content)
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


    loginSend(value:any) {
        this.loading = true;
        if (this.visitor) {
            value['client_id'] = this.client_id;
            value['grant_type'] = clientData.grant_type;
            value['client_secret'] = this.client_secret;
        } else {
            value['client_id'] = clientData.client_id;
            value['grant_type'] = clientData.grant_type;
            value['client_secret'] = clientData.client_secret;
        }
        this.email = value['email'];
        value['ip'] = this.ipAddress;
        this.user_auth_service.login(value).subscribe(
            (res: any) => {
                if (res.check_code) {
                    var data = res.params;
                    data['client_id'] = value['client_id']
                    data['grant_type'] = value['grant_type']
                    data['client_secret'] = value['client_secret']
                    data['user_id'] = res.user_id
                    
                    this.local_service.set(GlobalName.params, data)
                    this.router.navigate(['/check-code']);
                } else {
                    var url = "";

                    this.user_auth_service.setUserLoggedIn(true);

                    if (res.user.active) {
                        this.loading = false;
                        
                        console.log(res.user)
                        if (res.user.is_portal_admin == true) {
                            url = GlobalName.back_url + '?access_token=' + res.access_token + '&email=' + res.user.email;

                        } else {
                            this.local_service.set(GlobalName.token, res.access_token)
                            this.local_service.set(GlobalName.current_user, res.user)
                            this.local_service.set(GlobalName.refresh_token, res.refresh_token)
                            
                            url = res.redirect_url + '?access_token=' + res.access_token + '&email=' + res.user.email;

                        }
                        if (this.visitor || res.user.is_portal_admin == true) {
                            console.log(url)
                            window.location.href = url;
                        } else {
                            this.router.navigate(['/home']);
                        }
                    } else {

                    }
                }


            },
            (err) => {
                this.loading = false;
                console.log(err)
                if (err.error.error == "invalid_grant") {
                    AppSweetAlert.simpleAlert("Connexion", "Identifiant ou mot de passe incorrect", "error")
                } else {
                    AppSweetAlert.simpleAlert("Connexion", "Echec de connexion", "error")
                }
            }
        )

    }

    e_services_info() {
        AppSweetAlert.simpleAlert("E-services", "Bientôt disponible", "info")
    }

    refreshTokenAndRedirect() {
        var data:any = {
            'grant_type': 'refresh_token',
            'refresh_token': this.local_service.get(GlobalName.refresh_token),
            'scope': '',
        }
        if (this.visitor) {
            data['client_id'] = this.client_id;
            data['grant_type'] = clientData.grant_type;
            data['client_secret'] = this.client_secret;
        } else {
            data['client_id'] = clientData.client_id;
            data['grant_type'] = clientData.grant_type;
            data['client_secret'] = clientData.client_secret;
        }
        data['ip'] = this.ipAddress;
        this.user_auth_service.login(data).subscribe(
            (res: any) => {
                this.loading = false;

                if (res.user.active) {
                    this.local_service.set(GlobalName.token, res.access_token.accessToken)
                    this.local_service.set(GlobalName.current_user, res.user)
                    this.local_service.set(GlobalName.refresh_token, res.refresh_token)
                    const url = res.redirect_url + '?access_token=' + res.accessToken + '&email=' + res.user.email;
                    if (this.visitor) {
                        window.location.href = url;
                    } else {
                        this.router.navigate(['/home']);
                    }
                } else {
                    this.needMailCheck = true;
                }

            },
            (err) => {
                this.loading = false;
                console.log(err)
                AppSweetAlert.simpleAlert("Connexion", "Echec de connexion", "error")
            }
        )
    }


    resendMailCheclCode() {
        this.loading = true
        this.user_auth_service.resend({ email: this.email }).subscribe(
            (res: any) => {
                this.loading = false;
                this.local_service.set("is_registered", "");
                this.router.navigate(['/mail-check-code-resent']);
            },
            (err) => {
                this.loading = false;
                console.log(err)
                AppSweetAlert.simpleAlert("Connexion", "Echec de connexion", "error")
            }
        )
    }




          ChechEtape(){
            this.etapes = []
            this.user_auth_service.getAllEtap(0).subscribe((res: any) => {
              this.etapes = res
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

          setVisible() {
            this.visible = 1
          }



          addRequeteusager(value:any,form:NgForm) {
    
            let service = null
            if (this.link_to_prestation==1 || this.selected_type_preoccupation==0) {
              service = this.services.filter((e:any) => (e.id == value.idPrestation))[0]
            }else{
              service=this.services.filter((e:any) => (e.hide_for_public == 1))[0]
            }
            if(service == null){
              AppSweetAlert.simpleAlert("Erreur","Aucune prestation (Service Usager) par défaut n'est lié à cet entité", 'error')
              return;
            }
              var param = {
                objet: value.objet,
                idPrestation: this.link_to_prestation==0  ? service.id : value.idPrestation,
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
              
              if(param.idEntite == null || param.idEntite == ""){
                AppSweetAlert.simpleAlert("Erreur","Veuillez choisir une structure destrinatrice.", 'error')
              }else if(param.plainte == null || param.plainte == "0"){
                AppSweetAlert.simpleAlert("Erreur","Veuillez choisir un type de préoccupation.", 'error')
              }else if(this.mat_aff == true && param.matricule.trim() == ''){
                AppSweetAlert.simpleAlert("Renseigner le matricule", "Champ obligatoire", 'error')
              }else if(param.idPrestation == null || param.idPrestation == ""){
                AppSweetAlert.simpleAlert("Erreur","Veuillez choisir une prestation.", 'error')
              }else if(!param.objet){
                AppSweetAlert.simpleAlert("Renseigner l'objet", "Champ obligatoire", 'error')
              }else if(!param.msgrequest){
                AppSweetAlert.simpleAlert("Renseigner le message", "Champ obligatoire", 'error')
              }else if(!value.has_consent){
                AppSweetAlert.simpleAlert("Consentement", "Veuillez donner votre consentement", 'error')
              } else{
                this.loading=true
                console.log(param)
                this.pdaService.createrequeteusager(param).subscribe((rest: any) => {
                    form.resetForm()
                  this.loading=false
                  if(rest.status=="error"){
                    AppSweetAlert.simpleAlert("Erreur",rest.message, 'error')
                  }else{
                    AppSweetAlert.simpleAlert("Soumission de préoccupation", "Votre préoccupation a été bien transmise aux autorités compétentes", 'success')
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
}
