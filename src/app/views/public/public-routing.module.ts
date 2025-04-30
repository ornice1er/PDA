import { PublicLayoutComponent } from "./public-layout/public-layout.component";
import { WelcomeComponent } from "./pages/welcome/welcome.component";
import { IsAuthGuard } from "../../core/guards/is-auth.guard";
import { PrestationsParThematiqueComponent } from "./pages/prestations-par-thematique/prestations-par-thematique.component";
import { EseriveStatusComponent } from "./pages/eserive-status/eserive-status.component";
import { EserviceCorrectionComponent } from "./pages/eservice-correction/eservice-correction.component";
import { EserviceCreateComponent } from "./pages/eservice-create/eservice-create.component";
import { EserviceProofComponent } from "./pages/eservice-proof/eservice-proof.component";
import { EserviceComponent } from "./pages/eservice/eservice.component";
import { LogUsagerComponent } from "./pages/log-usager/log-usager.component";
import { RequeteComponent } from "./pages/requete/requete.component";
import { RegisterComponent } from "./pages/register/register.component";
import { RegisterSuccessComponent } from "./pages/register-success/register-success.component";
import { RegisterguardGuard } from "../../core/guards/registerguard.guard";
import { CheckCodeComponent } from "./pages/check-code/check-code.component";
import { AuthGuard } from "../../core/guards/auth.guard";
import { HomeComponent } from "./pages/home/home.component";

export const PublicRoutes: any = [ // ✅ Doit être un tableau
    {
      path: '',
      component: PublicLayoutComponent,
      children: [
        { path: 'main', component: WelcomeComponent },
        { path: 'register', component: RegisterComponent },
        {
            component: RegisterSuccessComponent,
            path:"register-success",
            canActivate:[RegisterguardGuard]
        },
        {
            component: CheckCodeComponent,
            path: "check-code",
        },
         {
          component: HomeComponent,
          path:"home",
          canActivate: [AuthGuard]
      },
        {
                  component: PrestationsParThematiqueComponent,
                    path: "prestations-par-thematique",
                    canActivate: [IsAuthGuard]
        }  ,
        {
          component: EserviceComponent,
            path: "e-services",
            canActivate: [IsAuthGuard]
          
      },   
      {
        component: EserviceCreateComponent,
          path: "e-services/:code",
          canActivate: [IsAuthGuard]
        
    },
  
    {
      component: EseriveStatusComponent,
        path: "e-services/status/:code",
        canActivate: [IsAuthGuard]
      
  },
    {
      component: EserviceCorrectionComponent,
        path: "e-services/correction/:code/:slug/:prestationCode",
        canActivate: [IsAuthGuard]
      
  },
    {
      component: EserviceProofComponent,
        path: "e-services/request-file-proof/:token",
        canActivate: [IsAuthGuard]
      
  },
  {
    component: LogUsagerComponent,
    path:"logusager",
          // canActivate: [AuthGuard]
      },
      ]
    },
    {
      component: RequeteComponent,
        path: "requetes",
        canActivate: [IsAuthGuard]
      
  },
  ]