import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { GlobalName } from '../../../core/utils/global-name';
import { LocalStorageService } from '../../../core/utils/local-stoarge-service';
import { TitleService } from '../../../core/utils/title.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  menuOpen = true;
  user:any
  role:any
  title = '';
  canUseWhatsapp = true;
  isPfc = true;


  constructor(
    
    private authService:AuthService,
    private router: Router,
    private toastr:ToastrService,
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
     this.titleService.isPfc$.subscribe(newState => {
      this.isPfc = newState;
      this.cdr.detectChanges(); // Force Angular à mettre à jour le DOM correctement
    });
}

toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

  logout(){
    if (this.isPfc) {
      this.authService.logout().subscribe((res:any)=>{
        this.lsService.remove(GlobalName.tokenNameMat)
        this.lsService.remove(GlobalName.userNameMat)
        this.router.navigate(['/main'])
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
}
