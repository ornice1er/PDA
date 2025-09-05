import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { Route, Router, RouterModule, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { LocalStorageService } from '../../../core/utils/local-stoarge-service';
import { TitleService } from '../../../core/utils/title.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MataccueilService } from '../../../core/services/mataccueil.service';
import { AppSweetAlert } from '../../../core/utils/app-sweet-alert';
import {
  LucideAngularModule,
  Bell,
  Settings,
  User,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  BarChart3,
  FileText,
  Users,
  AlertTriangle,
  Home,
  MessageCircle,
} from 'lucide-angular';
import { SharedModule } from '../../../shared/shared.module';
import { GlobalName } from '../../../core/utils/global-name';

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  external?: boolean;
  espace?: number | null;
}
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
    MatDividerModule,
    LucideAngularModule,
    SharedModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  menuOpen = true;
  user: any;
  role: any;
  userConnected: any;
  title = '';
  canUseWhatsapp = true;
  espace = 0;
  loading = false;
  open = false;
  selectedEntie: any = null;
  errormessage = '';
  departements: any[] = [];
  visible = 0;
  bellIcon = Bell;
  settingsIcon = Settings;
  userIcon = User;
  chevronDownIcon = ChevronDown;
  menuIcon = Menu;
  xIcon = X;
  externalLinkIcon = ExternalLink;
  menuItems: MenuItem[] = [
    { id: '/admin/home', label: 'Accueil', icon: Home, espace: 0 },
    { id: '/admin/homepfc', label: 'Accueil', icon: Home, espace: 1 },
    { id: '/admin/homepfc', label: 'Accueil', icon: Home, espace: 3 },
    {
      id: '/admin/homepfc/pfc-mataccueil',
      label: 'Préoccupations',
      icon: AlertTriangle,
      espace: 1,
    },
    {
      id: '/admin/homepfc/pfc-registre',
      label: 'Visiteurs',
      icon: Users,
      espace: 1,
    },
    {
      id: '/admin/homepfc/pfc-whatsapp',
      label: 'WhatsApp',
      icon: MessageCircle,
    //  external: true,
      espace: 1,
    },
    {
      id: '/admin/homepfc/rapports-requetes',
      label: 'Rapports',
      icon: FileText,
      espace: 1,
    },
    {
      id: '/admin/homepfc/pending-rapports',
      label: 'Rapports',
      icon: FileText,
      espace: 3,
    },
    {
      id: '/admin/homepfc/performances',
      label: 'Performances',
      icon: BarChart3,
      espace: 1,
    },
    { id: '/', label: 'Site Web', icon: ExternalLink, espace: null },
  ];
  activeSection = '';
  members = [
    {
      name: 'Amy Elsner',
      image: 'amyelsner.png',
      email: 'amy@email.com',
      role: 'Owner',
    },
    {
      name: 'Bernardo Dominic',
      image: 'bernardodominic.png',
      email: 'bernardo@email.com',
      role: 'Editor',
    },
    {
      name: 'Ioni Bowcher',
      image: 'ionibowcher.png',
      email: 'ioni@email.com',
      role: 'Viewer',
    },
  ];

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private matService: MataccueilService,
    private lsService: LocalStorageService,
    private titleService: TitleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.titleService.title$.subscribe((newTitle) => {
      this.title = newTitle;
      this.cdr.detectChanges(); // Force Angular à mettre à jour le DOM correctement
    });
    this.titleService.hasWhatsappSubject$.subscribe((newState) => {
      this.canUseWhatsapp = newState;
      this.cdr.detectChanges(); // Force Angular à mettre à jour le DOM correctement
    });
    this.titleService.espace$.subscribe((newState) => {
      this.espace = newState;
      console.log('Espace=====> ', newState);
      this.cdr.detectChanges(); // Force Angular à mettre à jour le DOM correctement
    });
    this.titleService.userConnected$.subscribe((newState) => {
      this.userConnected = newState;
      this.user = newState;
      console.log(newState);
      this.cdr.detectChanges(); // Force Angular à mettre à jour le DOM correctement
    });
    // this.authService.getUserByToken().subscribe((res: any) => {
    //   // console.log(res);
    //   this.user = res?.data;
    // });
    // this.departements = []
    // this.matService.getAllDepartement().subscribe((res: any) => {
    //   this.departements = res
    // })
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    if (this.espace >= 1 && this.espace <= 3) {
      this.authService.logout().subscribe(
        (res: any) => {
          this.lsService.remove(GlobalName.tokenNameMat);
          this.lsService.remove(GlobalName.userNameMat);
          console.log(this.espace);
          switch (this.espace) {
            case 1:
              this.router.navigate(['/auth/logpfc']);
              break;
            case 2:
              if (this.lsService.get(GlobalName.tokenName)) {
                this.router.navigate(['/admin/home']);
              } else {
                this.router.navigate(['/']);
              }
              break;
            case 3:
              this.router.navigate(['/auth/logpfc']);
              break;

            default:
              this.router.navigate(['/']);
              break;
          }
          this.toastr.success('Déconnexion réussie', 'Connexion');
        },
        (err: any) => {
          console.log(err);
          this.toastr.success('Déconnexion échouée', 'Connexion');
        }
      );
    } else {
      this.authService.logout2().subscribe(
        (res: any) => {
          this.lsService.remove(GlobalName.tokenName);
          this.lsService.remove(GlobalName.userName);
          this.router.navigate(['/']);
          this.toastr.success('Déconnexion réussie', 'Connexion');
        },
        (err: any) => {
          console.log(err);
          this.toastr.success('Déconnexion échouée', 'Connexion');
        }
      );
    }
  }

  openAddModal() {
    this.loading = false;
    this.open = true;
  }

  close() {
    this.open = false;
  }

  saveUsager(value: any) {
    this.loading = true;
    var param = {
      id: this.user.id,
      email: value.email,
      lastname: value.lastname,
      firstname: value.firstname,
      // password: '', //value.password
      // confirm: '', //value.confirm
      tel: value.phone,
      phone: value.phone,
      idEntite: this.selectedEntie,
      idDepartement: value.idDepartement,
      interfaceRequete: 'USAGER',
      visible: this.visible,
    };
    this.matService.updateUsager(param, this.user.id).subscribe((res: any) => {
      this.userConnected = res?.data;
      this.user = res?.data;
      this.modalService.dismissAll();
      this.loading = false;
      this.visible = 0;
      this.open = false;
      this.titleService.userConnected$.subscribe((newState) => {
        this.userConnected = newState;
        this.user = newState;
        console.log(newState);
        this.cdr.detectChanges(); // Force Angular à mettre à jour le DOM correctement
      });
      AppSweetAlert.simpleAlert(
        'success',
        'Mise à jour',
        'Profile mis à jour avec succès'
      );
    });

    /*if (value.password != value.confirm) {
        AppSweetAlert.simpleAlert("Erreur", "Mot de passe non identique", 'error');
      } else {

      }*/
  }

  getButtonClasses(item: MenuItem): string {
    const isActive = this.activeSection === item.id;
    const baseClasses =
      'w-full flex items-center rounded-2xl transition-all duration-200 group relative';
    const sizeClasses = this.menuOpen
      ? 'justify-center px-3 py-4'
      : 'space-x-4 px-5 py-4';
    const stateClasses = isActive
      ? 'bg-green-light text-white! shadow-lg shadow-green-light/20'
      : 'text-gray-600 hover:bg-green-light/20 hover:text-green-light';

    return `${baseClasses} ${sizeClasses} ${stateClasses}`;
  }

  getIconClasses(item: MenuItem): string {
    const isActive = this.activeSection === item.id;
    return isActive
      ? 'text-white'
      : 'text-gray-400 group-hover:text-green-light';
  }

  onSectionChange(sectionId: string) {
    this.activeSection = sectionId;
    this.router.navigate([sectionId]);
  }
}
