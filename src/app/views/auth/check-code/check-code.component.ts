import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../core/pipes/sample-search.pipe';
import { AuthService } from '../../../core/services/auth.service';
import { IpServiceService } from '../../../core/services/ip-service.service';
import { AppSweetAlert } from '../../../core/utils/app-sweet-alert';
import { GlobalName } from '../../../core/utils/global-name';
import { LocalStorageService } from '../../../core/utils/local-stoarge-service';
import { WindowRef } from '../../../core/utils/window-ref.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { StatutComponent } from '../../components/statut/statut.component';

@Component({
  selector: 'app-check-code',
  standalone: true,
  
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent],
  templateUrl: './check-code.component.html',
  styleUrls: ['./check-code.component.css']
})
export class CheckCodeComponent implements OnInit {
    loading:boolean=false
  constructor(
    private winRef:WindowRef,
    private user_auth_service:AuthService,
    private local_service:LocalStorageService,
    private router:Router, 
    private route:ActivatedRoute,
    private ip:IpServiceService) { }
  user:any;
  ngOnInit(): void {
   this.winRef.nativeWindow.scroll(0,0);
    // localStorage.setItem("activeSer","")
  }

  resendCode(){
    this.user=this.local_service.get(GlobalName.params)
    console.log(this.user)
    
    this.user_auth_service.resendCode({
        user_id:this.user.user_id,
        ip:this.user.ip
    }).subscribe(
        (res:any)=>{
            this.loading=false;
          if(res.send_code){
            AppSweetAlert.simpleAlert("Code de verification","Code envoyé avec succès. Consulter votre boite mail.","success")
          }else{
            AppSweetAlert.simpleAlert("Code de verification",res.message+" ","error")
          }
          //  this.router.navigate(['/main']);
          //  AppSweetAlert.simpleAlert("Mot de passe oublié","Email envoyé","success")
        },
        (err)=>{
            this.loading=false;
            AppSweetAlert.simpleAlert("Code de verification","Echec d'envoi du code","error")}
    )
    // setTimeout(this.resendCode, 5000);
  }

    codeVerification(value:any){
        //code, user_id, ip,client_id, client_secret, username, password, authorized_always_id

        var data=this.local_service.get(GlobalName.params);
        data['code']=value.code
        data['authorized_always_id']=value.authorized_always_id==""?false:true
        this.user_auth_service.verifyCode(data).subscribe(
            (res:any)=>{

                if(res.message){
                  AppSweetAlert.simpleAlert("Vérification de code",res.message,"error")
                }else{

                  this.local_service.set(GlobalName.tokenName,res.access_token)
                this.local_service.set(GlobalName.userName,res.user)
                  this.user_auth_service.setUserLoggedIn(true);
                  if(res.user.active){
                    this.loading=false;
                    console.log(res.user)
                    this.router.navigate(['/admin/home'])
                  
                  }else{
                      AppSweetAlert.simpleAlert("Vérification de code",res.message,"error")
                  }
              }
            },
            (err)=>{
                this.loading=false;
                console.log(err)
                AppSweetAlert.simpleAlert("Vérification de code","Echec de connexion","error")}
        )
    }

}
