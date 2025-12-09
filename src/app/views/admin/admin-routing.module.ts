import { AuthGuard } from '../../core/guards/auth.guard';
import { AuthGuardm } from '../../core/guards/authm.guard';
import { IsAuthGuard } from '../../core/guards/is-auth.guard';
import { RegisterguardGuard } from '../../core/guards/registerguard.guard';
import { MentionsLegalesComponent } from '../public/pages/mentions-legales/mentions-legales.component';
import { WelcomeComponent } from '../public/pages/welcome/welcome.component';
import { LayoutComponent } from './layout/layout.component';
import { AboutComponent } from './pages/about/about.component';
import { AlloRetraiteComponent } from './pages/allo-retraite/allo-retraite.component';
import { BaseConnaissanceComponent } from './pages/base-connaissance/base-connaissance.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DemandeInformationComponent } from './pages/demande-information/demande-information.component';
import { EvenementDeclencheurComponent } from './pages/evenement-declencheur/evenement-declencheur.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomepfcComponent } from './pages/homepfc/homepfc.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { PlanComponent } from './pages/plan/plan.component';
import { PrendreRendezvousComponent } from './pages/prendre-rendezvous/prendre-rendezvous.component';
import { PrestationsParStructureComponent } from './pages/prestations-par-structure/prestations-par-structure.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfilpfcComponent } from './pages/profilpfc/profilpfc.component';
import { QuestionComponent } from './pages/question/question.component';
import { ReclammationComponent } from './pages/reclammation/reclammation.component';
import { HomeComponent } from './pages/home/home.component';
import { PfcMataccueilComponent } from './pages/homepfc/components/pfc-mataccueil/pfc-mataccueil.component';
import { PfcRegistreComponent } from './pages/homepfc/components/pfc-registre/pfc-registre.component';
import { PfcWhatsappComponent } from './pages/homepfc/components/pfc-whatsapp/pfc-whatsapp.component';
import { EspaceusagerComponent } from './pages/espaceusager/espaceusager.component';
import { RapportRequeteComponent } from './pages/homepfc/components/rapport-requete/rapport-requete.component';
import { PerformanceRequeteComponent } from './pages/homepfc/components/performance-requete/performance-requete.component';
import { PfcAccueilComponent } from './pages/homepfc/components/accueil/accueil.component';
import { CspReportPendingComponent } from './pages/homepfc/components/report-pending/csp-report-pending.component';
import { DateClosedComponent } from './pages/homepfc/components/date-closed/date-closed.component';

export const AdminRoutes: any = [
  // ✅ Doit être un tableau
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        component: WelcomeComponent,
        path: 'main',
        canActivate: [IsAuthGuard],
      },

      {
        component: PrestationsParStructureComponent,
        path: 'prestations-par-structure',
        canActivate: [IsAuthGuard],
      },
      {
        component: EvenementDeclencheurComponent,
        path: 'evenements-declencheur',
        canActivate: [IsAuthGuard],
      },
      {
        component: FaqComponent,
        path: 'faq',
        canActivate: [IsAuthGuard],
      },
      {
        component: QuestionComponent,
        path: 'question',
        canActivate: [IsAuthGuard],
      },
      {
        component: PrendreRendezvousComponent,
        path: 'prendre-rendezvous',
        canActivate: [IsAuthGuard],
      },
      {
        component: AlloRetraiteComponent,
        path: 'allo-retraite',
        canActivate: [IsAuthGuard],
      },
      {
        component: PlanComponent,
        path: 'plan',
        canActivate: [IsAuthGuard],
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
        path: 'reclammation',
        canActivate: [IsAuthGuard],
      },
      {
        component: DemandeInformationComponent,
        path: 'demande-info',
        canActivate: [IsAuthGuard],
      },

      {
        component: AboutComponent,
        path: 'about',
        canActivate: [IsAuthGuard],
      },
      {
        component: BaseConnaissanceComponent,
        path: 'base-connaissance',
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
        path: 'forgot-password',
      },
      {
        component: ProfileComponent,
        path: 'profile',
        canActivate: [AuthGuard],
      },
      {
        component: LogoutComponent,
        path: 'logout',
      },
      {
        component: MentionsLegalesComponent,
        path: 'mentions-legales',
      },

      //ROUTES POUR PFC
      {
        component: HomepfcComponent,
        path: 'homepfc',
        canActivate: [AuthGuardm],
        children: [
          {
            component: PfcAccueilComponent,
            path: '',
          },
          {
            component: PfcMataccueilComponent,
            path: 'pfc-mataccueil',
          },
          {
            component: PfcRegistreComponent,
            path: 'pfc-registre',
          },
          {
            component: PfcWhatsappComponent,
            path: 'pfc-whatsapp',
          },
           {
            component: DateClosedComponent,
            path: 'date-closed',
          },
          {
            component: RapportRequeteComponent,
            path: 'rapports-requetes',
          },
          {
            component: CspReportPendingComponent,
            path: 'pending-rapports',
          },
          {
            component: PerformanceRequeteComponent,
            path: 'performances',
          },
        ],
      },

      //ROUTES POUR GUV
      {
        component: HomeComponent,
        path: 'home',
        canActivate: [AuthGuard],
      },

      //ROUTES ESPACE USAGER
      { path: 'espace-usager', component: EspaceusagerComponent },
      { path: 'espace-usager/:token', component: EspaceusagerComponent },

      {
        component: ProfilpfcComponent,
        path: 'profilepfc',
        // canActivate: [AuthGuard]
      },
    ],
  },
];
