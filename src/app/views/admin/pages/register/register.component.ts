import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router} from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { globalName } from '../../../../core/services/_utils/utils';
import { AuthService } from '../../../../core/services/auth.service';
import { IpServiceService } from '../../../../core/services/ip-service.service';
import { StatusService } from '../../../../core/services/status.service';
import { LocalService } from '../../../../core/services/storage_services/local.service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';


@Component({
  selector: 'app-register',
  standalone: true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    loading: boolean;
    status:any;
    struct:any;
    needIfu:boolean=false;
    needRcm:boolean=false;
    isAgent:boolean=false;
    isInstitu:boolean=false;
    default_status:number=4
    default_Institu:number
    ipAddress:string

    constructor(private status_service:StatusService,private user_auth_service:AuthService,private local_service:LocalService,private router:Router,private ip:IpServiceService) { }

    getIP()
    {
        this.ip.getIPAddress().subscribe((res:any)=>{
            this.ipAddress=res.ip;
        });
    }
    ngOnInit(): void {
        window.scroll(0,0);
        this.getIP()
        this.status_service.getAll().subscribe((res:any)=>{
                this.status=res.data;
            })
        this.status_service.getAllStruc().subscribe((res:any) =>{
            this.struct = res.data;
        })
        
    }


    addField(event:any){
        if(event.target.value == 1 || event.target.value == 6){
                this.isAgent=true;
                this.isInstitu=true;
                this.needIfu=false;
                this.needRcm=false;
        }else if(event.target.value == 2){
            this.isAgent=false;
            this.isInstitu=false;
            this.needIfu=true;
            this.needRcm=true;
        }else if(event.target.value == 3){
            this.isAgent=false;
            this.isInstitu=false;
            this.needIfu=true;
            this.needRcm=false;
        }else if(event.target.value == 4){
            this.isAgent=false;
            this.isInstitu=false;
            this.needIfu=false;
            this.needRcm=false;
        }
    }

    

    registerSend(value:any){
        this.loading=true;
        console.log(value);
        value['ip']=this.ipAddress
        this.user_auth_service.register(value).subscribe(
            (res:any)=>{
                this.loading=false;
                if(res.user.is_active){
                    this.local_service.setItem(globalName.token,res.token)
                    this.local_service.setItem(globalName.current_user,res.user)
                    this.router.navigate(['/main']);
                }else{
                    localStorage.setItem("is_registered","");
                    this.router.navigate(['/register-success']);
                }
                AlertNotif.finish("Inscription","Inscription effectuée avec succès. Vous pouvez à présent vous connecter","success")
            },
            (err:any)=>{
                this.loading=false;
                let message="";
                err.error.errors.forEach(element => {
                    message=message+" "+element
                });
                console.log(message);
                AlertNotif.finish("Inscription","Echec d'inscription, "+message,"error")}
        )

    }


}
