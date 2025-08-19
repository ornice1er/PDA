import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  standalone: true,
  imports: [
    LoadingComponent,
    FormsModule,
    RouterModule,
    SharedModule,
    CommonModule,
  ],
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  loading: any;
  mailSent = false;
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

   isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  sendMail() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.forgetPassword(this.loginForm.value).subscribe(
        (res: any) => {
          this.loading = false;
          this.mailSent = true;
          this.toastr.success('Récupérqtion de mot de passe réussi.', 'Récupérqtion de mot de passe');
        },
        (err: any) => {
          this.loading = false;
          this.toastr.error('Récupérqtion de mot de passe échoué', 'Récupérqtion de mot de passe');
        }
      );
    }
  }
}
