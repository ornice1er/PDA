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
import { ActivatedRoute, Router } from '@angular/router';
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
      imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent],
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
  }


  loginSend(value:any) {
    this.loading = true;
    if (this.visitor) {
        value['client_id'] = this.client_id;
        value['grant_type'] = clientData.grant_type;
        value['client_secret'] = this.client_secret;
    } else {
        value['client_id'] = clientData.client_id;
        value['grant_type'] = clientData.grant_type;
        value['client_secret'] = clientData.client_secret;
    }
    this.email = value['email'];
    value['ip'] = this.ipAddress;
    this.user_auth_service.login(value).subscribe(
        (res: any) => {
            if (res.check_code) {
                var data = res.params;
                data['client_id'] = value['client_id']
                data['grant_type'] = value['grant_type']
                data['client_secret'] = value['client_secret']
                data['user_id'] = res.user_id
                
                this.local_service.set(GlobalName.params, data)
                this.router.navigate(['/check-code']);
            } else {
                var url = "";

                this.user_auth_service.setUserLoggedIn(true);

                if (res.user.active) {
                    this.loading = false;
                    
                    console.log(res.user)
                    if (res.user.is_portal_admin == true) {
                        url = GlobalName.back_url + '?access_token=' + res.access_token + '&email=' + res.user.email;

                    } else {
                        this.local_service.set(GlobalName.token, res.access_token)
                        this.local_service.set(GlobalName.current_user, res.user)
                        this.local_service.set(GlobalName.refresh_token, res.refresh_token)
                        
                        url = res.redirect_url + '?access_token=' + res.access_token + '&email=' + res.user.email;

                    }
                    if (this.visitor || res.user.is_portal_admin == true) {
                        console.log(url)
                        window.location.href = url;
                    } else {
                        this.router.navigate(['/home']);
                    }
                } else {

                }
            }


        },
        (err) => {
            this.loading = false;
            console.log(err)
            if (err.error.error == "invalid_grant") {
                AppSweetAlert.simpleAlert("Connexion", "Identifiant ou mot de passe incorrect", "error")
            } else {
                AppSweetAlert.simpleAlert("Connexion", "Echec de connexion", "error")
            }
        }
    )

}

}
