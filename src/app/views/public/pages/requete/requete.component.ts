import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  Validators,
} from '@angular/forms';
import {
  ModalDismissReasons,
  NgbModal,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { AuthService } from '../../../../core/services/auth.service';
import { PdaService } from '../../../../core/services/pda.servic';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { RadioButtonClickEvent } from 'primeng/radiobutton';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-requete',
  templateUrl: './requete.component.html',
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
    SharedModule,
  ],
  styleUrls: ['./requete.component.css'],
})
export class RequeteComponent implements OnInit {
  loading: boolean = false;
  link_to_prestation = 0;
  selected_type_preoccupation = 0;
  themes: any[] = [];
  services: any[] = [];
  onglet_What = false;
  mat_aff = false;
  is_administrative_officer = 1;
  selectedEntie: any = null;
  errormessage = '';
  selected_data_rvMat: any;
  structures: any[] = [];
  natures: any[] = [];
  institutions: any[] = [];
  descrCarr: any[] = [];
  detailpiece: any[] = [];
  closeResult = '';
  //onverra
  status: any[] = [
    {
      id: 1,
      name: 'Oui',
    },
    {
      id: 0,
      name: 'Non',
    },
  ];
  needIfu: boolean = false;
  needRcm: boolean = false;
  isAgent: boolean = false;
  isInstitu: boolean = false;
  default_status: number = 4;
  company: number | undefined;
  ipAddress: string | undefined;
  currentStep = 1;
  showPassword = false;
  showConfirmPassword = false;
  registerForm: FormGroup;

  constructor(
    private pdaService: PdaService,
    private user_auth_service: AuthService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      objet: [''],
      idPrestation: [''],
      ifu: [''],
      matricule: [''],
      nbreJours: [''],
      msgrequest: [''],
      idEntite: [''],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      tel: ['', [Validators.required, Validators.pattern(/^\+22901[0-9]{8}$/)]],
      link_to_prestation: [''],
      selected_type_preoccupation: [''],
      interfaceRequete: [''],
      plainte: [''],
      is_administrative_officer: [0, [Validators.required]],
      visible: [1],
      idType: [],
      has_consent: [true],
    });
  }

  ngOnInit(): void {
    this.institutions = [];
    this.user_auth_service.getAllInstitu().subscribe((res: any) => {
      this.institutions = res?.data;
    });
  }

  onTypeChange(event: any) {
    this.selected_type_preoccupation = +event.target.value;
  }
  showPrestation(event: RadioButtonClickEvent) {
    this.link_to_prestation = event.value;
  }
  onEntiteChange(event: any) {
    this.selectedEntie = +event.target.value;
    this.prepare(this.selectedEntie);
  }

  prepare(idEntite: any) {
    this.structures = [];
    this.user_auth_service.getAllServ(1, idEntite).subscribe((res: any) => {
      this.structures = res?.data;
    });

    this.natures = [];
    this.user_auth_service.getAllNatu(idEntite).subscribe((res: any) => {
      this.natures = res?.data;
    });

    this.themes = [];
    this.user_auth_service.getAllThe(idEntite).subscribe((res: any) => {
      this.themes = res?.data;
    });
  }

  addRequeteusager(value: any, form: NgForm) {
    let service = null;
    if (
      this.link_to_prestation === 1 ||
      this.selected_type_preoccupation === 0
    ) {
      console.log(this.services);
      service = this.services.filter(
        (e: any) => e.id === value.idPrestation
      )[0];
    } else {
      service = this.services.filter((e: any) => e.hide_for_public === 1)[0];
    }
    // if(service == null){
    //   AppSweetAlert.simpleAlert("Erreur","Aucune prestation (Service Usager) par défaut n'est lié à cet entité", 'error')
    //   return;
    // }
    var param: any = {
      objet: value.objet,
      idPrestation: this.link_to_prestation === 0 ? 0 : value.idPrestation,
      // idPrestation: this.link_to_prestation==0  ? service.id : value.idPrestation,
      nbreJours: service == null ? 0 : service.nbreJours,
      msgrequest: value.msgrequest,
      email: value.email,
      idEntite: this.selectedEntie,
      nom: value.lastname + ' ' + value.firstname,
      tel: value.phone,
      link_to_prestation: this.link_to_prestation,
      interfaceRequete: this.link_to_prestation == 1 ? 'USAGER' : 'SRU',
      plainte: value.plainte,
      matricule: this.is_administrative_officer == 1 ? value.matricule : '',
      visible: 1,
    };
    // fichierJoint
    console.log('has_consent', param);
    if (param.idEntite == null || param.idEntite == '') {
      AppSweetAlert.simpleAlert(
        'Erreur',
        'Veuillez choisir une structure destrinatrice.',
        'error'
      );
    } else if (param.plainte === null || param.plainte === '0') {
      AppSweetAlert.simpleAlert(
        'Erreur',
        'Veuillez choisir un type de préoccupation.',
        'error'
      );
    } else if (this.mat_aff === true && param.matricule.trim() === '') {
      AppSweetAlert.simpleAlert(
        'Renseigner le matricule',
        'Champ obligatoire',
        'error'
      );
    } else if (!param.objet) {
      /* else if(param.idPrestation == null || param.idPrestation == ""){
        AppSweetAlert.simpleAlert("Erreur","Veuillez choisir une prestation.", 'error')
      }*/
      AppSweetAlert.simpleAlert(
        "Renseigner l'objet",
        'Champ obligatoire',
        'error'
      );
    } else if (!param.msgrequest) {
      AppSweetAlert.simpleAlert(
        'Renseigner le message',
        'Champ obligatoire',
        'error'
      );
    } else if (!value.has_consent) {
      AppSweetAlert.simpleAlert(
        'Consentement',
        'Veuillez donner votre consentement',
        'error'
      );
    } else {
      this.loading = true;
      console.log(param);
      this.pdaService.createrequeteusager(param).subscribe((rest: any) => {
        form.resetForm();
        this.loading = false;
        if (rest.status == 'error') {
          AppSweetAlert.simpleAlert('Erreur', rest.message, 'error');
        } else {
          AppSweetAlert.simpleAlert(
            'Soumission de préoccupation',
            'Votre préoccupation a été bien transmise aux autorités compétentes',
            'success'
          );
        }
      });
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

  chargerPrestation(event: any) {
    this.services = [];
    this.user_auth_service
      .getAllTypePrest(event.target.value)
      .subscribe((res: any) => {
        this.services = res?.data;
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
      });
  }

  openDetailModal(event: any, content: any) {
    this.detailpiece = [];
    this.user_auth_service
      .getServPiece(event.target.value)
      .subscribe((res: any) => {
        this.detailpiece = res?.data;
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

  // addField(event: RadioButtonClickEvent) {
  //   if (event.value == 1 || event.value == 6) {
  //     this.isAgent = true;
  //     // this.isInstitu = true;
  //     this.needIfu = false;
  //     this.needRcm = false;
  //   } else if (event.value == 2) {
  //     this.isAgent = false;
  //     // this.isInstitu = false;
  //     this.needIfu = true;
  //     this.needRcm = true;
  //   } else if (event.value == 3) {
  //     this.isAgent = false;
  //     // this.isInstitu = false;
  //     this.needIfu = true;
  //     this.needRcm = false;
  //   } else if (event.value == 4) {
  //     this.isAgent = false;
  //     // this.isInstitu = false;
  //     this.needIfu = false;
  //     this.needRcm = false;
  //   }
  // }

  // registerSend(value: any) {
  //   this.loading = true;
  //   console.log(value);
  //   value['ip'] = this.ipAddress;
  //   this.user_auth_service.register(value).subscribe(
  //     (res: any) => {
  //       this.loading = false;
  //       if (res.user.is_active) {
  //         this.local_service.set(GlobalName.token, res.token);
  //         this.local_service.set(GlobalName.current_user, res.user);
  //         this.router.navigate(['/main']);
  //       } else {
  //         localStorage.setItem('is_registered', '');
  //         this.router.navigate(['/auth/register-success']);
  //       }
  //       AppSweetAlert.simpleAlert(
  //         'Inscription',
  //         'Inscription effectuée avec succès. Vous pouvez à présent vous connecter',
  //         'success'
  //       );
  //     },
  //     (err: any) => {
  //       this.loading = false;
  //       let message = '';
  //       err.error.errors.forEach((element: any) => {
  //         message = message + ' ' + element;
  //       });
  //       console.log(message);
  //       AppSweetAlert.simpleAlert(
  //         'Inscription',
  //         "Echec d'inscription, " + message,
  //         'error'
  //       );
  //     }
  //   );
  // }

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const password = control.get('password');
    const confirmPassword = control.get('password_confirmation');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    if (confirmPassword?.errors?.['passwordMismatch']) {
      delete confirmPassword.errors['passwordMismatch'];
      if (Object.keys(confirmPassword.errors).length === 0) {
        confirmPassword.setErrors(null);
      }
    }

    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isStep1Valid(): boolean {
    const step1Fields = ['nom', 'tel', 'email', 'is_administrative_officer'];
    return step1Fields.every((field) => {
      const control = this.registerForm.get(field);
      return control && control.valid;
    });
  }

  nextStep() {
    if (this.isStep1Valid()) {
      this.currentStep = 2;
    } else {
      // Mark step 1 fields as touched to show validation errors
      ['nom', 'tel', 'email', 'is_administrative_officer'].forEach((field) => {
        this.registerForm.get(field)?.markAsTouched();
      });
    }
  }

  previousStep() {
    this.currentStep = 1;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const value = this.registerForm.getRawValue();
      let service = null;
      this.loading = true;
      if (
        this.link_to_prestation === 1 ||
        this.selected_type_preoccupation === 0
      ) {
        console.log(this.services);
        service = this.services.filter(
          (e: any) => e.id === value.idPrestation
        )[0];
      } else {
        service = this.services.filter((e: any) => e.hide_for_public === 1)[0];
      }
      // if(service == null){
      //   AppSweetAlert.simpleAlert("Erreur","Aucune prestation (Service Usager) par défaut n'est lié à cet entité", 'error')
      //   return;
      // }
      var param: any = {
        objet: value.objet,
        idPrestation: value.link_to_prestation === 0 ? 0 : value.idPrestation,
        // idPrestation: this.link_to_prestation==0  ? service.id : value.idPrestation,
        nbreJours: service == null ? 0 : service.nbreJours,
        msgrequest: value.msgrequest,
        email: value.email,
        idEntite: value.idEntite,
        nom: value.nom,
        tel: value.tel,
        link_to_prestation: value.link_to_prestation,
        interfaceRequete: value.link_to_prestation === 1 ? 'USAGER' : 'SRU',
        plainte: value.plainte,
        matricule: value.is_administrative_officer === 1 ? value.matricule : '',
        visible: 1,
      };
      // fichierJoint
      console.log('has_consent', param);
      if (param.idEntite == null || param.idEntite == '') {
        AppSweetAlert.simpleAlert(
          'Erreur',
          'Veuillez choisir une structure destrinatrice.',
          'error'
        );
        this.loading = false;
      } else if (param.plainte === null || param.plainte === '0') {
        AppSweetAlert.simpleAlert(
          'Erreur',
          'Veuillez choisir un type de préoccupation.',
          'error'
        );
        this.loading = false;
      } else if (this.mat_aff === true && param.matricule.trim() === '') {
        AppSweetAlert.simpleAlert(
          'Renseigner le matricule',
          'Champ obligatoire',
          'error'
        );
        this.loading = false;
      } else if (!param.objet) {
        /* else if(param.idPrestation == null || param.idPrestation == ""){
        AppSweetAlert.simpleAlert("Erreur","Veuillez choisir une prestation.", 'error')
      }*/
        AppSweetAlert.simpleAlert(
          "Renseigner l'objet",
          'Champ obligatoire',
          'error'
        );
        this.loading = false;
      } else if (!param.msgrequest) {
        AppSweetAlert.simpleAlert(
          'Renseigner le message',
          'Champ obligatoire',
          'error'
        );
        this.loading = false;
      } else if (!value.has_consent) {
        AppSweetAlert.simpleAlert(
          'Consentement',
          'Veuillez donner votre consentement',
          'error'
        );
        this.loading = false;
      } else {
        console.log(param);
        this.pdaService.createrequeteusager(param).subscribe((rest: any) => {
          this.registerForm.reset();
          this.loading = false;
          if (rest.status == 'error') {
            AppSweetAlert.simpleAlert('Erreur', rest.message, 'error');
          } else {
            AppSweetAlert.simpleAlert(
              'Soumission de préoccupation',
              'Votre préoccupation a été bien transmise aux autorités compétentes',
              'success'
            );
          }
        });
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.registerForm.controls).forEach((key) => {
        this.registerForm.get(key)?.markAsTouched();
      });
    }
  }
}
