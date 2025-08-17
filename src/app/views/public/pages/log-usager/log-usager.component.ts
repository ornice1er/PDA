import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApplicationService } from '../../../../core/services/application.service';
import { AuthService } from '../../../../core/services/auth.service';
import { IpServiceService } from '../../../../core/services/ip-service.service';
import { PdaService } from '../../../../core/services/pda.servic';
import { StatusService } from '../../../../core/services/status.service';
import { clientData, GlobalName } from '../../../../core/utils/global-name';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';

@Component({
selector: 'app-log-usager',
standalone: true,
imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent, RouterModule],
templateUrl: './log-usager.component.html',
styleUrls: ['./log-usager.component.css']
})
export class LogUsagerComponent implements OnInit {
  loading: boolean | undefined;
  visitor: boolean = false
  client_id: string | undefined;
  client_secret: string | undefined;
  needMailCheck: boolean = false
  email: string | undefined

  ipAddress: string | undefined
  constructor(private status_service:StatusService,private applicationService: ApplicationService, private user_auth_service: AuthService, private local_service: LocalStorageService, private router: Router,
    private route: ActivatedRoute, private ip: IpServiceService, private pdaService: PdaService, private statusService:StatusService) { }

  ngOnInit(): void {
    this.getIP()
  }
  getIP()
  {
      this.ip.getIPAddress().subscribe((res:any)=>{
          this.ipAddress=res.data;
      });
  }

  loginSend(value:any) {
    this.loading = true;
   
    this.email = value['email'];
    value['ip'] = this.ipAddress;
    this.user_auth_service.login(value).subscribe(
        (res: any) => {
            if (res.check_code) {
                var data = res.params;
                this.local_service.set(GlobalName.params, data)
                this.router.navigate(['/check-code']);
            } else {
                this.local_service.set(GlobalName.tokenName,res.access_token)
                this.local_service.set(GlobalName.userName,res.user)
                this.user_auth_service.setUserLoggedIn(true);

                if (res.user.active) {
                    this.loading = false;
                    this.router.navigate(['/home']);
                } else {
                    this.router.navigate(['/main']);

                }
            }


        },
        (err) => {
            this.loading = false;

                AppSweetAlert.simpleAlert("error","Connexion", "Echec de connexion")

        }
    )

}

}
