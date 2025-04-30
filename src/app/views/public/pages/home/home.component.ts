import { Component, OnInit } from '@angular/core';
// import {AuthService} from '../../core/_services/auth.service';
// import {AlertNotif} from '../../alert';
// import {clientData, GlobalName} from '../../core/_utils/utils';
// import {LocalStorageService} from '../../core/_services/storage_services/local.service';
import { Subscription } from 'rxjs';
// import { Config } from '../../app.config';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { ConfigService } from '../../../../core/utils/config-service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent], 
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loadFile(file:any){
    return ConfigService.toFile(file)
  }


  subs:Subscription | undefined

  constructor(private user_auth_service:AuthService, private  local_service:LocalStorageService,private router:Router) { 
    if(localStorage.getItem(GlobalName.current_user)!=undefined) this.user=this.local_service.get(GlobalName.current_user);
    
  }
  loading:boolean=false
  id:any
  data:any[]=[]
  user:any
  access_token:any

  ngOnInit(): void {
      this.user=this.local_service.get(GlobalName.userName)
      console.log(this.user)
      this.id=this.user.status_id
      this.access_token=this.local_service.get(GlobalName.tokenName)
      this.user_auth_service.getApps(this.id).subscribe(
          (res:any)=>{
                  this.loading=false;
                  this.data=res.data
          },
          (err:any)=>{
              this.loading=false;
              console.log(err)
              AppSweetAlert.simpleAlert("Applications","Echec de récupération des applications","error")}
      )

      
  }

  goTo(id:any){
    this.user_auth_service.goTo({
      client_id:id
    }).subscribe(
      (res:any)=>{
          window.open(res.redirect_uri, '_blank');   
      },
      (err:any)=>{
          this.loading=false;
          console.log(err)
         // AlertNotif.finish("Applications","Echec de récupération des applications","error")
        }
  )
  }

  setNotif(){
    this.user_auth_service.setNotif({

    }).subscribe(
      (res:any)=>{
             
      },
      (err:any)=>{
          this.loading=false;
          console.log(err)
         // AppSweetAlert.simpleAlert("Applications","Echec de récupération des applications","error")
        }
  )
  }
  logout(){
    localStorage.removeItem(GlobalName.token);
    localStorage.removeItem(GlobalName.current_user);

    this.user_auth_service.setUserLoggedIn(false)
    this.router.navigate(['/main']);
   /* this.user_auth_service.logout().subscribe(
        (res:any)=>{

        },
        (err)=>{
            AppSweetAlert.simpleAlert("Déconnexion","Echec de déconnexion","error")}
    )*/

}
}
