import { Component, OnInit } from '@angular/core';

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
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent,RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
    loading:boolean=false;
    constructor(private user_auth_service:AuthService,private router:Router) { }


    ngOnInit(): void {
        window.scroll(0,0);
  }
  gotoHashtag(fragment: string) {
     
    setTimeout(function(){
      const element:any = document.querySelector("#" + fragment);
      if (element) element.scrollIntoView();
    })
}

    forgotPassword(value:any){
        this.loading=true;
        console.log(value);

        this.user_auth_service.forgotPassword(value).subscribe(
            (res:any)=>{
                this.loading=false;
                this.router.navigate(['/main']);
                AppSweetAlert.simpleAlert("success","Mot de passe oublié","Un mail vous a été envoyé. Veuillez consulter votre boîte mail")
            },
            (err)=>{
            this.loading=false;
            console.log(err)
            if(err.error.message=="Reset password failed.")
            {
                AppSweetAlert.simpleAlert("error","Mot de passe oublié","Le mail renseigné n'existe pas. Veuillez vérifier le mail puis réessayer")
            }else{
                AppSweetAlert.simpleAlert("error","Mot de passe oublié","Echec de réinitialisation du mot de passe")
            }
        }
    )

    }
}
