import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';
import { globalName } from '../../../../core/services/_utils/utils';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-logout',
  standalone: true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private user_auth_service:AuthService, private router:Router) {
    this.logout();
  }

  ngOnInit(): void {
  }
    logout(){
        localStorage.removeItem(globalName.token);
        localStorage.removeItem(globalName.current_user);

        this.user_auth_service.setUserLoggedIn(false)
        this.router.navigate(['/main']);
        /* this.user_auth_service.logout().subscribe(
             (res:any)=>{
             },
             (err)=>{
                 AlertNotif.finish("Déconnexion","Echec de déconnexion","error")}
         )*/

    }
}
