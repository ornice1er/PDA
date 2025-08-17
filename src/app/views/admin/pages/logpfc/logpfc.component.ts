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
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';
import { AuthService } from '../../../../core/services/auth.service';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';

@Component({
  selector: 'app-logpfc',
  standalone: true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent],
  templateUrl: './logpfc.component.html',
  styleUrls: ['./logpfc.component.css']
})
export class LogpfcComponent implements OnInit {


  subs:Subscription | undefined

  constructor(private user_auth_service:AuthService, private  local_service:LocalStorageService,private router:Router) { 
    
    }
  loading:boolean=false
  id:any
  data:any
  user:any
  access_token:any
  error=''
  ngOnInit(): void {
    // 
    localStorage.removeItem("matToken")
    localStorage.removeItem("matUserData")
  }

  loginSend(value:any) {

    localStorage.removeItem("matToken")
    localStorage.removeItem("matUserData")
    this.loading = true;
    this.user_auth_service.loginpfc(value).subscribe((res:any) => {
        this.loading = false;
        if (res) {
          localStorage.setItem('matToken',res.token);
          this.user_auth_service.getUserByToken(res.token).subscribe((res:any) => {
            localStorage.setItem('matUserData',res);
            this.local_service.set('matUserData', res);
          })
          this.router.navigateByUrl("/homepfc"); 
          setTimeout(function(){
            window.location.reload()
          },1000)	
        }
      },(err:any) => {
        this.loading = false; 
        if(err.error.error=="invalid_credentials"){
          AppSweetAlert.simpleAlert("error","Erreur de connexion","Email ou mot de passe incorrect")
          // this.error="Email ou mot de passe incorrect"
        }else{
          // this.error="Erreur de connexion ou paramètres incorrects"
          AppSweetAlert.simpleAlert("error","Erreur de connexion","Erreur de connexion ou paramètres incorrects")
        }
      });
  }
  
}
