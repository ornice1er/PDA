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
import { AuthService } from '../../../../core/services/auth.service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';

@Component({
  selector: 'app-profilpfc',
standalone: true,
  imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent],
  templateUrl: './profilpfc.component.html',
  styleUrls: ['./profilpfc.component.css']
})
export class ProfilpfcComponent implements OnInit {


  subs:Subscription | undefined

  constructor(
    private user_auth_service:AuthService, 
    private  local_service:LocalStorageService,
    private localStorageService:LocalStorageService,
    private router:Router) { 
    
    }
  loading:boolean=false
  id:any
  data:any
  user:any
  access_token:any
  error=''
  ngOnInit(): void {
    if (localStorage.getItem('matUserData') != null) {
      this.user = this.localStorageService.get("matUserData")
    }
  }

  UpdatePassWord(value:any){
    
    if (!value.last_password) {
      AppSweetAlert.simpleAlert("Erreur", "Renseigner l'ancien mot de passe", 'error');
    }else if(!value.new_password){
      AppSweetAlert.simpleAlert("Erreur", "Renseigner le nouveau mot de passe", 'error');
    }else if(!value.confirm_password){
      AppSweetAlert.simpleAlert("Erreur", "Confirmer le nouveau mot de passe", 'error');
    }else if(value.confirm_password !== value.new_password){
      AppSweetAlert.simpleAlert("Erreur", "La confirmation n'est pas correcte", 'error');
    }else{
      this.loading=true;
      value['id']=this.user.id;
      this.user_auth_service.resetPasswordpfc(value).subscribe(
          (res:any)=>{
            this.loading=false;
            if(res.success == true){
              this.router.navigate(['/homepfc']);
              AppSweetAlert.simpleAlert("Modification du mot de passe","Nouveau mot de passe pris en compte","success")
            }else{
              AppSweetAlert.simpleAlert("Modification du mot de passe",res.message,"success")
            }
          },
          (err:any)=>{
              this.loading=false;
              AppSweetAlert.simpleAlert("Modification du mot de passe",err.error.message,"error")}
      )
    }

}
}
