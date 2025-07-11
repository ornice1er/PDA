import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { SampleSearchPipe } from '../../../core/pipes/sample-search.pipe';
import { ApplicationService } from '../../../core/services/application.service';
import { AuthService } from '../../../core/services/auth.service';
import { IpServiceService } from '../../../core/services/ip-service.service';
import { PdaService } from '../../../core/services/pda.servic';
import { StatusService } from '../../../core/services/status.service';
import { AppSweetAlert } from '../../../core/utils/app-sweet-alert';
import { GlobalName } from '../../../core/utils/global-name';
import { LocalStorageService } from '../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { StatutComponent } from '../../components/statut/statut.component';
import { AppRedirect } from '../../../core/utils/app-redirect';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log-usager',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    LoadingComponent,
    SampleSearchPipe,
    NgSelectModule,
    NgxPaginationModule,
    StatutComponent,
    RouterModule,
  ],
  templateUrl: './log-usager.component.html',
  styleUrls: ['./log-usager.component.css'],
})
export class LogUsagerComponent implements OnInit {
  loading: any = false;
  visitor: boolean = false;
  client_id: string | undefined;
  client_secret: string | undefined;
  needMailCheck: boolean = false;
  email: string | undefined;
  showPassword = false;
  loginForm: FormGroup;

  ipAddress: string | undefined;
  constructor(
    private user_auth_service: AuthService,
    private local_service: LocalStorageService,
    private router: Router,
    private fb: FormBuilder,
    private ip: IpServiceService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.getIP();
  }
  getIP() {
    this.ip.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.data;
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Login attempt:', this.loginForm.value);
      let payload = this.loginForm.value;
      this.loading = true;

      this.email = payload['email'];
      payload['ip'] = this.ipAddress;
      payload.username = payload['email'];
      delete payload['email'];
      this.user_auth_service.login(payload).subscribe(
        (res: any) => {
          if (res.check_code) {
            var data = res.params;
            this.local_service.set(GlobalName.params, data);
            this.router.navigate(['/auth/check-code']);
          } else {
            this.local_service.set(GlobalName.tokenName, res.access_token);
            this.local_service.set(GlobalName.userName, res.user);
            this.user_auth_service.setUserLoggedIn(true);

            if (res.user.active) {
              this.loading = false;
              this.router.navigate(['/admin/home']);
            } else {
              this.router.navigate(['/main']);
            }
          }
        },
        (err) => {
          this.loading = false;

          AppSweetAlert.simpleAlert('Connexion', 'Echec de connexion', 'error');
        }
      );
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  // loginSend(value: any) {
  //   this.loading = true;

  //   this.email = value['email'];
  //   value['ip'] = this.ipAddress;
  //   this.user_auth_service.login(value).subscribe(
  //     (res: any) => {
  //       if (res.check_code) {
  //         var data = res.params;
  //         this.local_service.set(GlobalName.params, data);
  //         this.router.navigate(['/auth/check-code']);
  //       } else {
  //         this.local_service.set(GlobalName.tokenName, res.access_token);
  //         this.local_service.set(GlobalName.userName, res.user);
  //         this.user_auth_service.setUserLoggedIn(true);

  //         if (res.user.active) {
  //           this.loading = false;
  //           this.router.navigate(['/admin/home']);
  //         } else {
  //           this.router.navigate(['/main']);
  //         }
  //       }
  //     },
  //     (err) => {
  //       this.loading = false;

  //       AppSweetAlert.simpleAlert('Connexion', 'Echec de connexion', 'error');
  //     }
  //   );
  // }
}
