import { Component, OnInit } from '@angular/core';
// import {AuthService} from "../../core/_services/auth.service";
// import {AlertNotif} from "../../alert";
// import {clientData, GlobalName} from '../../core/_utils/utils';
// import {LocalStorageService} from "../../core/_services/storage_services/local.service";
import {ActivatedRoute, Router} from '@angular/router';
// import {IpServiceService} from '../../core/_services/ip-service.service';
// import {ApplicationService} from '../../core/_services/application.service';
//import {isExpired} from '../../core/_utils/jwt_decoder';

// import { OwlOptions } from 'ngx-owl-carousel-o';
// import { ConfigService } from '../utils/config-service';
import Swal from 'sweetalert2'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';
import { ApplicationService } from '../../../../core/services/application.service';
import { AuthService } from '../../../../core/services/auth.service';
import { IpServiceService } from '../../../../core/services/ip-service.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { ConfigService } from '../../../../core/utils/config-service';
import { GlobalName, clientData } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';


@Component({
  selector: 'app-login',
  standalone: true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    active=1
    loadFile(file:any){
        return ConfigService.toFile(file)
    }

     confirmation(service:any)
    {
        Swal.fire({
            text: "Inscrivez-vous et authentifiez-vous pour acceder au service "+service,
            icon: 'warning',
            title: 'Service en ligne',
            showCancelButton: true,
            confirmButtonText: 'Poursuivre',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            }).then((result) => {
                if (result.isConfirmed) {
                 location.reload()
                }else{
                    result.dismiss === Swal.DismissReason.cancel
                }
            }, function (dismiss) {
                return false;
            })
    }

    customOptions: OwlOptions = {
        loop:true,
        margin:10,
        nav:false,
        autoplay:true,
        //autoplayTimeout:1000,
        //autoplayHoverPause:true
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:4
            }
        }
      }
  loading: boolean | undefined;
  visitor:boolean=false
  client_id:string | undefined;
  client_secret:string | undefined;
  needMailCheck:boolean=false
  email:string | undefined

    ipAddress:string | undefined

  constructor(private applicationService:ApplicationService,private user_auth_service:AuthService,private local_service:LocalStorageService,private router:Router, private route:ActivatedRoute,private ip:IpServiceService) {

      if(this.route.snapshot.paramMap.get('client_id') && this.route.snapshot.paramMap.get('client_secret')){
          this.visitor=true;
          this.client_id=this.route.snapshot.paramMap.get('client_id') ?? ""
          this.client_secret=this.route.snapshot.paramMap.get('client_secret') ?? ""
      }
     /* if(!isExpired){
          this.refreshTokenAndRedirect();
      }*/
  }

    getIP()
    {
        this.ip.getIPAddress().subscribe((res:any)=>{
            this.ipAddress=res.ip;
        });
    }

    applications:any[]=[]

    ngOnInit(): void {
      this.getIP();
      if(localStorage.getItem(GlobalName.current_user)!=undefined) {
        this.router.navigateByUrl('/home')
      }
      this.applications=[]
      this.applicationService.getAll().subscribe((res:any)=>{
        this.applications=res.data
    });
  }


    loginSend(value:any){
        this.loading=true;
        if(this.visitor){
            value['client_id']=this.client_id;
            value['grant_type']=clientData.grant_type;
            value['client_secret']=this.client_secret;
        }else{
            value['client_id']=clientData.client_id;
            value['grant_type']=clientData.grant_type;
            value['client_secret']=clientData.client_secret;
        }
        this.email=value['email'];
       value['ip']=this.ipAddress;
        this.user_auth_service.login(value).subscribe(
            (res:any)=>{
                if(res.check_code){
                    var data=res.params;
                    data['client_id']=value['client_id']
                    data['grant_type']=value['grant_type']
                    data['client_secret']=value['client_secret']
                    data['user_id']=res.user_id
                    this.local_service.set(GlobalName.params,data)
                    this.router.navigate(['/check-code']);
                }else{
                    var url="";


                    if(res.user.active){
                        this.loading=false;
                       
                        console.log(res.user)
                        if(res.user.is_portal_admin==true){
                            url=GlobalName.back_url+'?access_token='+res.access_token+'&email='+res.user.email;

                        }else{
                            this.local_service.set(GlobalName.token,res.access_token)
                            this.local_service.set(GlobalName.current_user,res.user)
                            localStorage.setItem(GlobalName.admin_client,res.user.is_portal_admin)
                            this.local_service.set(GlobalName.refresh_token,res.refresh_token)
                            this.user_auth_service.setUserLoggedIn(true);

                            url=res.redirect_url+'?access_token='+res.access_token+'&email='+res.user.email;

                        }
                        if(this.visitor || res.user.is_portal_admin==true){
                            console.log(url)
                            window.location.href=url;
                        }else{
                            this.router.navigate(['/home']);
                        }
                    }else{
                        
                    }
                }


            },
            (err)=>{
                this.loading=false;
                console.log(err)
                AppSweetAlert.simpleAlert("Connexion","Echec de connexion","error")}
        )

    }

    refreshTokenAndRedirect(){
        var data:any={
            'grant_type' : 'refresh_token',
            'refresh_token' : this.local_service.get(GlobalName.refresh_token),
            'scope' : '',
        }
        if(this.visitor){
            data['client_id']=this.client_id;
            data['grant_type']=clientData.grant_type;
            data['client_secret']=this.client_secret;
        }else{
            data['client_id']=clientData.client_id;
            data['grant_type']=clientData.grant_type;
            data['client_secret']=clientData.client_secret;
        }
        data['ip']=this.ipAddress;
        this.user_auth_service.login(data).subscribe(
            (res:any)=>{
                this.loading=false;

                if(res.user.active){
                    this.local_service.set(GlobalName.token,res.access_token.accessToken)
                    this.local_service.set(GlobalName.current_user,res.user)
                    this.local_service.set(GlobalName.refresh_token,res.refresh_token)
                    const url=res.redirect_url+'?access_token='+res.accessToken+'&email='+res.user.email;
                    if(this.visitor){
                        window.location.href=url;
                    }else{
                        this.router.navigate(['/home']);
                    }
                }else{
                    this.needMailCheck=true;
                }

            },
            (err)=>{
                this.loading=false;
                console.log(err)
                AppSweetAlert.simpleAlert("Connexion","Echec de connexion","error")}
        )
    }


    resendMailCheclCode(){
      this.loading=true
        this.user_auth_service.resend({email:this.email}).subscribe(
            (res:any)=>{
                this.loading=false;
                localStorage.setItem("is_registered","");
                this.router.navigate(['/mail-check-code-resent']);
            },
            (err:any)=>{
                this.loading=false;
                console.log(err)
                AppSweetAlert.simpleAlert("Connexion","Echec de connexion","error")}
        )
    }



}
