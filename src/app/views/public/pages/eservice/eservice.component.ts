import { Component, OnInit } from '@angular/core';
// import { NgwWowModule, NgwWowService } from 'ngx-wow';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';
import { PdaService } from '../../../../core/services/pda.servic';
import { PrestationItemComponent } from '../../../components/prestation-item/prestation-item.component';
import { Building2, Car, FileText, GraduationCap, Heart, Home, LucideAngularModule, Shield, Users } from 'lucide-angular';
import { ServiceCardComponent } from '../../public-layout/components/services-card/services-card.component';

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: any;
  estimatedTime: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  rating: number;
  isOnline: boolean;
}
@Component({
  selector: 'app-eservice',
  templateUrl: './eservice.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    LoadingComponent,
    SampleSearchPipe,
    NgSelectModule,
    NgxPaginationModule,
    StatutComponent,
    PrestationItemComponent,
    ServiceCardComponent,
    LucideAngularModule
  ],
  styleUrls: ['./eservice.component.css'],
})
export class EserviceComponent implements OnInit {
  data: any[] = [];
  private wowSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private pdaService: PdaService
  ) //  private wowService: NgwWowService
  {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // this.wowService.init();
      }
    });
    this.filteredContactPoints = [...this.contactPoints];
  }

  searchTerm = "";
  selectedRegion = "";
  selectedType = "";
  filteredContactPoints: Service[] = [];

  contactPoints: Service[] = [
  {
    id: '1',
    title: 'Transformation véhicules 4 roues et plus',
    description: 'Lorsque qu\'un particulier paie un véhicule administratif de couleur de plaque vert, rouge ou bleu, il doit procéder lors d\'une transformation administrative...',
    category: 'transport',
    icon: Car,
    estimatedTime: '15-30 min',
    difficulty: 'Moyen',
    rating: 4.5,
    isOnline: true
  },
  {
    id: '2',
    title: 'Avis de recherche RADIO-TELE',
    description: 'Ce service vous permet de faire une demande de faire diffuser un avis de recherche d\'une personne disparue de décès afin de retrouver sa famille...',
    category: 'social',
    icon: Users,
    estimatedTime: '10-15 min',
    difficulty: 'Facile',
    rating: 4.8,
    isOnline: true
  },
  {
    id: '3',
    title: 'Abonnement au journal physique La Nation',
    description: 'L\'abonnement physique au quotidien « La Nation » vous permet d\'avoir le journal papier, tous les jours ouvrable...',
    category: 'entreprise',
    icon: FileText,
    estimatedTime: '5-10 min',
    difficulty: 'Facile',
    rating: 4.2,
    isOnline: false
  },
  {
    id: '4',
    title: 'Demande de passeport',
    description: 'Effectuez votre demande de passeport en ligne. Service rapide et sécurisé pour obtenir votre document de voyage...',
    category: 'diplomatie',
    icon: Shield,
    estimatedTime: '20-30 min',
    difficulty: 'Moyen',
    rating: 4.6,
    isOnline: true
  },
  {
    id: '5',
    title: 'Attestation de résidence',
    description: 'Obtenez votre attestation de résidence officielle rapidement. Document nécessaire pour diverses démarches administratives...',
    category: 'social',
    icon: Home,
    estimatedTime: '5-10 min',
    difficulty: 'Facile',
    rating: 4.9,
    isOnline: true
  },
  {
    id: '6',
    title: 'Inscription universitaire',
    description: 'Processus d\'inscription dans les établissements d\'enseignement supérieur. Soumettez vos documents et suivez votre candidature...',
    category: 'education',
    icon: GraduationCap,
    estimatedTime: '45-60 min',
    difficulty: 'Difficile',
    rating: 4.3,
    isOnline: true
  },
  {
    id: '7',
    title: 'Permis de construire',
    description: 'Demande de permis de construire pour vos projets immobiliers. Soumettez vos plans et obtenez l\'autorisation nécessaire...',
    category: 'entreprise',
    icon: Building2,
    estimatedTime: '30-45 min',
    difficulty: 'Difficile',
    rating: 4.1,
    isOnline: false
  },
  {
    id: '8',
    title: 'Carte vitale',
    description: 'Demande ou renouvellement de votre carte vitale. Accédez aux services de santé avec votre carte d\'assurance maladie...',
    category: 'sante',
    icon: Heart,
    estimatedTime: '15-20 min',
    difficulty: 'Facile',
    rating: 4.7,
    isOnline: true
  }
  ];


  filterContactPoints() {
    this.filteredContactPoints = this.contactPoints.filter((point) => {
      const matchesSearch =
        !this.searchTerm ||
        point.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        point.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        point.category.toLowerCase().includes(this.searchTerm.toLowerCase());

      // const matchesRegion =
      //   !this.selectedRegion || point.region === this.selectedRegion;
      // const matchesType =
      //   !this.selectedType || point.type === this.selectedType;

      return matchesSearch;
    });
  }

  getTypeLabel(type: string): string {
    switch (type) {
      case "centre":
        return "Centre Communal";
      case "guichet":
        return "Guichet de Service";
      case "antenne":
        return "Antenne";
      default:
        return type;
    }
  }

  getTypeColor(type: string): string {
    switch (type) {
      case "centre":
        return "bg-[#11845A] text-white";
      case "guichet":
        return "bg-[#023E79] text-white";
      case "antenne":
        return "bg-[#162233] text-white";
      default:
        return "bg-gray-500 text-white";
    }
  }

  ngOnInit(): void {
    // this.wowSubscription = this.wowService.itemRevealed$.subscribe(
    //   (item:HTMLElement) => {
    //     // do whatever you want with revealed element
    //   });
    this.pdaService.getEservices().subscribe((res: any) => {
      this.data = res.data;
    });
  }

  ngOnDestroy() {
    this.wowSubscription?.unsubscribe();
  }
}
