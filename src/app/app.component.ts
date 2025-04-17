import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppSweetAlert } from './core/utils/app-sweet-alert';
import { GlobalName } from './core/utils/global-name';
import { LocalStorageService } from './core/utils/local-stoarge-service';
import { AuthService } from './core/services/auth.service';
import { PdaService } from './core/services/pda.servic';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,RouterModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public isConsented: boolean = false;

  title = 'pum';
  user:any
  isLogin:boolean=false

    subs:Subscription | undefined

    gotoHashtag(fragment: string) {
      if(localStorage.getItem(GlobalName.current_user)!=undefined) {
        this.router.navigateByUrl('/home')
      }else{
        AppSweetAlert.simpleAlert('info',"Entrez vos identifiants et Connectez-vous")
          setTimeout(function(){
              const element:any = document.querySelector("#" + fragment);
              if (element) element.scrollIntoView();
            })
      }
  }
  constructor(
    private local_service:LocalStorageService, 
    private  user_auth_service:AuthService,
    private router:Router,
    private location: Location, 
    private PdaService: PdaService

    ){
     
    /*if(localStorage.getItem(GlobalName.current_user)!=undefined) {
      this.user=this.local_service.getItem(GlobalName.current_user);
      this.isLogin=true
       this.subs=this.user_auth_service.getUserLoggedIn().subscribe(res => {
        console.log('dddddddddddddddddddddddddddddddddd',res)
        this.isLogin = res
     });
    }*/
  
  }
private getCookie(name: string) {
  let ca: Array<string> = document.cookie.split(';');
  let caLen: number = ca.length;
  let cookieName = `${name}=`;
  let c: string;

  for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
          return c.substring(cookieName.length, c.length);
      }
  }
  return '';
}
linkCurrent:boolean=false
settings:any
 deleteCookie(name:any){
  this.setCookie(name,"",-1);
}
  consent() {
    this.setCookie('accept_cookie', '1', 60);
    this.isConsented = true;
    // e.preventDefault();
}

  ngOnInit(){
    this.router.events.subscribe((val) => {
      if(this.location.path() == "/homepfc" || this.location.path() == "/profilepfc"){
        this.linkCurrent = true
      }else{
        this.linkCurrent = false
      }
    });

    this.subs=this.user_auth_service.getUserLoggedIn().subscribe((res:boolean) => {
      this.isLogin = res
      });
      // if(this.getCookie('accept_cookie') != ""){
      //   this.isConsented = true;
      // }


      this.settings = JSON.parse(this.local_service.get('pdaSetting'))
  }

    logout(){
        localStorage.removeItem(GlobalName.token);
        localStorage.removeItem(GlobalName.current_user);

        this.user_auth_service.setUserLoggedIn(false)
        this.isLogin=false
        this.router.navigate(['/main']);
       /* this.user_auth_service.logout().subscribe(
            (res:any)=>{

            },
            (err)=>{
                AlertNotif.finish("Déconnexion","Echec de déconnexion","error")}
        )*/

    }
   

    logoutPfc(){
      localStorage.removeItem("matToken")
      localStorage.removeItem("matUserData")

        this.user_auth_service.setUserLoggedIn(false)
        this.isLogin=false
        this.linkCurrent = false
        this.router.navigate(['/main']);
       /* this.user_auth_service.logout().subscribe(
            (res:any)=>{

            },
            (err)=>{
                AlertNotif.finish("Déconnexion","Echec de déconnexion","error")}
        )*/

    }
   

    setCookie(name: string, value: string, expireDays: number, path: string = '') {
      let d:Date = new Date();
      d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
      let expires:string = `expires=${d.toUTCString()}`;
      let cpath:string = path ? `; path=${path}` : '';
      document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }
}
