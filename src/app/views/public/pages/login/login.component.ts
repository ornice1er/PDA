// import { Component } from "@angular/core";
// import { CommonModule } from "@angular/common";
// import { FormsModule } from "@angular/forms";
// import { Router, RouterModule } from "@angular/router";
// import {
//   LucideAngularModule,
//   User,
//   Lock,
//   Eye,
//   EyeOff,
//   ArrowLeft,
//   LogIn,
// } from "lucide-angular";
// import { HeaderComponent } from "../../components/header/header.component";
// import { FooterComponent } from "../../components/footer/footer.component";

// @Component({
//   selector: "app-login",
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     RouterModule,
//     LucideAngularModule,
//     HeaderComponent,
//     FooterComponent,
//   ],
//   template: `
//     <app-header></app-header>

//     <!-- Hero Section with Login Form -->
//     <section
//       class="relative bg-gradient-to-br from-[#11845A] via-[#023E79] to-[#162233] text-white overflow-hidden min-h-screen"
//     >
//       <!-- Background Pattern -->
//       <div class="absolute inset-0 opacity-10">
//         <div
//           class="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"
//         ></div>
//         <div
//           class="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl"
//         ></div>
//         <div
//           class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl opacity-5"
//         ></div>
//       </div>

//       <div
//         class="relative container mx-auto px-4 py-16 lg:py-20 flex items-center justify-center min-h-screen"
//       >
//         <div class="w-full max-w-md">
//           <!-- Header -->
//           <div class="text-center mb-8">
//             <div
//               class="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20"
//             >
//               <lucide-icon
//                 [img]="userIcon"
//                 class="h-5 w-5 text-yellow-300"
//               ></lucide-icon>
//               <span class="text-sm font-medium">Espace Personnel</span>
//             </div>
//             <h1 class="text-3xl lg:text-4xl font-bold mb-4">
//               Mon Espace
//               <span
//                 class="block bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent"
//               >
//                 Usager
//               </span>
//             </h1>
//             <p class="text-white/90 leading-relaxed">
//               Accédez à votre espace personnel sécurisé
//             </p>
//           </div>

//           <!-- Login Form -->
//           <div
//             class="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 shadow-2xl"
//           >
//             <form (ngSubmit)="onLogin()" #loginForm="ngForm">
//               <!-- Email Field -->
//               <div class="mb-6">
//                 <label
//                   for="email"
//                   class="block text-sm font-medium text-white/90 mb-2"
//                 >
//                   Adresse e-mail
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   [(ngModel)]="loginData.email"
//                   required
//                   email
//                   class="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-white placeholder-white/60"
//                   placeholder="votre.email@exemple.com"
//                 />
//               </div>

//               <!-- Password Field -->
//               <div class="mb-6">
//                 <label
//                   for="password"
//                   class="block text-sm font-medium text-white/90 mb-2"
//                 >
//                   Mot de passe
//                 </label>
//                 <div class="relative">
//                   <input
//                     [type]="showPassword ? 'text' : 'password'"
//                     id="password"
//                     name="password"
//                     [(ngModel)]="loginData.password"
//                     required
//                     minlength="6"
//                     class="w-full px-4 py-3 pr-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-white placeholder-white/60"
//                     placeholder="Votre mot de passe"
//                   />
//                   <button
//                     type="button"
//                     (click)="togglePasswordVisibility()"
//                     class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
//                   >
//                     <lucide-icon
//                       [img]="showPassword ? eyeOffIcon : eyeIcon"
//                       class="h-5 w-5"
//                     ></lucide-icon>
//                   </button>
//                 </div>
//               </div>

//               <!-- Forgot Password -->
//               <div class="text-right mb-6">
//                 <a
//                   href="#"
//                   class="text-sm text-yellow-300 hover:text-yellow-400 transition-colors"
//                 >
//                   Mot de passe oublié ?
//                 </a>
//               </div>

//               <!-- Submit Button -->
//               <button
//                 type="submit"
//                 [disabled]="!loginForm.form.valid"
//                 class="group w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#162233] py-3 px-6 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
//               >
//                 <lucide-icon [img]="loginIcon" class="h-5 w-5"></lucide-icon>
//                 <span>Se connecter</span>
//               </button>
//             </form>

//             <!-- Register Link -->
//             <div class="mt-6 text-center">
//               <p class="text-white/80">
//                 Vous n'avez pas de compte ?
//                 <a
//                   routerLink="/inscription"
//                   class="text-yellow-300 hover:text-yellow-400 font-medium transition-colors"
//                 >
//                   Inscrivez-vous
//                 </a>
//               </p>
//             </div>

//             <!-- Back to Home -->
//             <div class="mt-4 text-center">
//               <a
//                 routerLink="/accueil"
//                 class="inline-flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
//               >
//                 <lucide-icon
//                   [img]="arrowLeftIcon"
//                   class="h-4 w-4"
//                 ></lucide-icon>
//                 <span class="text-sm">Retour à l'accueil</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>

//     <app-footer></app-footer>
//   `,
// })
// export class LoginComponent {
//   showPassword = false;

//   loginData = {
//     email: "",
//     password: "",
//   };

//   // Icons
//   userIcon = User;
//   lockIcon = Lock;
//   eyeIcon = Eye;
//   eyeOffIcon = EyeOff;
//   arrowLeftIcon = ArrowLeft;
//   loginIcon = LogIn;

//   constructor(private router: Router) {}

//   togglePasswordVisibility() {
//     this.showPassword = !this.showPassword;
//   }

//   onLogin() {
//     if (this.loginData.email && this.loginData.password) {
//       // Simulate login process
//       console.log("Login attempt:", this.loginData);
//       // Here you would typically call an authentication service
//       // For now, just redirect to home
//       this.router.navigate(["/accueil"]);
//     }
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <!-- Hero Section with Login Form -->
    <section class="relative bg-gradient-to-br from-[#11845A] via-[#023E79] to-[#162233] text-white overflow-hidden min-h-screen">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl opacity-5"></div>
      </div>
      
      <div class="relative container mx-auto px-4 py-16 lg:py-16 flex items-center justify-center min-h-screen">
        <div class="w-full max-w-md">
          
          <!-- Header -->
          <div class="text-center mb-8 flex flex-col space-y-3">
            <h1 class="text-3xl lg:text-4xl font-bold flex items-center text-center justify-center space-x-2">
             <span>Mon Espace </span> 
              <span class="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Usager
              </span>
            </h1>
            <p class="text-white/90 leading-relaxed">Accédez à votre espace personnel sécurisé</p>
          </div>

          <!-- Login Form -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 shadow-2xl">
            <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
              <!-- Email Field -->
              <div class="mb-6">
                <label for="email" class="block text-sm font-medium text-white/90 mb-2">
                  Adresse e-mail <span class="text-yellow-300">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  formControlName="email"
                  [class]="'w-full px-4 py-3 bg-white/20 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-white placeholder-white/60 ' + (isFieldInvalid('email') ? 'border-red-400' : 'border-white/30')"
                  placeholder="votre.email@exemple.com"
                />
                <div *ngIf="isFieldInvalid('email')" class="text-red-300 text-xs mt-1">
                  <span *ngIf="loginForm.get('email')?.errors?.['required']">L'email est requis</span>
                  <span *ngIf="loginForm.get('email')?.errors?.['email']">Format d'email invalide</span>
                </div>
              </div>

              <!-- Password Field -->
              <div class="mb-6">
                <label for="password" class="block text-sm font-medium text-white/90 mb-2">
                  Mot de passe <span class="text-yellow-300">*</span>
                </label>
                <div class="relative">
                  <input
                    [type]="showPassword ? 'text' : 'password'"
                    id="password"
                    formControlName="password"
                    [class]="'w-full px-4 py-3 pr-12 bg-white/20 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-white placeholder-white/60 ' + (isFieldInvalid('password') ? 'border-red-400' : 'border-white/30')"
                    placeholder="Votre mot de passe"
                  />
                  <button
                    type="button"
                    (click)="togglePasswordVisibility()"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                  >
                    <svg *ngIf="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></g></svg>
                    <svg *ngIf="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20"/></g></svg>
                  </button>
                </div>
                <div *ngIf="isFieldInvalid('password')" class="text-red-300 text-xs mt-1">
                  <span *ngIf="loginForm.get('password')?.errors?.['required']">Le mot de passe est requis</span>
                  <span *ngIf="loginForm.get('password')?.errors?.['minlength']">Le mot de passe doit contenir au moins 6 caractères</span>
                </div>
              </div>

              <!-- Forgot Password -->
              <div class="text-right mb-6">
                <a href="#" class="text-sm text-yellow-300 hover:text-yellow-400 transition-colors">
                  Mot de passe oublié ?
                </a>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                [disabled]="!loginForm.valid"
                class="group w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#162233] py-3 px-6 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10 17l5-5l-5-5m5 5H3m12-9h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/></svg>
                <span>Se connecter</span>
              </button>
            </form>

            <!-- Register Link -->
            <div class="mt-6 text-center">
              <p class="text-white/80">
                Vous n'avez pas de compte ? 
                <a routerLink="/inscription" class="text-yellow-300 hover:text-yellow-400 font-medium transition-colors">
                  Inscrivez-vous
                </a>
              </p>
            </div>

            <!-- Back to Home -->
            <div class="mt-4 text-center">
              <a routerLink="/accueil" class="inline-flex items-center space-x-2 text-white/60 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 19l-7-7l7-7m7 7H5"/></svg>
                <span class="text-sm">Retour à l'accueil</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <app-footer></app-footer>
  `
})
export class LoginComponent {
  showPassword = false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
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
      // Here you would typically call an authentication service
      // For now, just redirect to home
      this.router.navigate(['/accueil']);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }
}
