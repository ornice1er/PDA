// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';
// import { LucideAngularModule, User, Mail, Phone, Calendar, Lock, Eye, EyeOff, ArrowLeft, Check, UserPlus } from 'lucide-angular';
// import { HeaderComponent } from '../../components/header/header.component';
// import { FooterComponent } from '../../components/footer/footer.component';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule, HeaderComponent, FooterComponent],
//   template: `
//     <app-header></app-header>

//     <!-- Hero Section with Registration Form -->
//     <section class="relative bg-gradient-to-br from-[#11845A] via-[#023E79] to-[#162233] text-white overflow-hidden min-h-screen">
//       <!-- Background Pattern -->
//       <div class="absolute inset-0 opacity-10">
//         <div class="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
//         <div class="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
//         <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl opacity-5"></div>
//       </div>

//       <div class="relative container mx-auto px-4 py-16 lg:py-20 flex items-center justify-center min-h-screen">
//         <div class="w-full max-w-2xl">

//           <!-- Header -->
//           <div class="text-center mb-8">
//             <div class="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20">
//               <lucide-icon [img]="userPlusIcon" class="h-5 w-5 text-yellow-300"></lucide-icon>
//               <span class="text-sm font-medium">Nouveau Compte</span>
//             </div>
//             <h1 class="text-3xl lg:text-4xl font-bold mb-4">
//               Créer un
//               <span class="block bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
//                 Compte
//               </span>
//             </h1>
//             <p class="text-white/90 leading-relaxed">Rejoignez notre plateforme pour accéder à tous nos services</p>
//           </div>

//           <!-- Registration Form -->
//           <div class="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 shadow-2xl">
//             <form (ngSubmit)="onRegister()" #registerForm="ngForm">

//               <!-- Personal Information Section -->
//               <div class="mb-8">
//                 <h3 class="text-lg font-semibold text-yellow-300 mb-6 flex items-center space-x-2">
//                   <lucide-icon [img]="userIcon" class="h-5 w-5"></lucide-icon>
//                   <span>Informations personnelles</span>
//                 </h3>

//                 <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <!-- Nom -->
//                   <div>
//                     <label for="nom" class="block text-sm font-medium text-white/90 mb-2">
//                       Nom <span class="text-yellow-300">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="nom"
//                       name="nom"
//                       [(ngModel)]="registerData.nom"
//                       required
//                       class="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-white placeholder-white/60"
//                       placeholder="Votre nom"
//                     />
//                   </div>

//                   <!-- Prénoms -->
//                   <div>
//                     <label for="prenoms" class="block text-sm font-medium text-white/90 mb-2">
//                       Prénoms <span class="text-yellow-300">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="prenoms"
//                       name="prenoms"
//                       [(ngModel)]="registerData.prenoms"
//                       required
//                       class="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-white placeholder-white/60"
//                       placeholder="Vos prénoms"
//                     />
//                   </div>
//                 </div>

//                 <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <!-- Date de naissance -->
//                   <div>
//                     <label for="dateNaissance" class="block text-sm font-medium text-white/90 mb-2">
//                       Date de naissance
//                     </label>
//                     <input
//                       type="date"
//                       id="dateNaissance"
//                       name="dateNaissance"
//                       [(ngModel)]="registerData.dateNaissance"
//                       class="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-white"
//                     />
//                   </div>

//                   <!-- Téléphone -->
//                   <div>
//                     <label for="telephone" class="block text-sm font-medium text-white/90 mb-2">
//                       Téléphone <span class="text-yellow-300">*</span>
//                     </label>
//                     <input
//                       type="tel"
//                       id="telephone"
//                       name="telephone"
//                       [(ngModel)]="registerData.telephone"
//                       required
//                       class="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-white placeholder-white/60"
//                       placeholder="+229XXXXXXXXX"
//                     />
//                   </div>
//                 </div>

//                 <!-- Type d'utilisateur -->
//                 <div class="mb-4">
//                   <label class="block text-sm font-medium text-white/90 mb-3">Je suis un</label>
//                   <div class="flex space-x-6">
//                     <label class="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
//                       <input
//                         type="radio"
//                         name="typeUtilisateur"
//                         value="particulier"
//                         [(ngModel)]="registerData.typeUtilisateur"
//                         class="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-white/30"
//                       />
//                       <span class="ml-2 text-white">Particulier</span>
//                     </label>
//                     <label class="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
//                       <input
//                         type="radio"
//                         name="typeUtilisateur"
//                         value="entreprise"
//                         [(ngModel)]="registerData.typeUtilisateur"
//                         class="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-white/30"
//                       />
//                       <span class="ml-2 text-white">Entreprise</span>
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               <!-- Account Information Section -->
//               <div class="mb-6">
//                 <h3 class="text-lg font-semibold text-yellow-300 mb-6 flex items-center space-x-2">
//                   <lucide-icon [img]="lockIcon" class="h-5 w-5"></lucide-icon>
//                   <span>Informations du compte</span>
//                 </h3>

//                 <!-- Email -->
//                 <div class="mb-4">
//                   <label for="email" class="block text-sm font-medium text-white/90 mb-2">
//                     Email <span class="text-yellow-300">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     [(ngModel)]="registerData.email"
//                     required
//                     email
//                     class="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-white placeholder-white/60"
//                     placeholder="votre.email@exemple.com"
//                   />
//                 </div>

//                 <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <!-- Mot de passe -->
//                   <div>
//                     <label for="password" class="block text-sm font-medium text-white/90 mb-2">
//                       Mot de passe <span class="text-yellow-300">*</span>
//                       <span class="text-xs text-white/60">(Au moins 6 caractères)</span>
//                     </label>
//                     <div class="relative">
//                       <input
//                         [type]="showPassword ? 'text' : 'password'"
//                         id="password"
//                         name="password"
//                         [(ngModel)]="registerData.password"
//                         required
//                         minlength="6"
//                         class="w-full px-4 py-3 pr-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-white placeholder-white/60"
//                         placeholder="Votre mot de passe"
//                       />
//                       <button
//                         type="button"
//                         (click)="togglePasswordVisibility()"
//                         class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
//                       >
//                         <lucide-icon [img]="showPassword ? eyeOffIcon : eyeIcon" class="h-5 w-5"></lucide-icon>
//                       </button>
//                     </div>
//                   </div>

//                   <!-- Confirmer mot de passe -->
//                   <div>
//                     <label for="confirmPassword" class="block text-sm font-medium text-white/90 mb-2">
//                       Confirmer mot de passe <span class="text-yellow-300">*</span>
//                     </label>
//                     <div class="relative">
//                       <input
//                         [type]="showConfirmPassword ? 'text' : 'password'"
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         [(ngModel)]="registerData.confirmPassword"
//                         required
//                         class="w-full px-4 py-3 pr-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-white placeholder-white/60"
//                         [class.border-red-400]="registerData.password && registerData.confirmPassword && registerData.password !== registerData.confirmPassword"
//                         placeholder="Confirmez votre mot de passe"
//                       />
//                       <button
//                         type="button"
//                         (click)="toggleConfirmPasswordVisibility()"
//                         class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
//                       >
//                         <lucide-icon [img]="showConfirmPassword ? eyeOffIcon : eyeIcon" class="h-5 w-5"></lucide-icon>
//                       </button>
//                     </div>
//                     <div *ngIf="registerData.password && registerData.confirmPassword && registerData.password !== registerData.confirmPassword"
//                          class="text-red-300 text-xs mt-1">
//                       Les mots de passe ne correspondent pas
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <!-- Consent Checkbox -->
//               <div class="mb-6">
//                 <label class="flex items-start space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
//                   <input
//                     type="checkbox"
//                     name="consent"
//                     [(ngModel)]="registerData.consent"
//                     required
//                     class="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-white/30 rounded mt-1"
//                   />
//                   <span class="text-sm text-white/90 leading-relaxed">
//                     Je donne librement mon consentement pour la collecte de mes données personnelles
//                   </span>
//                 </label>
//               </div>

//               <!-- Submit Button -->
//               <button
//                 type="submit"
//                 [disabled]="!isFormValid()"
//                 class="group w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#162233] py-3 px-6 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
//               >
//                 <lucide-icon [img]="checkIcon" class="h-5 w-5"></lucide-icon>
//                 <span>S'inscrire</span>
//               </button>
//             </form>

//             <!-- Login Link -->
//             <div class="mt-6 text-center">
//               <p class="text-white/80">
//                 Vous avez déjà un compte ?
//                 <a routerLink="/connexion" class="text-yellow-300 hover:text-yellow-400 font-medium transition-colors">
//                   Connectez-vous
//                 </a>
//               </p>
//             </div>

//             <!-- Back to Home -->
//             <div class="mt-4 text-center">
//               <a routerLink="/accueil" class="inline-flex items-center space-x-2 text-white/60 hover:text-white transition-colors">
//                 <lucide-icon [img]="arrowLeftIcon" class="h-4 w-4"></lucide-icon>
//                 <span class="text-sm">Retour à l'accueil</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>

//     <app-footer></app-footer>
//   `
// })
// export class RegisterComponent {
//   showPassword = false;
//   showConfirmPassword = false;

//   registerData = {
//     nom: '',
//     prenoms: '',
//     dateNaissance: '',
//     telephone: '',
//     typeUtilisateur: 'particulier',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     consent: false
//   };

//   // Icons
//   userIcon = User;
//   userPlusIcon = UserPlus;
//   mailIcon = Mail;
//   phoneIcon = Phone;
//   calendarIcon = Calendar;
//   lockIcon = Lock;
//   eyeIcon = Eye;
//   eyeOffIcon = EyeOff;
//   arrowLeftIcon = ArrowLeft;
//   checkIcon = Check;

//   constructor(private router: Router) {}

//   togglePasswordVisibility() {
//     this.showPassword = !this.showPassword;
//   }

//   toggleConfirmPasswordVisibility() {
//     this.showConfirmPassword = !this.showConfirmPassword;
//   }

//   isFormValid(): boolean {
//     return !!(
//       this.registerData.nom &&
//       this.registerData.prenoms &&
//       this.registerData.telephone &&
//       this.registerData.email &&
//       this.registerData.password &&
//       this.registerData.confirmPassword &&
//       this.registerData.password === this.registerData.confirmPassword &&
//       this.registerData.password.length >= 6 &&
//       this.registerData.consent
//     );
//   }

//   onRegister() {
//     if (this.isFormValid()) {
//       // Simulate registration process
//       console.log('Registration data:', this.registerData);
//       // Show success message (you could add a toast notification here)
//       alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
//       // Redirect to login page
//       this.router.navigate(['/connexion']);
//     }
//   }
// }

import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import {
  LucideAngularModule,
  User,
  Mail,
  Phone,
  Calendar,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Check,
  UserPlus,
  ArrowRight,
  ChevronLeft,
} from "lucide-angular";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    LucideAngularModule,
    HeaderComponent,
    FooterComponent,
  ],
  template: `
    <app-header></app-header>

    <!-- Hero Section with Registration Form -->
    <section
      class="relative bg-gradient-to-br from-[#11845A] via-[#023E79] to-[#162233] text-white overflow-hidden min-h-screen"
    >
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div
          class="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"
        ></div>
        <div
          class="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl"
        ></div>
        <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl opacity-5"
        ></div>
      </div>

      <div
        class="relative container mx-auto px-4 py-16 lg:py-16 flex items-center justify-center min-h-screen"
      >
        <div class="w-full max-w-2xl">
          <!-- Header -->
          <div class="text-center mb-8">
            <h1
              class="text-3xl lg:text-4xl font-bold flex items-center text-center justify-center space-x-2"
            >
              <span>Créer un </span>
              <span
                class="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent"
              >
                Compte
              </span>
            </h1>
            <p class="text-white/90 leading-relaxed">
              Rejoignez notre plateforme pour accéder à tous nos services
            </p>
          </div>

          <!-- Stepper -->
          <div class="mb-8">
            <div class="flex items-center justify-center space-x-4">
              <div class="flex items-center">
                <div
                  [class]="
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ' +
                    (currentStep === 1
                      ? 'bg-yellow-400 text-[#162233]'
                      : 'bg-white/20 text-white')
                  "
                >
                  1
                </div>
                <span
                  [class]="
                    'ml-2 text-sm font-medium ' +
                    (currentStep === 1 ? 'text-yellow-300' : 'text-white/60')
                  "
                >
                  Informations personnelles
                </span>
              </div>
              <div class="w-12 h-0.5 bg-white/30"></div>
              <div class="flex items-center">
                <div
                  [class]="
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ' +
                    (currentStep === 2
                      ? 'bg-yellow-400 text-[#162233]'
                      : 'bg-white/20 text-white')
                  "
                >
                  2
                </div>
                <span
                  [class]="
                    'ml-2 text-sm font-medium ' +
                    (currentStep === 2 ? 'text-yellow-300' : 'text-white/60')
                  "
                >
                  Informations du compte
                </span>
              </div>
            </div>
          </div>

          <!-- Registration Form -->
          <div
            class="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 shadow-2xl"
          >
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
              <!-- Step 1: Personal Information -->
              <div *ngIf="currentStep === 1" class="space-y-6">
                <h3
                  class="text-lg font-semibold text-yellow-300 mb-6 flex items-center space-x-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </g>
                  </svg>
                  <span>Informations personnelles</span>
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Nom -->
                  <div>
                    <label
                      for="nom"
                      class="block text-sm font-medium text-white/90 mb-2"
                    >
                      Nom <span class="text-yellow-300">*</span>
                    </label>
                    <input
                      type="text"
                      id="nom"
                      formControlName="nom"
                      [class]="
                        'w-full px-4 py-3 bg-white/20 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-white placeholder-white/60 ' +
                        (isFieldInvalid('nom')
                          ? 'border-red-400'
                          : 'border-white/30')
                      "
                      placeholder="Votre nom"
                    />
                    <div
                      *ngIf="isFieldInvalid('nom')"
                      class="text-red-300 text-xs mt-1"
                    >
                      Le nom est requis
                    </div>
                  </div>

                  <!-- Prénoms -->
                  <div>
                    <label
                      for="prenoms"
                      class="block text-sm font-medium text-white/90 mb-2"
                    >
                      Prénoms <span class="text-yellow-300">*</span>
                    </label>
                    <input
                      type="text"
                      id="prenoms"
                      formControlName="prenoms"
                      [class]="
                        'w-full px-4 py-3 bg-white/20 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-white placeholder-white/60 ' +
                        (isFieldInvalid('prenoms')
                          ? 'border-red-400'
                          : 'border-white/30')
                      "
                      placeholder="Vos prénoms"
                    />
                    <div
                      *ngIf="isFieldInvalid('prenoms')"
                      class="text-red-300 text-xs mt-1"
                    >
                      Les prénoms sont requis
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Date de naissance -->
                  <div>
                    <label
                      for="dateNaissance"
                      class="block text-sm font-medium text-white/90 mb-2"
                    >
                      Date de naissance
                    </label>
                    <input
                      type="date"
                      id="dateNaissance"
                      formControlName="dateNaissance"
                      class="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-white"
                    />
                  </div>

                  <!-- Téléphone -->
                  <div>
                    <label
                      for="telephone"
                      class="block text-sm font-medium text-white/90 mb-2"
                    >
                      Téléphone <span class="text-yellow-300">*</span>
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      formControlName="telephone"
                      [class]="
                        'w-full px-4 py-3 bg-white/20 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-white placeholder-white/60 ' +
                        (isFieldInvalid('telephone')
                          ? 'border-red-400'
                          : 'border-white/30')
                      "
                      placeholder="+22901XXXXXXXX"
                    />
                    <div
                      *ngIf="isFieldInvalid('telephone')"
                      class="text-red-300 text-xs mt-1"
                    >
                      <span
                        *ngIf="registerForm.get('telephone')?.errors?.['required']"
                        >Le téléphone est requis</span
                      >
                      <span
                        *ngIf="registerForm.get('telephone')?.errors?.['pattern']"
                        >Format de téléphone invalide</span
                      >
                    </div>
                  </div>
                </div>

                <!-- Type d'utilisateur -->
                <div>
                  <label class="block text-sm font-medium text-white/90 mb-3"
                    >Je suis un <span class="text-yellow-300">*</span></label
                  >
                  <div class="flex space-x-6">
                    <label
                      class="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                    >
                      <input
                        type="radio"
                        value="particulier"
                        formControlName="typeUtilisateur"
                        class="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-white/30"
                      />
                      <span class="ml-2 text-white">Particulier</span>
                    </label>
                    <label
                      class="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                    >
                      <input
                        type="radio"
                        value="entreprise"
                        formControlName="typeUtilisateur"
                        class="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-white/30"
                      />
                      <span class="ml-2 text-white">Entreprise</span>
                    </label>
                  </div>
                  <div
                    *ngIf="isFieldInvalid('typeUtilisateur')"
                    class="text-red-300 text-xs mt-1"
                  >
                    Veuillez sélectionner un type d'utilisateur
                  </div>
                </div>

                <!-- Next Button -->
                <div class="flex justify-end">
                  <button
                    type="button"
                    (click)="nextStep()"
                    [disabled]="!isStep1Valid()"
                    class="group bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#162233] py-3 px-6 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3"
                  >
                    <span>Suivant</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 group-hover:translate-x-1 transition-transform"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 12h14m-7-7l7 7l-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Step 2: Account Information -->
              <div *ngIf="currentStep === 2" class="space-y-6">
                <h3
                  class="text-lg font-semibold text-yellow-300 mb-6 flex items-center space-x-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    >
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </g>
                  </svg>
                  <span>Informations du compte</span>
                </h3>

                <!-- Email -->
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-white/90 mb-2"
                  >
                    Email <span class="text-yellow-300">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    formControlName="email"
                    [class]="
                      'w-full px-4 py-3 bg-white/20 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-white placeholder-white/60 ' +
                      (isFieldInvalid('email')
                        ? 'border-red-400'
                        : 'border-white/30')
                    "
                    placeholder="votre.email@exemple.com"
                  />
                  <div
                    *ngIf="isFieldInvalid('email')"
                    class="text-red-300 text-xs mt-1"
                  >
                    <span
                      *ngIf="registerForm.get('email')?.errors?.['required']"
                      >L'email est requis</span
                    >
                    <span *ngIf="registerForm.get('email')?.errors?.['email']"
                      >Format d'email invalide</span
                    >
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Mot de passe -->
                  <div>
                    <label
                      for="password"
                      class="block text-sm font-medium text-white/90 mb-2"
                    >
                      Mot de passe <span class="text-yellow-300">*</span>
                      <span class="text-xs text-white/60"
                        >(Au moins 6 caractères)</span
                      >
                    </label>
                    <div class="relative">
                      <input
                        [type]="showPassword ? 'text' : 'password'"
                        id="password"
                        formControlName="password"
                        [class]="
                          'w-full px-4 py-3 pr-12 bg-white/20 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-white placeholder-white/60 ' +
                          (isFieldInvalid('password')
                            ? 'border-red-400'
                            : 'border-white/30')
                        "
                        placeholder="Votre mot de passe"
                      />
                      <button
                        type="button"
                        (click)="togglePasswordVisibility()"
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                      >
                        <svg
                          *ngIf="!showPassword"
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          >
                            <path
                              d="M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0"
                            />
                            <circle cx="12" cy="12" r="3" />
                          </g>
                        </svg>
                        <svg
                          *ngIf="showPassword"
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          >
                            <path
                              d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242"
                            />
                            <path
                              d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20"
                            />
                          </g>
                        </svg>
                      </button>
                    </div>
                    <div
                      *ngIf="isFieldInvalid('password')"
                      class="text-red-300 text-xs mt-1"
                    >
                      <span
                        *ngIf="registerForm.get('password')?.errors?.['required']"
                        >Le mot de passe est requis</span
                      >
                      <span
                        *ngIf="registerForm.get('password')?.errors?.['minlength']"
                        >Le mot de passe doit contenir au moins 6
                        caractères</span
                      >
                    </div>
                  </div>

                  <!-- Confirmer mot de passe -->
                  <div>
                    <label
                      for="confirmPassword"
                      class="block text-sm font-medium text-white/90 mb-2"
                    >
                      Confirmer mot de passe
                      <span class="text-yellow-300">*</span>
                    </label>
                    <div class="relative">
                      <input
                        [type]="showConfirmPassword ? 'text' : 'password'"
                        id="confirmPassword"
                        formControlName="confirmPassword"
                        [class]="
                          'w-full px-4 py-3 pr-12 bg-white/20 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-white placeholder-white/60 ' +
                          (isFieldInvalid('confirmPassword')
                            ? 'border-red-400'
                            : 'border-white/30')
                        "
                        placeholder="Confirmez votre mot de passe"
                      />
                      <button
                        type="button"
                        (click)="toggleConfirmPasswordVisibility()"
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                      >
                        <svg
                          *ngIf="!showConfirmPassword"
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          >
                            <path
                              d="M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0"
                            />
                            <circle cx="12" cy="12" r="3" />
                          </g>
                        </svg>
                        <svg
                          *ngIf="showConfirmPassword"
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          >
                            <path
                              d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242"
                            />
                            <path
                              d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20"
                            />
                          </g>
                        </svg>
                      </button>
                    </div>
                    <div
                      *ngIf="isFieldInvalid('confirmPassword')"
                      class="text-red-300 text-xs mt-1"
                    >
                      <span
                        *ngIf="registerForm.get('confirmPassword')?.errors?.['required']"
                        >La confirmation du mot de passe est requise</span
                      >
                      <span
                        *ngIf="registerForm.get('confirmPassword')?.errors?.['passwordMismatch']"
                        >Les mots de passe ne correspondent pas</span
                      >
                    </div>
                  </div>
                </div>

                <!-- Consent Checkbox -->
                <div>
                  <label
                    class="flex items-start space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  >
                    <input
                      type="checkbox"
                      formControlName="consent"
                      [class]="
                        'h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-white/30 rounded mt-1 ' +
                        (isFieldInvalid('consent') ? 'border-red-400' : '')
                      "
                    />
                    <span class="text-sm text-white/90 leading-relaxed">
                      Je donne librement mon consentement pour la collecte de
                      mes données personnelles
                      <span class="text-yellow-300">*</span>
                    </span>
                  </label>
                  <div
                    *ngIf="isFieldInvalid('consent')"
                    class="text-red-300 text-xs mt-1"
                  >
                    Vous devez accepter les conditions
                  </div>
                </div>

                <!-- Navigation Buttons -->
                <div class="flex justify-between">
                  <button
                    type="button"
                    (click)="previousStep()"
                    class="group bg-white/20 backdrop-blur-sm border border-white/30 text-white py-3 px-6 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center space-x-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 group-hover:-translate-x-1 transition-transform"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m15 18l-6-6l6-6"
                      />
                    </svg>
                    <span>Précédent</span>
                  </button>

                  <button
                    type="submit"
                    [disabled]="!registerForm.valid"
                    class="group bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#162233] py-3 px-6 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 6L9 17l-5-5"
                      />
                    </svg>
                    <span>S'inscrire</span>
                  </button>
                </div>
              </div>
            </form>

            <!-- Login Link -->
            <div class="mt-6 text-center">
              <p class="text-white/80">
                Vous avez déjà un compte ?
                <a
                  routerLink="/connexion"
                  class="text-yellow-300 hover:text-yellow-400 font-medium transition-colors"
                >
                  Connectez-vous
                </a>
              </p>
            </div>

            <!-- Back to Home -->
            <div class="mt-4 text-center">
              <a
                routerLink="/accueil"
                class="inline-flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m12 19l-7-7l7-7m7 7H5"
                  />
                </svg>
                <span class="text-sm">Retour à l'accueil</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <app-footer></app-footer>
  `,
})
export class RegisterComponent {
  currentStep = 1;
  showPassword = false;
  showConfirmPassword = false;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group(
      {
        nom: ["", [Validators.required, Validators.minLength(2)]],
        prenoms: ["", [Validators.required, Validators.minLength(2)]],
        dateNaissance: [""],
        telephone: [
          "",
          [Validators.required, Validators.pattern(/^\+22901[0-9]{8}$/)],
        ],
        typeUtilisateur: ["particulier", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
        consent: [false, Validators.requiredTrue],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const password = control.get("password");
    const confirmPassword = control.get("confirmPassword");

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    if (confirmPassword?.errors?.["passwordMismatch"]) {
      delete confirmPassword.errors["passwordMismatch"];
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
    const step1Fields = ["nom", "prenoms", "telephone", "typeUtilisateur"];
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
      ["nom", "prenoms", "telephone", "typeUtilisateur"].forEach((field) => {
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
      console.log("Registration data:", this.registerForm.value);
      alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      this.router.navigate(["/connexion"]);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.registerForm.controls).forEach((key) => {
        this.registerForm.get(key)?.markAsTouched();
      });
    }
  }
}
