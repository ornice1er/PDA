import { AuthGuard } from "../../core/guards/auth.guard";
import { AuthGuardm } from "../../core/guards/authm.guard";
import { IsAuthGuard } from "../../core/guards/is-auth.guard";
import { RegisterguardGuard } from "../../core/guards/registerguard.guard";
import { MentionsLegalesComponent } from "../../core/services/mentions-legales/mentions-legales.component";
import { WelcomeComponent } from "../public/pages/welcome/welcome.component";
import { LayoutComponent } from "./layout/layout.component";
import { AboutComponent } from "./pages/about/about.component";
import { AlloRetraiteComponent } from "./pages/allo-retraite/allo-retraite.component";
import { BaseConnaissanceComponent } from "./pages/base-connaissance/base-connaissance.component";
import { CheckCodeComponent } from "./pages/check-code/check-code.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { DemandeInformationComponent } from "./pages/demande-information/demande-information.component";
import { EvenementDeclencheurComponent } from "./pages/evenement-declencheur/evenement-declencheur.component";
import { FaqComponent } from "./pages/faq/faq.component";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { HomeComponent } from "./pages/home/home.component";
import { HomepfcComponent } from "./pages/homepfc/homepfc.component";
import { JeDenonceComponent } from "./pages/je-denonce/je-denonce.component";
import { LogoutComponent } from "./pages/logout/logout.component";
import { LogpfcComponent } from "./pages/logpfc/logpfc.component";
import { PlanComponent } from "./pages/plan/plan.component";
import { PrendreRendezvousComponent } from "./pages/prendre-rendezvous/prendre-rendezvous.component";
import { PrestationsParStructureComponent } from "./pages/prestations-par-structure/prestations-par-structure.component";
import { PrestationsParThematiqueComponent } from "./pages/prestations-par-thematique/prestations-par-thematique.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { ProfilpfcComponent } from "./pages/profilpfc/profilpfc.component";
import { QuestionComponent } from "./pages/question/question.component";
import { ReclammationComponent } from "./pages/reclammation/reclammation.component";
import { RegisterSuccessComponent } from "./pages/register-success/register-success.component";
import { RegisterComponent } from "./pages/register/register.component";


export const AdminRoutes: any = [ // ✅ Doit être un tableau
    {
      path: 'admin',
      component: LayoutComponent,
      children: [
        { path: 'dashboard', component: DashboardComponent },
        {
          component: WelcomeComponent,
            path: "main",
            canActivate: [IsAuthGuard]
          
      },
      {
          component: PrestationsParThematiqueComponent,
            path: "prestations-par-thematique",
            canActivate: [IsAuthGuard]
          
      },
      {
          component: PrestationsParStructureComponent,
            path: "prestations-par-structure",
            canActivate: [IsAuthGuard]
          
      },
      {
          component: EvenementDeclencheurComponent,
            path: "evenements-declencheur",
            canActivate: [IsAuthGuard]
          
      },
      {
          component: FaqComponent,
            path: "faq",
            canActivate: [IsAuthGuard]
          
      },
      {
          component: QuestionComponent,
            path: "question",
            canActivate: [IsAuthGuard]
          
      },
      {
          component: PrendreRendezvousComponent,
            path: "prendre-rendezvous",
            canActivate: [IsAuthGuard]
          
      },
      {
          component: AlloRetraiteComponent,
            path: "allo-retraite",
            canActivate: [IsAuthGuard]
          
      },
      {
          component: PlanComponent,
            path: "plan",
            canActivate: [IsAuthGuard]
          
      },
     /* {
          component: ThematiquesComponent,
            path: "thematiques"
          
      },
      {
          component: StructuresComponent,
            path: "structures"
          
      },*/
      {
          component: ReclammationComponent,
            path: "reclammation",
            canActivate: [IsAuthGuard]
          
      },
      {
          component: DemandeInformationComponent,
            path: "demande-info",
            canActivate: [IsAuthGuard]
          
      },
      {
          component: JeDenonceComponent,
            path: "je-denonce",
            canActivate: [IsAuthGuard]
          
      },
      {
          component: AboutComponent,
            path: "about",
            canActivate: [IsAuthGuard]
          
      },
      {
          component: BaseConnaissanceComponent,
            path: "base-connaissance"
          
      },
     /* {
          component: InfoCarriereComponent,
            path: "info-carriere"
          
      },
      {
          component: InfoPensionComponent,
            path: "info-pension"
          
      },*/
      {
          component: ForgotPasswordComponent,
          path: "forgot-password",
      }, {
          component: ProfileComponent,
          path: "profile",
          canActivate: [AuthGuard]
      },{
          component: CheckCodeComponent,
          path: "check-code",
      },
      {
          component: LogoutComponent,
          path: "logout",
      },
      {
          component: MentionsLegalesComponent,
          path: "mentions-legales",
      },
      {
          component: RegisterComponent,
          path:"register",
          canActivate: [IsAuthGuard]
      },
      {
          component: HomeComponent,
          path:"home",
          canActivate: [AuthGuard]
      },
      {
          component: HomepfcComponent,
          path:"homepfc",
          canActivate: [AuthGuardm]
      },
      {
          component: LogpfcComponent,
          path:"logpfc",
          // canActivate: [AuthGuard]
      },
      {
          component: ProfilpfcComponent,
          path:"profilepfc",
          // canActivate: [AuthGuard]
      },
      {
          component: RegisterSuccessComponent,
          path:"register-success",
          canActivate:[RegisterguardGuard]
      },
      {
          component: RegisterSuccessComponent,
          path:"mail-check-code-resent",
          canActivate:[RegisterguardGuard]
      },
      ]
    }
  ]