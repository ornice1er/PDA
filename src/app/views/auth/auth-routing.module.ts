import { RegisterguardGuard } from '../../core/guards/registerguard.guard';
import { CheckCodeComponent } from './check-code/check-code.component';
import { LayoutComponent } from './layout/layout.component';
import { LogUsagerComponent } from './log-usager/log-usager.component';
import { LogpfcComponent } from './logpfc/logpfc.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { RegisterComponent } from './register/register.component';

export const AuthRoutes: any = [
  // ✅ Doit être un tableau
  {
    path: 'auth',
    component: LayoutComponent,
    children: [
      { path: 'logpfc', component: LogpfcComponent },
      {
        component: LogUsagerComponent,
        path: 'logusager',
        // canActivate: [AuthGuard]
      },
      { path: 'register', component: RegisterComponent },
      {
        component: RegisterSuccessComponent,
        path: 'register-success',
        canActivate: [RegisterguardGuard],
      },
      {
        component: CheckCodeComponent,
        path: 'check-code',
      },
    ],
  },
];
