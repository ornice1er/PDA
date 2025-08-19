import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  standalone: true,
  imports: [LoadingComponent, FormsModule, SharedModule],
  styleUrls: ['./recovery-password.component.css'],
})
export class RecoveryPasswordComponent implements OnInit {
  loading: any;
  token: any;
  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_confirmation: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.registerForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_confirmation: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
    if (this.token === undefined) {
      this.router.navigate(['/admin/login']);
    }
  }

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

   togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

   toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }


  recoverPassword() {
    // if (value.password != value.password_confirmation) {
    //   this.toastr.error(
    //     'Nouveaux mots de passe non identique',
    //     'Mot de passe oublié'
    //   );
    //   return;
    // }
    this.loading = true;
    this.authService.resetPasswordUser(this.token, this.registerForm.value).subscribe(
      (res: any) => {
        this.loading = false;
        this.router.navigate(['/auth/logusager']);
        this.toastr.success(
          'Mot de passe oublié',
          'Changement de mot de passe réussi'
        );
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error(
          err?.error?.message,
          'Changement de mot de passe échoué'
        );
      }
    );
  }
}
