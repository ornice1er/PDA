import { Component, OnInit } from '@angular/core';
// import {AuthService} from '../../core/_services/auth.service';
// import {AlertNotif} from '../../alert';
// import {clientData, GlobalName} from '../../core/_utils/utils';
// import {LocalStorageService} from '../../core/_services/storage_services/local.service';
import { Subscription } from 'rxjs';
// import { Config } from '../../app.config';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../core/pipes/sample-search.pipe';
import { AuthService } from '../../../core/services/auth.service';
import { AppSweetAlert } from '../../../core/utils/app-sweet-alert';
import { LocalStorageService } from '../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { StatutComponent } from '../../components/statut/statut.component';
import { GlobalName } from '../../../core/utils/global-name';
import { TitleService } from '../../../core/utils/title.service';

@Component({
  selector: 'app-logpfc',
  standalone: true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent],
  templateUrl: './logpfc.component.html',
  styleUrls: ['./logpfc.component.css']
})
export class LogpfcComponent implements OnInit {

  subs:Subscription | undefined

  constructor(
    private user_auth_service:AuthService, 
    private  local_service:LocalStorageService,
    private titleService:TitleService,
    private router:Router) { 
    
    }
  loading:any=false
  id:any
  data:any
  user:any
  access_token:any
  error=''
  ngOnInit(): void {
    // 
    this.local_service.remove(GlobalName.tokenNameMat)
    this.local_service.remove(GlobalName.userNameMat)
  }

  loginSend(value:any) {

    this.local_service.remove(GlobalName.tokenNameMat)
    this.local_service.remove(GlobalName.userNameMat)
    this.loading = true;
    this.user_auth_service.loginpfc(value).subscribe((res:any) => {
        this.loading = false;
        if (res) {
          this.local_service.set(GlobalName.tokenNameMat,res.data);
          this.user_auth_service.getUserByToken().subscribe((res:any) => {
            this.local_service.set(GlobalName.userNameMat,res.data);
            this.user = this.local_service.get(GlobalName.userNameMat)
          this.titleService.setUserConnectedState(this.user)
          })
          this.router.navigateByUrl("/admin/homepfc"); 
        }
      },(err:any) => {
        this.loading = false; 
        if(err.error.error=="invalid_credentials"){
          AppSweetAlert.simpleAlert("Erreur de connexion","Email ou mot de passe incorrect","error")
          // this.error="Email ou mot de passe incorrect"
        }else{
          // this.error="Erreur de connexion ou paramètres incorrects"
          AppSweetAlert.simpleAlert("Erreur de connexion","Erreur de connexion ou paramètres incorrects","error")
        }
      });
  }
  
}
