import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { IsAuthGuard } from '../../core/guards/is-auth.guard';
import { PrestationsParThematiqueComponent } from './pages/prestations-par-thematique/prestations-par-thematique.component';
import { EseriveStatusComponent } from './pages/eserive-status/eserive-status.component';
import { EserviceCorrectionComponent } from './pages/eservice-correction/eservice-correction.component';
import { EserviceCreateComponent } from './pages/eservice-create/eservice-create.component';
import { EserviceProofComponent } from './pages/eservice-proof/eservice-proof.component';
import { EserviceComponent } from './pages/eservice/eservice.component';
import { RequeteComponent } from './pages/requete/requete.component';
import { ContactPointsComponent } from './pages/contact-points/contact-points.component';
import { JeDenonceComponent } from './pages/je-denonce/je-denonce.component';

export const PublicRoutes: any = [
  // ✅ Doit être un tableau
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'ccsps', component: ContactPointsComponent },
      {
        component: JeDenonceComponent,
        path: 'je-denonce',
        canActivate: [IsAuthGuard],
      },
      {
        component: RequeteComponent,
        path: 'requetes',
        canActivate: [IsAuthGuard],
      },
      {
        component: PrestationsParThematiqueComponent,
        path: 'prestations-par-thematique',
        canActivate: [IsAuthGuard],
      },
      {
        component: EserviceComponent,
        path: 'e-services',
        canActivate: [IsAuthGuard],
      },
      {
        component: EserviceCreateComponent,
        path: 'e-services/:code',
        canActivate: [IsAuthGuard],
      },

      {
        component: EseriveStatusComponent,
        path: 'e-services/status/:code',
        canActivate: [IsAuthGuard],
      },
      {
        component: EserviceCorrectionComponent,
        path: 'e-services/correction/:code/:slug/:prestationCode',
        canActivate: [IsAuthGuard],
      },
      {
        component: EserviceProofComponent,
        path: 'e-services/request-file-proof/:token',
        canActivate: [IsAuthGuard],
      },
    ],
  },
];
