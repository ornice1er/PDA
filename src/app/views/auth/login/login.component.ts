import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { AppRedirect } from '../../../core/utils/app-redirect';
import { GlobalName } from '../../../core/utils/global-name';
import { LocalStorageService } from '../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../components/loading/loading.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ReactiveFormsModule, RouterModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading = false;
  showPassword = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private lsService: LocalStorageService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

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
    payload['device'] = 'web';
    this.authService.login(payload).subscribe(
      (res: any) => {
        this.lsService.set(GlobalName.tokenName, res.data?.access_token);
        this.lsService.set(
          GlobalName.refreshTokenName,
          res.data?.refresh_token
        );
        this.lsService.set(GlobalName.expireIn, res.data?.expire_in);
        this.lsService.set(GlobalName.features, res.data?.features);
        this.authService.me().subscribe(
          (res: any) => {
            this.loading = false;
            this.lsService.set(GlobalName.userName, res.data);
            //  this.lsService.set(GlobalName.features,res.data?.features);
            // this.router.navigate(['/admin/dashboard'])
            let url = AppRedirect.redirectLogin(this.lsService);

            this.router.navigate([url]);
            this.toastr.success('Connexion réussie', 'Connexion');
          },
          (err: any) => {
            this.loading = false;
            this.toastr.error(err.error?.message, 'Connexion');
          }
        );
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error(err.error?.message, 'Connexion');
      }
    );
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  // login(value: any) {
  //   this.loading = true;
  //   value['device'] = 'web';
  //   this.authService.login(value).subscribe(
  //     (res: any) => {
  //       this.lsService.set(GlobalName.tokenName, res.data?.access_token);
  //       this.lsService.set(
  //         GlobalName.refreshTokenName,
  //         res.data?.refresh_token
  //       );
  //       this.lsService.set(GlobalName.expireIn, res.data?.expire_in);
  //       this.lsService.set(GlobalName.features, res.data?.features);
  //       this.authService.me().subscribe(
  //         (res: any) => {
  //           this.loading = false;
  //           this.lsService.set(GlobalName.userName, res.data);
  //           //  this.lsService.set(GlobalName.features,res.data?.features);
  //           // this.router.navigate(['/admin/dashboard'])
  //           let url = AppRedirect.redirectLogin(this.lsService);

  //           this.router.navigate([url]);
  //           this.toastr.success('Connexion réussie', 'Connexion');
  //         },
  //         (err: any) => {
  //           this.loading = false;
  //           this.toastr.error(err.error?.message, 'Connexion');
  //         }
  //       );
  //     },
  //     (err: any) => {
  //       this.loading = false;
  //       this.toastr.error(err.error?.message, 'Connexion');
  //     }
  //   );
  // }
}
