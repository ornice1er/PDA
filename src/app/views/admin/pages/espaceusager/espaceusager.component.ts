import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { PipeTransform } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
// import { UserService } from '../../../../core/_services/user.service';

import { NgxSpinnerService } from 'ngx-spinner';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { LoadingComponent } from '../../../components/loading/loading.component';

import { ConfigService } from '../../../../core/utils/config-service';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { GlobalName } from '../../../../core/utils/global-name';
import { MataccueilService } from '../../../../core/services/mataccueil.service';
import { AuthService } from '../../../../core/services/auth.service';
import { TitleService } from '../../../../core/utils/title.service';
import { log } from 'console';

@Component({
  selector: 'app-espaceusager',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    LoadingComponent,
    SampleSearchPipe,
    NgSelectModule,
    NgxPaginationModule,
  ],
  templateUrl: './espaceusager.component.html',
  styleUrls: ['./espaceusager.component.css'],
})
export class EspaceusagerComponent implements OnInit {
  @ViewChild('note') note: TemplateRef<any> | undefined;
  @Input() cssClasses = '';
  errormessage = '';
  erroraffectation = '';

  searchText = '';
  closeResult = '';
  permissions: any[] = [];
  error = '';
  data: any[] = [];
  dataNT: any[] = [];
  _temp: any[] = [];
  collectionSize = 0;
  page = 1;
  pageSize = 10;

  selected = [];
  descrCarr = [];
  current_permissions: any[] = [];
  selected_data: any;
  selected_data_note: any;
  isSended = false;
  notes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  daterdvs: any[] = [];
  rdvcreneaus: any[] = [];
  visible = 0;
  selected_service: any;
  link_to_prestation = 1;
  selected_type_preoccupation = 0;
  structures: any = [];
  entities: any[] = [];
  selectedIdEntite: any = null;
  NULL: any = null;
  loading = false;
  entite_vis = false;
  mat_aff = false;
  idEntite: any;
  canSentNew = false;

  search() {
    this.data = this._temp.filter((r) => {
      const term = this.searchText.toLowerCase();
      return (
        r.objet.toLowerCase().includes(term) ||
        r.msgrequest.toLowerCase().includes(term)
      );
    });
    this.collectionSize = this.data.length;
  }

  openAddModal(content: any) {
    this.loading = false;
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
        backdrop: false,
        windowClass: 'modal-z1',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openEditModal(content: any) {
    this.loading = false;
    if (this.selected_data != null) {
      this.prepare(this.selectedEntie);
      this.modalService
        .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    } else {
      AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        'Veuillez selectionnez un élément puis réessayer'
      );
    }
  }
  openEditModal2(content: any) {
    this.loading = false;
    if (this.selected_data2 != null) {
      this.modalService
        .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    } else {
      AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        'Veuillez selectionnez un élément puis réessayer'
      );
    }
  }
  openNoteModal(content: any, el: any) {
    this.selected_data_note = el;
    this.loading = false;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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

  user: any;

  constructor(
    private modalService: NgbModal,
    private matService: MataccueilService,
    private titleService: TitleService,
    private localService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute
  ) {}

  ChangerFile(file: any) {
    // window.location.href="http://api.mataccueil.sevmtfp.test/api/downloadFile?file="+file
    window.location.href =
      'https://api.mataccueil.gouv.bj/api/downloadFile?file=' + file;
    // window.location.href="http://localhost:8003/api/downloadFile?file="+file
  }
  etapes: any[] = [];
  services: any[] = [];
  g_services: any[] = [];
  __services: any[] = [];
  departements: any[] = [];
  structureservices: any[] = [];
  themes: any[] = [];
  themes2: any[] = [];
  natures: any[] = [];
  institutions: any[] = [];
  rdvs: any[] = [];
  detailpiece: any[] = [];
  pg = {
    pageSize: 10,
    p: 0,
    total: 0,
  };
  search_text: any = '';

  isGeneralDirector = false;
  typeRequete = 'Préoccupation';

  checkType() {
    if (this.activatedRoute.snapshot.paramMap.get('type_req') == 'plaintes') {
      return { id: 1, name: 'Plaintes' };
    }
    if (this.activatedRoute.snapshot.paramMap.get('type_req') == 'requetes') {
      return { id: 0, name: 'Requetes' };
    }
    if (this.activatedRoute.snapshot.paramMap.get('type_req') == 'infos') {
      return { id: 2, name: "Demandes d'informations" };
    }

    return;
  }

  setVisible() {
    this.visible = 1;
  }
  selected_data2: any = null;

  show_actions2 = true;
  checked2(event: any, el: any) {


    this.selected_data2 = el;

    if (el.statut == 0) {
      this.show_actions2 = true;
    } else {
      this.show_actions2 = false;
    }


    // this.selected_data2.full_name =
    //   this.selected_data2.nom + ' ' + this.selected_data2.prenoms;

    // if (el.archiver == 1) {
    //   this.canSentNew = true;
    // } else {
    //   let check = this.data.filter(
    //     (el: any) => el.traiteOuiNon == 1 && (el.noteUsager == null || el.notes.length==0)
    //   );
    //   //console.log(check.length);
    //   if (check.length == 0) {
    //     this.canSentNew = true;
    //   } else {
    //     this.canSentNew = false;
    //     AppSweetAlert.confirmBox(
    //       'info',
    //       'Important',
    //       ' Nous vous prions de nous laisser votre appréciation sur votre dernière préoccupation satisfait '
    //     ).then((res: any) => {
    //       if (res.isConfirmed) {
    //         this.openNoteModal(this.note, el);
    //       }
    //     });
    //   }
    //   this.canSentNew = check.length == 0 ? true : false;
    // }
    // if (el.statut == 0 && this.canSentNew) {
    //   this.show_actions2 = true;
    // } else {
    //   this.show_actions2 = false;
    // }
  }

  show_actions = true;
  checked(event: any, el: any) {
    this.selected_data = el;
    this.mat_aff = false;
    console.log(this.selected_data);

    if (el.archiver == 1) {
      this.canSentNew = true;
    } else {
      let check = this.data.filter(
        (el: any) => el.traiteOuiNon == 1 && el.noteUsager == null
      );
     console.log(check);
      if (check.length == 0) {
        this.canSentNew = true;
      } else {
        this.canSentNew = false;
        AppSweetAlert.confirmBox(
          'info',
          'Important',
          ' Nous vous prions de nous laisser votre appréciation sur la prise en charge de votre dernière préoccupation.'
        ).then((res: any) => {
          if (res.isConfirmed) {
            this.openNoteModal(this.note, check);
          }
        });
      }
      this.canSentNew = check.length == 0 ? true : false;
    }

    if (this.canSentNew) {
      if (el.visible == 0) {
        this.show_actions = true;
        if (
          this.selected_data.service.type.libelle == 'Formation' ||
          this.selected_data.service.type.libelle == 'Carrière'
        ) {
          this.mat_aff = true;
        }
      } else {
        this.show_actions = false;
      }
    }

    this.selectedEntie = el.idEntite;

    this.matService
      .getAllThematique(this.selected_data.idEntite)
      .subscribe((res: any) => {
        this.themes = res.data;
      });

    this.matService.getThematique(this.selected_data.idEntite).subscribe((res: any) => {
      this.descrCarr = res.descr;
    });
    this.matService
      .getAllType(this.selected_data.service.idType,this.selected_data.idEntite)
      .subscribe((res: any) => {
        this.services = res.data;
      });
  }

  show_step(id: any) {
    return this.etapes.find((e: any) => e.id == id);
  }

  url =
    'https://demarchesmtfp.gouv.bj?client_id=26d9d6be-d676-465f-b92c-369b72442c7f&client_secret=f5034b6c80a13d411fa03a8d1f14';

  logout() {
    this.localService.remove('guvUserToken');
    this.localService.remove('guvUserData');
    this.localService.remove('mataccueilUserData');
    window.location.href = this.url;
  }
  token: any;
  selectedEntie: any = null;

  ngOnInit(): void {
    this.titleService.setTitle('Espace Usager | Vos préoccupations');
    this.titleService.setPfcState(2);
    this.token = this.route.snapshot.paramMap.get('token');
    // console.log('token', this.token);
    if (this.token !== undefined) {
      if (this.localService.get(GlobalName.tokenNameMat) === null) {
        this.getToken();
      } else {
        console.log('init-----1');
        this.init();
      }
    } else {
      if (this.localService.get(GlobalName.tokenNameMat) === null) {
        alert('Vous devez vous connecter pour accéder à cette page');
      } else {
        console.log('init-----3');
        this.init();
      }
    }
  }

  loadRequest() {
    this._temp = [];
    this.data = [];
    this.dataNT = [];

    this.matService
      .getAllForUsagerNT(this.user.id)
      .subscribe((res: any) => {
        if (res.isPaginate) {
          this.dataNT = res.data.data;
          this.pg.pageSize = 10;
          this.pg.p = 0;
          this.pg.total = res.data.length;
        } else {
          this.dataNT = res.data;
        }
      });
    this.matService
      .getAllForUsager(this.user.id, this.pg.pageSize, this.pg.p)
      .subscribe((res: any) => {
        this.spinner.hide();
        this.data = res.data;
      });

    this.ChechEtape();
  }

  loadRequest2() {
    this._temp = [];
    this.data = [];
    this.dataNT = [];

    this.matService
      .getAllForUsagerNT(this.user.id, this.pg.pageSize, this.pg.p)
      .subscribe((res: any) => {
        this.dataNT = res.data;
      });
    this.matService
      .getAllForUsager(this.user.id, this.pg.pageSize, this.pg.p)
      .subscribe((res: any) => {
        this.spinner.hide();
        this.data = res.data;
      });
  }

  loadRdv() {
    this.rdvs = [];
    this.matService.getAllForUsagerRDV(this.user.id).subscribe((res: any) => {
      this.rdvs = res.data;
    });
  }
  init() {
    if (this.localService.get(GlobalName.userNameMat) !== null) {
      this.user = this.localService.get(GlobalName.userNameMat);
      this.user.full_name = this.user.nom + ' ' + this.user.prenoms;
      this.selectedEntie = this.user.institu_id;
      console.log(this.user);
      this.titleService.setUserConnectedState(this.user);

      //Controle ajouter pour les premiers users qui n'ont pas renseigné leur identite
      // if (this.selectedEntie === null || this.selectedEntie === 'null') {
      //   this.selectedEntie = 1; //MTFP par défaut
      // }
      // if (this.selectedEntie !== null && this.selectedEntie !== '') {
      //   this.prepare(this.selectedEntie);
      // }
      this.institutions = [];
      this.matService.getAllInsitution().subscribe((res: any) => {
        this.institutions = res.data;
      });

      this.loadRequest();
      this.loadRdv()
    }

    // this.loadRequest();
    // this.departements = [];
    // this.matService.getAllDepartement().subscribe((res: any) => {
    //   this.departements = res.data;
    // });
    // this.prepare(this.user.institu_id);
    // this.loadRdv();
  }

  onEntiteChange(event: any) {
    console.log(event.target.value);
    this.selectedEntie =event.target.value;
    this.idEntite=this.selectedIdEntite
    this.prepare(this.selectedEntie);
  }

  ChechEtape() {
    this.etapes = [];
    this.matService.getAllEtape(0).subscribe((res: any) => {
      this.etapes = res.data;
    });
  }
  prepare(idEntite: any) {
    //COntrole ajouter pour les premiers users qui n'ont pas renseigné leur identite
    // this.g_services = [];
    // this.matService.getAllService(idEntite).subscribe((res: any) => {
    //   this.g_services = res.data;
    // });
    this.structures = [];
    this.matService.getAllStructure(1, idEntite).subscribe((res: any) => {
      this.structures = res.data;
    });
    this.themes = [];
    this.matService.getAllThematique(idEntite).subscribe((res: any) => {
      this.themes = res.data;
    });
    this.daterdvs = [];
    this.matService.getAllActif(idEntite).subscribe((res: any) => {
      this.daterdvs = res.data;
    });

    this.rdvcreneaus = [];
    this.matService.getAllCreneauRdv(idEntite).subscribe((res: any) => {
      this.rdvcreneaus = res.data;
    });
  }

  addRequeteusager(value: any) {
    let service = null;
    if (this.link_to_prestation == 1 || this.selected_type_preoccupation == 0) {
      service = this.services.filter((e: any) => e.id == value.idPrestation)[0];
    } else {
      service = this.g_services.filter((e: any) => e.hide_for_public == 1)[0];
    }
    if (service == null) {
      AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        "Aucune prestation (Service Usager) par défaut n'est lié à cet entité"
      );
      return;
    }
    var param = {
      objet: value.objet,
      idPrestation:
        this.link_to_prestation == 0 ? service.id : value.idPrestation,
      nbreJours: service == null ? 0 : service.nbreJours,
      msgrequest: value.msgrequest,
      email: this.user.email,
      idEntite: this.selectedEntie,
      nom: this.user.nom,
      tel: this.user.tel,
      link_to_prestation: this.link_to_prestation,
      idDepartement: this.user.idDepartement,
      interfaceRequete: this.link_to_prestation == 1 ? 'USAGER' : 'SRU',
      idUser: this.user.id,
      plainte: value.plainte,
      matricule: this.mat_aff == true ? value.matricule : '',
      visible: this.visible,
    };
    // fichierJoint

    if (param.idEntite == null || param.idEntite == '') {
      AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        'Veuillez choisir une structure destrinatrice.'
      );
    } else if (param.plainte == null || param.plainte == '0') {
      AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        'Veuillez choisir un type de préoccupation.'
      );
    } else if (this.mat_aff == true && (param.matricule?.trim() ?? '')  == '') {
      AppSweetAlert.simpleAlert('success','Renseigner le matricule', 'Champ obligatoire');
    } else if (param.idPrestation == null || param.idPrestation == '') {
      AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        'Veuillez choisir une prestation.'
      );
    } else if (!param.objet) {
      AppSweetAlert.simpleAlert('info',"Renseigner l'objet", 'Champ obligatoire');
    } else if (!param.msgrequest) {
      AppSweetAlert.simpleAlert('info',"Renseigner le message", 'Champ obligatoire');
    } else {
      this.loading = true;
      this.matService.createRequete(param).subscribe((rest: any) => {
        this.loadRequest2();
        this.visible = 0;
        this.modalService.dismissAll();
        this.loading = false;
        if (rest.data.status == 'error') {
          AppSweetAlert.simpleAlert('error', 'Erreur', rest.data.message);
        } else {
          if (param.visible == 0) {
            AppSweetAlert.simpleAlert(
              'success',
              'Ajout préoccupation',
              'Préoccupation ajoutée avec succès'
            );
          } else {
            AppSweetAlert.simpleAlert(
              'success',
              'Ajout préoccupation',
              'Requete ajouté et transmis avec succès'
            );
          }
        }
      },(err:any) => {
                  AppSweetAlert.simpleAlert('error', 'Erreur', err.error.message);

      });
    }
  }

  openDetailModal(event: any, content: any) {
    this.detailpiece = [];
    this.matService.getServPiece(event.target.value).subscribe((res: any) => {
      this.detailpiece = res.data;

      // this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',windowClass:'modal-z2'});
    });
  }

  saveRequeteusager(value: any) {
    let service = null;
    if (this.selected_data.link_to_prestation == 1) {
      service = this.services.filter((e: any) => e.id == value.idPrestation)[0];
    } else {
      service = this.services.filter((e: any) => e.hide_for_public == 1)[0];
    }
    var param = {
      id: this.selected_data.id,
      objet: this.selected_data.objet,
      link_to_prestation: this.selected_data.link_to_prestation,
      idPrestation:
        this.selected_data.link_to_prestation == 0
          ? service.id
          : value.idPrestation,
      nbreJours: service == null ? 0 : service.nbreJours,
      msgrequest: this.selected_data.msgrequest,
      email: value.email,
      idEntite: this.selectedEntie,
      nom: this.selected_data.nom,
      tel: this.selected_data.tel,
      idDepartement: this.selected_data.usager.idDepartement,
      interfaceRequete: 'USAGER',
      natureRequete: value.natureRequete,
      idUser: this.selected_data.usager.id,
      matricule: this.mat_aff == true ? value.matricule : '',
      plainte: value.plainte,
    };
    //
    if (param.idEntite == null || param.idEntite == '') {
      AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        'Veuillez choisir une structure destrinatrice.'
      );
    } else if (param.plainte == null || param.plainte == '0') {
      AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        'Veuillez choisir un type de préoccupation.'
      );
    } else if (this.mat_aff == true && (param.matricule?.trim() ?? '')  == '') {
      AppSweetAlert.simpleAlert('info','Renseigner le matricule', 'Champ obligatoire');
    } else if (param.idPrestation == null || param.idPrestation == '') {
      AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        'Veuillez choisir une prestation.'
      );
    } else if (!param.objet) {
      AppSweetAlert.simpleAlert('info',"Renseigner l'objet", 'Champ obligatoire');
    } else if (!param.msgrequest) {
      AppSweetAlert.simpleAlert('info','Renseigner le message', 'Champ obligatoire');
    } else {
      this.loading = true;
      this.matService
        .updateRequete(param, this.selected_data.id)
        .subscribe((rest: any) => {
          this.loadRequest2();
          this.visible = 0;
          this.modalService.dismissAll();
          this.loading = false;
          if (rest.status == 'error') {
            AppSweetAlert.simpleAlert('error','Modification préoccupation',rest.message);
          } else {
            AppSweetAlert.simpleAlert(
              'success',
              'Modification requete',
              'Préoccupation modifiée avec succès'
            );
          }
        });
    }
  }
  chargerPrestation(event: any) {
    // this.services=[]
    // this.__services.forEach((item:any) => {
    //   if (item.idType == event.target.value)
    //     this.services.push(item);
    // });
    this.services = [];
    this.matService.getAllType(event.target.value,this.selectedEntie).subscribe((res: any) => {
      this.services = res.data;
    });

    this.matService.getThematique(event.target.value).subscribe((res: any) => {
      this.descrCarr = res.descr;
      if (res.libelle == 'Formation' || res.libelle == 'Carrière') {
        this.mat_aff = true;
      } else {
        this.mat_aff = false;
      }
    });
  }
    chargerThemes(event: any) {
    this.themes2 = [];

    this.themes.filter((el:any) => el.idEntite==event.target.value)
   
  }
  genererPDF() {
    var param = {
      id: this.selected_data.id,
    };
    this.matService.genPdf(param).subscribe((res: any) => {
      console.log('pdf generated');
    });
  }
  dropRequeteusager() {
    if (this.selected_data == null) {
      AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        'Veuillez selectionnez un élément puis réessayer'
      );
      return;
    }
    if (this.selected_data.visible == 1) {
      AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        'Vous ne pouvez plus supprimer cette préoccupation. Elle est déjà en cours de traitement.'
      );
      return;
    }
    AppSweetAlert.confirmBox(
      'info',
      'Suppression requete',
      'Cette action est irreversible. Voulez-vous continuer ?'
    ).then((result: any) => {
      if (result.value) {
        this.matService.deleteRequete(this.selected_data.id).subscribe(
          (res: any) => {
            this.loadRequest2();
            AppSweetAlert.simpleAlert(
              'success',
              'Suppression requete',
              'Suppression effectuée avec succès',
              
            );
          },
          (err: any) => {
            AppSweetAlert.simpleAlert(
              'error',
              'Suppression requete',
              err.error.message,
              
            );
          }
        );
      }
    });
  }
  editRDV(value: any) {
    value.statut = this.selected_data2.statut;
    value.id = this.selected_data2.id;
    this.loading = true;
    this.matService.update(value, this.selected_data2.id).subscribe(
      (res: any) => {
        this.modalService.dismissAll();
        this.loadRdv();
        this.loading = false;
        if (res.status == 'error') {
          AppSweetAlert.simpleAlert('error', 'Erreur', res.message, 'error');
        } else {
          AppSweetAlert.simpleAlert(
            'success',
            'Nouvelle modification',
            'Motification effectué avec succès',
            
          );
        }
      },
      (err: any) => {
        AppSweetAlert.simpleAlert(
          'Nouvelle modification',
          err.error.message,
          'error'
        );
      }
    );
  }

  sendRDV() {
    if (this.selected_data2 == null) {
      AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        'Veuillez selectionnez un élément puis réessayer'
      );
      return;
    }
    if (this.selected_data2.statut != 0) {
      AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        'Votre de demande est déjà en cours de traitement.'
      );
      return;
    }
    AppSweetAlert.confirmBox(
      'info',
      'Transmettre rdv',
      'Cette action est irreversible. Voulez-vous continuer?'
    ).then((result: any) => {
      if (result.value) {
        var param = {
          listerdv: [this.selected_data2.id],
          statut: 1, // 1: transmis à la structure
          idEntite: this.selected_data2.idEntite,
        };

        this.matService.saveRdvStatut(param).subscribe(
          (res: any) => {
            this.loadRdv();
            AppSweetAlert.simpleAlert(
              'success',
              'Transmettre rdv',
              'Suppression effectuée avec succès',
              
            );
          },
          (err: any) => {
            AppSweetAlert.simpleAlert(
              'Transmettre rdv',
              err.error.message,
              'error'
            );
          }
        );
      }
    });
  }

  dropRDV() {
    if (this.selected_data2 == null) {
      AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        'Veuillez selectionnez un élément puis réessayer'
      );
      return;
    }
    if (this.selected_data2.statut != 0) {
      AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        'Vous ne pouvez plus supprimer cet element. Il est déjà en cours de traitement.'
      );
      return;
    }
    AppSweetAlert.confirmBox(
      'error',
      'Suppression rdv',
      'Cette action est irreversible. Voulez-vous continuer?'
    ).then((result: any) => {
      if (result.value) {
        this.matService.delete(this.selected_data2.id).subscribe(
          (res: any) => {
            this.loadRdv();
            AppSweetAlert.simpleAlert(
              'success',
              'Suppression rdv',
              'Suppression effectuée avec succès',
              
            );
          },
          (err: any) => {
            AppSweetAlert.simpleAlert(
              'Suppression rdv',
              err.error.message,
              'error'
            );
          }
        );
      }
    });
  }
  displayResource() {
    if (this.selected_data == null) {
      AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        'Veuillez selectionnez un élément puis réessayer'
      );
      return;
    }
    if (this.selected_data.fichier_joint.length == 0) {
      AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        'Aucun fichier attaché.',
        'error'
      );
      return;
    }
    var filePath = ConfigService.toFile(this.selected_data.fichier_joint);
    window.open(filePath);
  }

  saveUsager(value: any) {
    var param = {
      id: this.user.id,
      email: value.email,
      nom: value.nom,
      prenoms: value.prenoms,
      password: '', //value.password
      confirm: '', //value.confirm
      tel: value.tel,
      idEntite: this.selectedEntie,
      idDepartement: value.idDepartement,
      interfaceRequete: 'USAGER',
      visible: this.visible,
    };
    this.matService.updateUsager(param, this.user.id).subscribe((res: any) => {
      this.modalService.dismissAll();
      this.visible = 0;
      this.loadRequest2();
      AppSweetAlert.simpleAlert(
        'success',
        'Mise à jour',
        'Profile mis à jour avec succès',
      );
    });

    /*if (value.password != value.confirm) {
      AppSweetAlert.simpleAlert("Erreur", "Mot de passe non identique", 'error');
    } else {

    }*/
  }
  noterRequete(value: any) {
    var param = {
      codeRequete: this.selected_data_note.codeRequete,
      noteDelai: value.noteDelai,
      noteResultat: value.noteResultat,
      idEntite: this.selectedEntie,
      commentaireNotation: value.commentaireNotation,
    };
    this.loading = true;
    this.matService.noterRequete(param).subscribe((res: any) => {
      this.modalService.dismissAll();
      this.loadRequest();
      this.loading = false;
      if (res.status == 'error') {
        AppSweetAlert.simpleAlert('error', 'Erreur', res.message, 'error');
      } else {
        AppSweetAlert.simpleAlert(
          'success',
          'Appreciation',
          'Appreciation envoyé avec succès',
          
        );
      }
    });
  }

  transmettreRequete() {
    if (this.selected_data == null) {
      AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        'Veuillez selectionnez un élément puis réessayer'
      );
      return;
    }
    if (this.selected_data.visible == 1) {
      AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        'Vous avez déjà transmis cette préoccupation.'
      );
      return;
    }
    // var msgConfirm = 'Voulez-vous transmettre la préoccupation ?';
    // var confirmResult = confirm(msgConfirm);
    // if (confirmResult === false) return;


        AppSweetAlert.confirmBox(
      'success',
      'Transmission de préoocupation',
      'Voulez-vous transmettre la préoccupation ?'
    ).then((result: any) => {
      if (result.value) {
       var param = {
      idRequete: this.selected_data.id,
      idEntite: this.selectedEntie,
      fichier_requete: this.selected_data.request_file_data,
    };

    this.matService.transmettreRequeteExterne(param).subscribe((res: any) => {
      this.modalService.dismissAll();
      this.loadRequest();
      AppSweetAlert.simpleAlert(
        'success',
        'Transmission requete',
        'Requete transmise avec succès'
      );
    });
      }
    });

   
  }

  setStatut() {
    this.statut = 1;
  }
  show_structures = false;
  statut = 0;
  saveRdv(value: any) {
    var param = {
      idUsager: this.user.id,
      objet: this.selected_el_obj,
      idRdvCreneau: value.idRdvCreneau,
      codeRequete: value.codeRequete,
      dateRdv: value.dateRdv,
      idEntite: this.selectedEntie,
      idStructure: value.idStructure,
      statut: this.statut,
      attente: value.attente,
    };
    if (param.idStructure == undefined) {
      delete param.idStructure;
    }
    this.show_structures = false;
    this.loading = true;
    this.matService.create(param).subscribe((res: any) => {
      this.modalService.dismissAll();
      this.loadRdv();
      this.statut = 0;
      this.loading = false;
      if (res.status == 'error') {
        AppSweetAlert.simpleAlert('error', 'Erreur', res.message, 'error');
      } else {
        if (param.statut == 0) {
          
          AppSweetAlert.simpleAlert(
            'success',
            'Prise de rdv',
            'RDV enregistré avec succès',
          );
        } else {
          AppSweetAlert.simpleAlert(
            'success',
            'Prise de rdv',
            'RDV enregistré et transmis avec succès',
          );
        }
      }
    });
  }
  selected_el_obj = '';

  selectRequest(event: any) {
    if (event.target.value != '0') {
      this.show_structures = false;
      this.selected_el_obj = this.data.find(
        (e: any) => e.codeRequete == event.target.value
      ).objet;
    } else {
      this.show_structures = true;
      this.selected_el_obj = '';
    }
  }

  getToken() {
    this.matService.getToken({ uuid: this.token }).subscribe(
      (res: any) => {
        // console.log('token check', res);
        this.localService.set(GlobalName.tokenNameMat, res.token);
        this.localService.set(GlobalName.userNameMat, res.userData);
        this.user = res.userData;
        // console.log(this.user);
        if (this.user) {
          this.titleService.setUserConnectedState(this.user);
        }
        console.log('init-----2');
        this.init();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getPage(event: any) {
    this.pg.p = event;
  }


  get nomComplet() {
  return this.selected_data?.usager?.nom + ' ' + this.selected_data?.usager?.prenoms;
}
}
