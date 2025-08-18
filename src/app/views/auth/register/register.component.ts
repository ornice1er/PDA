import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthService } from '../../../core/services/auth.service';
import { IpServiceService } from '../../../core/services/ip-service.service';
import { StatusService } from '../../../core/services/status.service';
import { AppSweetAlert } from '../../../core/utils/app-sweet-alert';
import { GlobalName } from '../../../core/utils/global-name';
import { LocalStorageService } from '../../../core/utils/local-stoarge-service';
import { WindowRef } from '../../../core/utils/window-ref.service';
import { SharedModule } from '../../../shared/shared.module';
import { RadioButtonClickEvent } from 'primeng/radiobutton';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    NgxPaginationModule,
    SharedModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  loading: boolean | undefined;
  status: any;
  struct: any;
  // types: { id: number; name: string }[] = [
  //   {
  //     id: 1,
  //     name: "Agent de l'État",
  //   },
  //   {
  //     id: 2,
  //     name: "Entreprise privée",
  //   },
  //   {
  //     id: 3,
  //     name: "Entreprise publique",
  //   },
  //   {
  //     id: 4,
  //     name: "Particulier",
  //   },
  // ];
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
    private status_service: StatusService,
    private user_auth_service: AuthService,
    private local_service: LocalStorageService,
    private windowRef: WindowRef,
    private fb: FormBuilder,
    private router: Router,
    private ip: IpServiceService
  ) {
    this.registerForm = this.fb.group(
      {
        lastname: ['', [Validators.required, Validators.minLength(2)]],
        firstname: ['', [Validators.required, Validators.minLength(2)]],
        birthday: [''],
        phone: [
          '',
          [Validators.required, Validators.pattern(/^\+22901[0-9]{8}$/)],
        ],
        status_id: [4, Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_confirmation: ['', Validators.required],
        confidfor: [false, Validators.requiredTrue],
        company: [''],
        rccm: [''],
        ifu: [''],
        matricule: [''],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  getIP() {
    this.ip.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.data;
    });
  }
  ngOnInit(): void {
    this.windowRef.nativeWindow?.scroll(0, 0);
    this.getIP();
    this.status_service.getAll().subscribe((res: any) => {
      this.status = res.data;
    });
    this.status_service.getAllStruc().subscribe((res: any) => {
      this.struct = res.data;
    });
  }

  addField(event: RadioButtonClickEvent) {
    if (event.value == 1 || event.value == 6) {
      this.isAgent = true;
      // this.isInstitu = true;
      this.needIfu = false;
      this.needRcm = false;
    } else if (event.value == 2) {
      this.isAgent = false;
      // this.isInstitu = false;
      this.needIfu = true;
      this.needRcm = true;
    } else if (event.value == 3) {
      this.isAgent = false;
      // this.isInstitu = false;
      this.needIfu = true;
      this.needRcm = false;
    } else if (event.value == 4) {
      this.isAgent = false;
      // this.isInstitu = false;
      this.needIfu = false;
      this.needRcm = false;
    }
  }

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
    const step1Fields = ['lastname', 'firstname', 'phone', 'status_id'];
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
      ['lastname', 'firstname', 'phone', 'status_id'].forEach((field) => {
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
      console.log('Registration data:', this.registerForm.value);
      this.loading =true;
      let payload = this.registerForm.value;
      payload['ip'] = this.ipAddress;
      this.user_auth_service.register(payload).subscribe(
        (res: any) => {
          this.loading = false;
          // if (res.user.is_active) {
          //   this.local_service.set(GlobalName.token, res.token);
          //   this.local_service.set(GlobalName.current_user, res.user);
          //   this.router.navigate(['/main']);
          // } else {
          //   localStorage.setItem('is_registered', '');
          //   this.router.navigate(['/auth/register-success']);
          // }
          AppSweetAlert.simpleAlert(
            'success',
            'Inscription',
            'Inscription effectuée avec succès. Vous pouvez à présent vous connecter'
            
          );
          this.router.navigate(['/auth/logusager']);
        },
        (err: any) => {
          this.loading = false;
          let message = '';
          err.error.errors.forEach((element: any) => {
            message = message + ' ' + element;
          });
          console.log(message);
          AppSweetAlert.simpleAlert(
            'error',
            'Inscription',
            "Echec d'inscription, " + message
            
          );
        }
      );
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.registerForm.controls).forEach((key) => {
        this.registerForm.get(key)?.markAsTouched();
      });
    }
  }
}
