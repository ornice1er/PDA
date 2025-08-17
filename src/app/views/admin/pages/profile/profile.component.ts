import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';

import { Subscription } from 'rxjs';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { AuthService } from '../../../../core/services/auth.service';
import { StatusService } from '../../../../core/services/status.service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';
import { animate } from '@angular/animations';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any
    isAgent:boolean=false
    needIfu:boolean=false
    status:any
    loading:boolean=false
    isLogin:boolean=false

    subs:Subscription

  constructor(private local_service:LocalStorageService, private status_service:StatusService, private router:Router, private user_auth_service:AuthService) { 

    if(localStorage.getItem(GlobalName.current_user)!=undefined) this.user=this.local_service.get(GlobalName.current_user);
        this.subs=this.user_auth_service.getUserLoggedIn().subscribe((res:any) => {
            this.isLogin = res
        });
  }

  ngOnInit(): void {
      this.user=this.local_service.get(GlobalName.current_user)
      this.status_service.getAll().subscribe(
          (res:any)=>{
              this.status=res.data;

          })
  }

    update(value:any){
      this.loading=true;
      console.log(value);
      value['id']=this.user.id;
      this.user_auth_service.update(value).subscribe(
          (res:any)=>{
              this.loading=false;
              this.router.navigate(['/home']);
              AppSweetAlert.simpleAlert("success","Mise à jour profil","Mise à jour effectuée avec succès")
          },
          (err)=>{
              this.loading=false;

              AppSweetAlert.simpleAlert("error","Mise à jour profil","Mise à jour effectuée avec succès")}
      )
    }

    resetPassword(value:any){
        this.loading=true;
        console.log(value);
        value['id']=this.user.id;

        this.user_auth_service.resetPassword(value).subscribe(
            (res:any)=>{
                this.loading=false;
                this.router.navigate(['/home']);
                AppSweetAlert.simpleAlert("success","Modification du mot de passe","Nouveau mot de passe pris en compte")
            },
            (err:any)=>{
                this.loading=false;

                AppSweetAlert.simpleAlert("error","Modification du mot de passe","Echec de réinitialisation")}
        )

    }
}
