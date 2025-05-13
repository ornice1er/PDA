import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { GlobalName } from '../../../core/utils/global-name';
import { LocalStorageService } from '../../../core/utils/local-stoarge-service';
import { TitleService } from '../../../core/utils/title.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MataccueilService } from '../../../core/services/mataccueil.service';
import { AppSweetAlert } from '../../../core/utils/app-sweet-alert';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  menuOpen = true;
  user:any
  role:any
  userConnected:any
  title = '';
  canUseWhatsapp = true;
  espace = 0;
  loading=false
  selectedEntie:any=null
  errormessage = ""
  departements:any [] = []
  visible = 0



  constructor(
    private modalService: NgbModal,
    private authService:AuthService,
    private router: Router,
    private toastr:ToastrService,
    private matService: MataccueilService,
    private lsService:LocalStorageService,
    private titleService: TitleService,
    private cdr: ChangeDetectorRef

  ) { 
 
  }

  ngOnInit(): void {
  
     this.user=this.lsService.get(GlobalName.userName)
     this.titleService.title$.subscribe(newTitle => {
      this.title = newTitle;
      this.cdr.detectChanges(); // Force Angular à mettre à jour le DOM correctement
    });
     this.titleService.hasWhatsappSubject$.subscribe(newState => {
      this.canUseWhatsapp = newState;
      this.cdr.detectChanges(); // Force Angular à mettre à jour le DOM correctement
    });
     this.titleService.espace$.subscribe(newState => {
      this.espace = newState;
      this.cdr.detectChanges(); // Force Angular à mettre à jour le DOM correctement
    });
     this.titleService.userConnected$.subscribe(newState => {
      this.userConnected = newState;
      this.cdr.detectChanges(); // Force Angular à mettre à jour le DOM correctement
    });
    this.departements = []
    this.matService.getAllDepartement().subscribe((res: any) => {
      this.departements = res
    })
}

toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

  logout(){
    if (this.espace) {
      this.authService.logout().subscribe((res:any)=>{
        this.lsService.remove(GlobalName.tokenNameMat)
        this.lsService.remove(GlobalName.userNameMat)
        console.log(this.espace)
        switch (this.espace) {
          case 0:
          this.router.navigate(['/auth/logusager'])
            break;
         case 1:
          this.router.navigate(['/auth/logpfc'])
            break;
          
         case 2:
          this.router.navigate(['/admin/home'])
            break;
          
          default:
           this.router.navigate(['/main'])

            break;
        }
        this.toastr.success('Déconnexion réussie', 'Connexion');
      },
      (err:any)=>{
        console.log(err)
        this.toastr.success('Déconnexion échouée', 'Connexion');
  
      });
    }else{
      this.authService.logout2().subscribe((res:any)=>{
        this.lsService.remove(GlobalName.tokenName)
        this.lsService.remove(GlobalName.userName)
        this.router.navigate(['/main'])
        this.toastr.success('Déconnexion réussie', 'Connexion');
      },
      (err:any)=>{
        console.log(err)
        this.toastr.success('Déconnexion échouée', 'Connexion');
  
      });
    }
    
  }

    openAddModal(content:any) {
    this.loading=false
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "lg" })
  }

   saveUsager(value:any) {
      var param = {
        id: this.user.id,
        email: value.email,
        nom: value.nom,
        prenoms: value.prenoms,
        password:"", //value.password
        confirm: "",//value.confirm
        tel: value.tel,
        idEntite:this.selectedEntie,
        idDepartement: value.idDepartement,
        interfaceRequete: "USAGER",
        visible: this.visible
      };
      this.matService.updateUsager(param, this.user.id).subscribe((res: any) => {
        this.modalService.dismissAll()
        this.visible = 0
        AppSweetAlert.simpleAlert('succes',"Mise à jour", "Profile mis à jour avec succès");
      })
      
      /*if (value.password != value.confirm) {
        AppSweetAlert.simpleAlert("Erreur", "Mot de passe non identique", 'error');
      } else {
       
      }*/
  
    }


}
