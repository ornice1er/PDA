import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ModalDismissReasons,
  NgbModal,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../../../components/loading/loading.component';
import { StatutComponent } from '../../../../../components/statut/statut.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';
import { AppSweetAlert } from '../../../../../../core/utils/app-sweet-alert';
import { ConfigService } from '../../../../../../core/utils/config-service';
import { GlobalName } from '../../../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../../../core/utils/local-stoarge-service';
import { TitleService } from '../../../../../../core/utils/title.service';
import { SharedModule } from '../../../../../../shared/shared.module';

@Component({
  selector: 'app-pfc-mataccueil',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    LoadingComponent,
    SampleSearchPipe,
    NgSelectModule,
    NgxPaginationModule,
    StatutComponent,
    SharedModule
  ],
  templateUrl: './pfc-mataccueil.component.html',
  styleUrl: './pfc-mataccueil.component.css',
})
export class PfcMataccueilComponent {
  active = 1;
  @ViewChild('contentRetraite') contentRetraite: any;
  @ViewChild('contentCarriere') contentCarriere: any;

  loadFile(file: any) {
    return ConfigService.toFile(file);
  }
  page = 1;
  pagerv = 1;

  subs: Subscription | undefined;

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
    private user_auth_service: AuthService,
    private local_service: LocalStorageService,
    private router: Router,
    private modalService: NgbModal,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private titleService: TitleService
  ) {
    if (localStorage.getItem(GlobalName.tokenNameMat) != undefined)
      this.user = this.local_service.get(GlobalName.tokenNameMat);
  }
  loading: any = false;
  id: any;
  data: any;
  user: any;
  access_token: any;
  _temp: any[] = [];

  subject = new Subject<any>();
  pager: any = {
    current_page: 0,
    data: [],
    last_page: 0,
    per_page: 0,
    to: 0,
    total: 0,
  };
  link_to_prestation = 1;
  selected_type_preoccupation = 0;
  error = '';
  searchText = '';

  selected_data: any;
  closeResult = '';
  departements: any[] = [];
  detailpiece: any[] = [];
  structures: any[] = [];
  natures: any[] = [];
  dataNT: any[] = [];
  themes: any[] = [];
  services: any[] = [];
  onglet_What = false;
  mat_aff = false;
  descrCarr = [];
  selected_data_note: any;
  notes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Declaration
  matricu_rv = '';

  ngOnInit(): void {
    this.titleService.setTitle('Espace Point Focal Communal');

    if (localStorage.getItem(GlobalName.tokenNameMat) != null) {
      this.user = this.localStorageService.get(GlobalName.userNameMat);
      //Controle pour acceder à l'onglet WhatsApp
      if (this.user?.attribu_com != null) {
        this.onglet_What = true;
      } else {
        this.onglet_What = false;
      }
    }

    this.activatedRoute.queryParams.subscribe((x: any) =>
      this.init(x.page || 1)
    );

    this.subject.subscribe((val) => {
      this.pager = val;
      this.page = this.pager.current_page;

      let pages = [];
      if (this.pager.last_page <= 5) {
        for (let index = 1; index <= this.pager.last_page; index++) {
          pages.push(index);
        }
      } else {
        let start = this.page > 3 ? this.page - 2 : 1;
        let end =
          this.page + 2 < this.pager.last_page
            ? this.page + 2
            : this.pager.last_page;
        for (let index = start; index <= end; index++) {
          pages.push(index);
        }
      }
      this.pager.pages = pages;
    });
  }

  show_step(id: any) {
    return this.etapes.find((e: any) => e.id == id);
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
  noterRequete(value: any) {
    var param = {
      codeRequete: this.selected_data_note.codeRequete,
      noteDelai: value.noteDelai,
      noteResultat: value.noteResultat,
      idEntite: this.selectedEntie,
      commentaireNotation: value.commentaireNotation,
    };
    this.loading = true;
    this.user_auth_service.noterRequetePfc(param).subscribe((res: any) => {
      this.modalService.dismissAll();
      this.loadRequest();
      this.loading = false;
      if (res.status == 'error') {
        AppSweetAlert.simpleAlert('info', 'Erreur', res.message);
      } else {
        AppSweetAlert.simpleAlert(
          'info',
          'Appreciation',
          'Appreciation envoyé avec succès'
        );
      }
    },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });
  }

  openAddModal(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  chargerPrestation(event: any) {
    this.services = [];
    this.user_auth_service
      .getAllTypePrest(event.target.value, this.selectedEntie)
      .subscribe((res: any) => {
        this.services = res?.data;
      },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });

    this.user_auth_service
      .getThema(event.target.value)
      .subscribe((res: any) => {
        this.descrCarr = res.descr;
        if (res.libelle == 'Formation' || res.libelle == 'Carrière') {
          this.mat_aff = true;
        } else {
          this.mat_aff = false;
        }
      },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });
  }
  ChangerFile(file: any) {
    window.location.href =
      'https://api.mataccueil.gouv.bj/api/downloadFile?file=' + file;
    //window.location.href="https://preprodmtfp.gouv.bj/pprod-mataccueilapi/api/downloadFile?file="+file
    // window.location.href="http://api.mataccueil.sevmtfp.test/api/downloadFile?file="+file
    // window.location.href="http://localhost:8003/api/downloadFile?file="+file
  }

  addRequeteusager(value: any) {
    let service: any = null;
    if (this.link_to_prestation == 1) {
      service = this.services.filter((e: any) => e.id == value.idPrestation)[0];
    } else {
      service = this.services.filter((e: any) => e.hide_for_public == 1)[0];
    }

    if (this.selected_type_preoccupation == 0) {
      AppSweetAlert.simpleAlert(
        'info',
        'Sélectionner le type de requête',
        'Champ obligatoire'
      );
    } else if (!value.idEntite) {
      AppSweetAlert.simpleAlert(
        'info',
        'Sélectionner la structure destinatrice',
        'Champ obligatoire'
      );
    } else if (!value.contact) {
      AppSweetAlert.simpleAlert(
        'info',
        'Renseigner le contact',
        'Champ obligatoire'
      );
    } else if (this.mat_aff == true && value.matricule == '') {
      AppSweetAlert.simpleAlert(
        'info',
        'Renseigner le matricule',
        'Champ obligatoire'
      );
    } else if (
      (value.idPrestation == '' || value.idPrestation == null) &&
      this.link_to_prestation == 1
    ) {
      AppSweetAlert.simpleAlert(
        'info',
        'Sélectionner la prestation',
        'Champ obligatoire'
      );
    } else if (!value.objet) {
      AppSweetAlert.simpleAlert(
        'info',
        "Renseigner l'objet",
        'Champ obligatoire'
      );
    } else if (!value.msgrequest) {
      AppSweetAlert.simpleAlert(
        'info',
        'Renseigner le message',
        'Champ obligatoire'
      );
    } else {
      let interfa = null;
      let idReg = null;
      let idEsWha = null;
      let natur = null;
      interfa = this.link_to_prestation == 1 ? 'USAGER' : 'SRU';
      idReg = '';
      if (this.selected_data_Whats == null) {
        natur = 5; //En ligne
      } else {
        natur = 12; //WhatsApp
        idEsWha = this.selected_data_Whats.id;
      }

      var param = {
        objet: value.objet,
        contact: value.contact,
        mailPfc: this.user.email,
        link_to_prestation: this.link_to_prestation,
        idPrestation: this.link_to_prestation == 0 ? '435' : value.idPrestation, //cas d'une requete
        nbreJours: service == null ? 0 : service.nbreJours,
        msgrequest: value.msgrequest,
        idregistre: idReg,
        idEchanWhat: idEsWha,
        email: value.mailUs,
        matricule: this.mat_aff == true ? value.matricule : '',
        natureRequete: natur,
        // nom:this.user.agent_user.nomprenoms, natureRequete
        nom: '',
        tel: '',
        idDepartement: '',
        interfaceRequete: interfa,
        idUser: this.user.id,
        idEntite: value.idEntite,
        plainte: value.plainte,
        visible: this.visible,
        // visible: 1
      };

      this.loading=true
      this.user_auth_service
        .createrequeteusager(param)
        .subscribe((rest: any) => {
                this.loading=false

          this.loadRequest();
          this.visible = 0;
          this.modalService.dismissAll();
          if (rest.data?.status == 'error') {
            AppSweetAlert.simpleAlert('info', 'Erreur', rest.data?.message);
          } else {
            if (param.visible == 0) {
              AppSweetAlert.simpleAlert(
                'info',
                'Ajout requête',
                'Requête ajoutée avec succès'
              );
            } else {
                    this.loading=false

              AppSweetAlert.simpleAlert(
                'info',
                'Ajout requête',
                'Requete ajouté et transmis avec succès'
              );
            }
          }
        });
      this.selected_data_rvMat = '';
      this.selected_data_Whats = '';
    }
  }
  addReponse(value: any) {
    if (value.reponse_whats == '') {
      AppSweetAlert.simpleAlert(
        'info',
        'Renseigner la réponse à cette discusion',
        'Champ obligatoire'
      );
      return;
    } else {
      let formData = new FormData();
      formData.append('reponse', value.reponse_whats);
      formData.append('fichier', this.file);
      this.loading=true

      this.user_auth_service
        .updateWhatsReponse(formData, this.selected_data_Whats.id)
        .subscribe((res: any) => {
                this.loading=false

          if (res.status == 'error') {
            AppSweetAlert.simpleAlert('info', 'Erreur', res.message);
          } else {
            this.loadWhatsApp();
            AppSweetAlert.simpleAlert(
              'info',
              "Réponse d'une discussion whatsapp",
              'Réponse donnée avec succès'
            );
          }
          this.modalService.dismissAll();
        },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });
      this.selected_data_rvMat = '';
      this.selected_data_Whats = '';
    }
  }

  saveRequeteusager(value: any) {
    let service: any = null;
    if (this.link_to_prestation == 1) {
      service = this.services.filter(
        (e: any) => e.id == value.idPrestation2
      )[0];
    } else {
      service = this.services.filter((e: any) => e.hide_for_public == 1)[0];
    }
    if (this.selected_type_preoccupation == 0) {
      AppSweetAlert.simpleAlert(
        'info',
        'Sélectionner le type de requête',
        'Champ obligatoire'
      );
    } else if (!value.idEntite2) {
      AppSweetAlert.simpleAlert(
        'info',
        'Sélectionner la structure destinatrice',
        'Champ obligatoire'
      );
    } else if (!value.contact2) {
      AppSweetAlert.simpleAlert(
        'info',
        'Renseigner le contact',
        'Champ obligatoire'
      );
    } else if (this.mat_aff == true && value.matricul == '') {
      AppSweetAlert.simpleAlert(
        'info',
        'Renseigner le matricule',
        'Champ obligatoire'
      );
    } else if (
      (value.idPrestation2 == '' || value.idPrestation2 == null) &&
      this.link_to_prestation == 1
    ) {
      AppSweetAlert.simpleAlert(
        'info',
        'Sélectionner la prestation',
        'Champ obligatoire'
      );
    } else if (!value.objet2) {
      AppSweetAlert.simpleAlert(
        'info',
        "Renseigner l'objet",
        'Champ obligatoire'
      );
    } else if (!value.msgrequest2) {
      AppSweetAlert.simpleAlert(
        'info',
        'Renseigner le message',
        'Champ obligatoire'
      );
    } else {
      var param = {
        objet: value.objet2,
        id: this.selected_data_req.id,
        contact: value.contact2,
        mailPfc: this.user.email,
        link_to_prestation: this.link_to_prestation,
        idPrestation:
          this.link_to_prestation == 0 ? '435' : value.idPrestation2, //cas d'une requete
        nbreJours: service == null ? 0 : service.nbreJours,
        msgrequest: value.msgrequest2,
        email: value.mailUs2,
        matricule: this.mat_aff == true ? value.matricul : '',
        // nom:this.user.agent_user.nomprenoms,
        nom: '',
        tel: '',
        idDepartement: '',
        interfaceRequete: this.link_to_prestation == 1 ? 'USAGER' : 'SRU',
        idUser: this.user.id,
        idEntite: value.idEntite2,
        plainte: value.plainte2,
        visible: this.visible,
      };
      this.loading=true

      this.user_auth_service
        .Updaterequeteusager(param, this.selected_data_req.id)
        .subscribe((rest: any) => {
                this.loading=false

          this.loadRequest();
          this.visible = 0;
          this.modalService.dismissAll();
          if (rest.status == 'error') {
            AppSweetAlert.simpleAlert('info', 'Erreur', rest.message);
          } else {
            if (param.visible == 0) {
              AppSweetAlert.simpleAlert(
                'info',
                'Modification requête',
                'Requête modifiée avec succès'
              );
            } else {
              AppSweetAlert.simpleAlert(
                'info',
                'Modification requête',
                'Requete modifiée et transmis avec succès'
              );
            }
          }
        },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });
    }
  }

  transmettreRequete() {
    if (this.selected_data_req == null) {
      AppSweetAlert.simpleAlert(
        'info',
        'Erreur',
        'Veuillez selectionnez un élément puis réessayer'
      );
      return;
    }
    if (this.selected_data_req.visible == 1) {
      AppSweetAlert.simpleAlert(
        'info',
        'Erreur',
        'Vous avez déjà transmis cette requête.'
      );
      return;
    }
    var msgConfirm = 'Voulez-vous transmettre la requête ?';
    var confirmResult = confirm(msgConfirm);
    if (confirmResult === false) return;

    var param = {
      idRequete: this.selected_data_req.id,
      idEntite: this.selectedEntie,
      fichier_requete: this.selected_data_req.request_file_data,
    };
 this.loading=true
    this.user_auth_service
      .transmettreRequeteExterne(param)
      .subscribe((res: any) => {
        this.modalService.dismissAll();
        this.loadRequest();
        AppSweetAlert.simpleAlert(
          'info',
          'Transmission requête',
          'Requête transmise avec succès'
        );
      },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });
  }
  addRequeteRv(value: any) {
    if (value.contactMatri == '') {
      AppSweetAlert.simpleAlert(
        'info',
        'Renseigner le matricule ou le contact du visiteur',
        'Champ obligatoire'
      );
    } else if (!value.plainterv) {
      AppSweetAlert.simpleAlert(
        'info',
        'Sélectionner le type',
        'Champ obligatoire'
      );
    } else if (value.nom_pre_rv == '') {
      AppSweetAlert.simpleAlert(
        'info',
        'Renseigner le nom et prénom (s) du visiteur',
        'Champ obligatoire'
      );
    } else if (!value.idEntite) {
      AppSweetAlert.simpleAlert(
        'info',
        'Sélectionner la structure destinatrice',
        'Champ obligatoire'
      );
    } else if (value.preoccurv == '' || value.preoccurv == null) {
      AppSweetAlert.simpleAlert(
        'info',
        'Renseigner la préoccupation du visiteur',
        'Champ obligatoire'
      );
    } else if (value.satisfaitrv == '') {
      AppSweetAlert.simpleAlert(
        'info',
        'Sélectionner une appréciation',
        'Champ obligatoire'
      );
    } else if (value.satisfaitrv && value.observarv == '') {
      AppSweetAlert.simpleAlert(
        'info',
        "Renseigner l'observation",
        'Champ obligatoire'
      );
    } else {
      var param = {
        contactMatri: value.contactMatri,
        plainterv: value.plainterv,
        nom_pre_rv: value.nom_pre_rv,
        idEntite: value.idEntite,
        preoccurv: value.preoccurv,
        idUser: this.user.id,
        satisfaitrv: value.satisfaitrv,
        created_at:
          this.dateACloture == '' ? new Date() : new Date(this.dateACloture),
        observarv: value.observarv,
      };

      this.user_auth_service
        .createrequeteVisite(param)
        .subscribe((res: any) => {
          if (res.status == 'error') {
            AppSweetAlert.simpleAlert('info', 'Erreur', res.message);
          } else {
            this.loadRequestrv();

            AppSweetAlert.simpleAlert(
              'info',
              'Ajout requête',
              'Visite ajoutée avec succès'
            );
          }
          this.modalService.dismissAll();
        },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });
    }
  }

  openDetailModal(event: any, content: any) {
    this.detailpiece = [];
    this.user_auth_service
      .getServPiece(event.target.value)
      .subscribe((res: any) => {
        this.detailpiece = res?.data;
      },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });

    // this.modalService
    //   .open(content, { ariaLabelledBy: 'modal-basic-title' })
    //   .result.then(
    //     (result) => {
    //       this.closeResult = `Closed with: ${result}`;
    //     },
    //     (reason) => {
    //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //     }
    //   );
  }

  setNotif() {
    this.user_auth_service.setNotif({}).subscribe(
      (res: any) => {},
      (err: any) => {
        this.loading = false;
        // console.log(err)
        // AppSweetAlert.simpleAlert("info","Applications","Echec de récupération des applications","error")
      }
    );
  }

  init(page: any) {
    this.selected_traiteWha = 'non';

    // console.log(this.user)
    this.loadRequest();
    this._temp = [];
    this.data = [];
    this.user_auth_service.getAll(null, page).subscribe((res: any) => {
      // this.spinner.hide();
      this.data = res.data;
      this._temp = this.data;
      this.subject.next(res);
    },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });

    this.departements = [];
    this.user_auth_service.getAllDepartement().subscribe((res: any) => {
      this.departements = res.data;
    },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });

    this.institutions = [];
    this.user_auth_service.getAllInstitu().subscribe((res: any) => {
      this.institutions = res.data;
    },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });

    this.prepare(this.user.idEntite);
  }

  file: string | Blob = '';
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  openEditModalCloture(content: any) {
    if (this.dateACloture == '') {
      AppSweetAlert.simpleAlert(
        'info',
        'Erreur',
        'Veuillez selectionnez la date à clôturer'
      );
      return;
    }
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

  openEditModalVisi(content: any) {
    if (this.nbreDay.length != 0 && this.dateACloture == '') {
      AppSweetAlert.simpleAlert(
        'info',
        'Erreur',
        'Veuillez clôturer les régistres des dates précédentes'
      );
      return;
    }
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

  openEditModalWhatsApp(content: any) {
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

  openEditModalAdd(content: any) {
    this.selected_data_Whats = null;
    this.selected_data_rvMat = null;
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

  openEditModal(content: any) {
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

  openEditModalAddRv(content: any) {
    this.selected_data_Whats = null;
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

  openEditModalLg(content: any) {
    if (this.selected_data_req == null) {
      AppSweetAlert.simpleAlert(
        'info',
        'Erreur',
        'Veuillez selectionnez un élément puis réessayer'
      );
      return;
    }
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

  // --------------------------------------------------------_______________________-------------- LISTE DES REQUETES
  searchTextReq = '';
  searchTextReqrv = '';
  searchTextWhats = '';
  selected_Status = '';
  selected_satist = '';
  selected_traiteWha = '';

  show_actions = true;
  show_actionsrv = true;
  show_actionsWhats = true;
  selected_data_req: any;
  selected_data_reqrv: any;
  selected_data_Whats: any;
  selected_data_rvMat: any;
  selectedEntie: any = null;
  visible = 0;
  pageSize = 10;
  pageSizerv = 100;
  collectionSize = 0;
  collectionSizerv = 0;
  collectionSizeWhats = 0;
  dataReq: any[] = [];
  dataReqrv: any[] = [];
  dataWhats: any[] = [];
  etapes: any[] = [];
  _tempReq: any[] = [];
  _tempReqrv: any[] = [];
  _tempWhats: any[] = [];
  // pageReq = 1;
  institutions: any = [];
  nbreDay: any = [];
  dateACloture = '';
  errormessage = '';

  searchReq() {
    this.dataReq = this._tempReq.filter((r) => {
      const term = this.searchTextReq.toLowerCase();
      const stat = this.selected_Status;
      return (
        (r.objet.toLowerCase().includes(term) ||
          r.msgrequest.toLowerCase().includes(term)) &&
        r.traiteOuiNon == stat
      );
    });
    this.collectionSize = this.dataReq.length;
  }

  searchReqrv() {
    this.dataReqrv = this._tempReqrv.filter((r) => {
      const term = this.searchTextReqrv.toLowerCase();
      const stat = this.selected_satist;
      if (this.dateACloture == '') {
        return (
          (r.nom_prenom.toLowerCase().includes(term) ||
            r.matri_telep.toLowerCase().includes(term) ||
            r.contenu_visite.toLowerCase().includes(term)) &&
          r.satisfait.toLowerCase().includes(stat)
        );
      } else {
        return (
          (r.nom_prenom.toLowerCase().includes(term) ||
            r.matri_telep.toLowerCase().includes(term) ||
            r.contenu_visite.toLowerCase().includes(term)) &&
          r.satisfait.toLowerCase().includes(stat) &&
          r.created_at.includes(this.dateACloture)
        );
      }
    });
    this.collectionSizerv = this.dataReqrv?.length;
  }

  searchWhats() {
    this.dataWhats = this._tempWhats.filter((r) => {
      const term = this.searchTextWhats.toLowerCase();
      const trai = this.selected_traiteWha;
      return (
        r.numerowhatsapp.toLowerCase().includes(term) ||
        r.discussions.toLowerCase().includes(term)
      );
    });
    // const term = this.searchTextWhats.toLowerCase();
    // this.user_auth_service.getAllForWhatsapp(1,term,this.selected_traiteWha).subscribe((res: any) => {
    //   this.dataWhats = res
    //   this._tempWhats = this.dataWhats
    //   this.collectionSizeWhats = this.dataWhats?.length
    // })
    this.collectionSizeWhats = this.dataWhats?.length;
  }

  dropRequeteusager() {
    if (this.selected_data_req == null) {
      AppSweetAlert.simpleAlert(
        'info',
        'Erreur',
        'Veuillez selectionnez un élément puis réessayer'
      );
      return;
    }
    if (this.selected_data_req.visible == 1) {
      AppSweetAlert.simpleAlert(
        'info',
        'Erreur',
        'Vous ne pouvez plus supprimer cette requête. Elle est déjà en cours de traitement.'
      );
      return;
    }
    AppSweetAlert.confirmBox(
      'info',
      'Suppression requete',
      'Cette action est irreversible. Voulez-vous continuer ?'
    )
    .then((result: any) => {
      if (result.value) {
        this.user_auth_service.deleteReq(this.selected_data_req.id).subscribe(
          (res: any) => {
            this.loadRequest();
            AppSweetAlert.simpleAlert(
              'info',
              'Suppression requete',
              'Suppression effectuée avec succès'
            );
          },
          (err) => {
            AppSweetAlert.simpleAlert(
              'info',
              'Suppression requete',
              err.error.message
            );
          }
        );
      }
    },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });
  }

  loadRequest() {
    this._tempReq = [];
    this.dataReq = [];
    // this.dataNTreq = []
    this.user_auth_service
      .getAllForPfcom(this.user.id, 1)
      .subscribe((res: any) => {
        this.dataReq = res.data;
        this._tempReq = this.dataReq;
        this.collectionSize = this.dataReq.length;
      });
    this.ChechEtape();
  }

  loadRequestrv() {
    // console.log(this.user)
    this._tempReqrv = [];
    this.dataReqrv = [];
    this.user_auth_service
      .getAllForRegistreVis(this.user.id, 1)
      .subscribe((res: any) => {
        this.dataReqrv = res.data;
        this._tempReqrv = this.dataReqrv;
        this.collectionSizerv = this.dataReqrv?.length;
      },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });
    // this.ChechEtape();

    this.nbreDay = [];
    this.user_auth_service.getListDay(this.user.id).subscribe((res: any) => {
      res.forEach((element: any) => {
        let date = new Date(element);
        let dayOfWeek = date.getDay();

        if (dayOfWeek != 6 && dayOfWeek != 0) {
          this.nbreDay.push(element);
        }
      });
    },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });
  }

  loadWhatsApp() {
    // console.log(this.user)
    this._tempWhats = [];
    this.dataWhats = [];
    this.user_auth_service
      .getAllForWhatsapp(1, this.selected_traiteWha)
      .subscribe((res: any) => {
        this.dataWhats = res;
        this._tempWhats = this.dataWhats;
        this.collectionSizeWhats = this.dataWhats?.length;
      },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });
    this.searchTextWhats = '';
  }
  prepare(idEntite: any) {
    this.structures = [];
    this.user_auth_service.getAllServ(1, idEntite).subscribe((res: any) => {
      this.structures = res?.data;
    },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });

    this.natures = [];
    this.user_auth_service.getAllNatu(idEntite).subscribe((res: any) => {
      this.natures = res?.data;
    },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });

    this.themes = [];
    this.user_auth_service.getAllThe(idEntite).subscribe((res: any) => {
      this.themes = res?.data;
    },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });
  }
  onEntiteChange(event: any) {
    this.selectedEntie = event.target.value;
    this.prepare(this.selectedEntie);
  }

  ChechEtape() {
    this.etapes = [];
    this.user_auth_service.getAllEtap(0).subscribe((res: any) => {
      this.etapes = res.data;
    },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });
  }

  setVisible() {
    this.visible = 1;
  }

  checkedReq(event: any, el: any) {
    this.selected_data_req = el;
    console.log('-----------------------');
    console.log(el);
    this.selected_type_preoccupation = el.plainte;
    this.link_to_prestation = el.link_to_prestation;
    if (el.visible == 0) {
      this.show_actions = true;
    } else {
      this.show_actions = false;
    }
    this.selectedEntie = el.idEntite;

    this.user_auth_service
      .getAllThe(this.selected_data_req.idEntite)
      .subscribe((res: any) => {
        this.themes = res;
      },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });
    if (
      this.selected_data_req.service.type.libelle == 'Formation' ||
      this.selected_data_req.service.type.libelle == 'Carrière'
    ) {
      this.mat_aff = true;
    } else {
      this.mat_aff = false;
    }
    // this.user_auth_service.getThema(this.selected_data_req).subscribe((res:any)=>{
    //   this.descrCarr = res.descr
    // })
    this.user_auth_service
      .getAllTypePrest(this.selected_data_req.service.idType,this.selected_data_req.idEntite)
      .subscribe((res: any) => {
        this.services = res.data;
      },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });
  }

  checkedReqrv(event: any, el: any) {
    this.selected_data_reqrv = el;
  }

  checkedWhatsap(event: any, el: any) {
    this.selected_data_Whats = el;
  }

  checkedRv_Mat(event: any, el: any) {
    this.selected_data_rvMat = el;
    this.selected_type_preoccupation = el.plainte;
  }

  openEditModalrv(content: any) {
    this.loading = false;
    if (this.selected_data_reqrv != null) {
      // this.prepare(this.selectedEntie)
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
        'info',
        'Erreur',
        'Veuillez selectionnez un élément puis réessayer'
      );
    }
  }

  openEditModalWhats(content: any) {
    this.loading = false;
    if (this.selected_data_Whats != null) {
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
        'info',
        'Erreur',
        'Veuillez selectionnez un élément puis réessayer'
      );
    }
  }

  dropRequeteusagerrv() {
    if (this.selected_data_reqrv == null) {
      AppSweetAlert.simpleAlert(
        'info',
        'Erreur',
        'Veuillez selectionnez un élément puis réessayer'
      );
      return;
    } else if (this.selected_data_reqrv.cloture == 1) {
      AppSweetAlert.simpleAlert(
        'info',
        'Erreur',
        'Impossible de supprimer ce régistre car il est déjà cloturé'
      );
      return;
    }
    AppSweetAlert.confirmBox(
      'Suppression cette visite',
      'Cette action est irreversible. Voulez-vous continuer ?'
    ).then((result: any) => {
      if (result.value) {
        this.user_auth_service
          .deleteRegistreVis(this.selected_data_reqrv.id)
          .subscribe(
            (res: any) => {
              this.loadRequestrv();
              AppSweetAlert.simpleAlert(
                'info',
                'Suppression visite',
                'Suppression effectuée avec succès'
              );
            },
            (err: any) => {
              AppSweetAlert.simpleAlert(
                'info',
                'Suppression visite',
                err.error.message
              );
            }
          );
      }
    },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });
  }

  dropDiscussionWhat() {
    if (this.selected_data_Whats == null) {
      AppSweetAlert.simpleAlert(
        'info',
        'Erreur',
        'Veuillez selectionnez un élément puis réessayer'
      );
      return;
    }
    AppSweetAlert.confirmBox(
      'Suppression cette discussion',
      'Cette action est irreversible. Voulez-vous continuer ?'
    ).then((result: any) => {
      if (result.value) {
        this.user_auth_service
          .deleteDiscWhats(this.selected_data_Whats.id)
          .subscribe(
            (res: any) => {
              this.loadWhatsApp();
              AppSweetAlert.simpleAlert(
                'info',
                'Suppression discussions',
                'Suppression effectuée avec succès'
              );
            },
            (err: any) => {
              AppSweetAlert.simpleAlert(
                'info',
                'Suppression discussions',
                err.error.message
              );
            }
          );
      }
    },(err: any) => {
          this.loading=false
           AppSweetAlert.simpleAlert(
        'error',
        'Erreur',
        err.error?.message
      );
        });
  }

  ConfirmerTraitement(el: any) {
    AppSweetAlert.confirmBox(
      "Confirmer l'ajout",
      'Souhaitez-vous ajouter cette discussion dans mataccueil ?'
    ).then((result: any) => {
      if (result.value) {
        this.user_auth_service
          .ConfirmerDiscWhats(this.user.id, el.id)
          .subscribe(
            (res: any) => {
              if (res.status == 'error') {
                AppSweetAlert.simpleAlert('info', 'Erreur', res.message);
              } else {
                this.loadWhatsApp();
                AppSweetAlert.simpleAlert(
                  'info',
                  "Confirmer l'ajout",
                  'Confirmation effectuée avec succès'
                );
              }
            },
            (err: any) => {
              AppSweetAlert.simpleAlert(
                'info',
                "Confirmer l'ajout",
                err.error.message
              );
            }
          );
      }
    });
  }
}
