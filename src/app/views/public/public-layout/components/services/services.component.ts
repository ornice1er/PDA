import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface MainService {
  title: string;
  description: string;
  link: string;
  color: string;
  image: string;
}

interface PlatformService {
  title: string;
  description: string;
  link: string;
  color: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent {
  mainServices: MainService[] = [
    {
      title: 'Points de Contact',
      description:
        "Trouvez vos points de contact sur toute l'étendue du territoire national",
      link: '/ccsps',
      color: '#11845A',
      image: 'assets/165463.webp',
    },
    {
      title: 'Catalogue des Prestations',
      description:
        'Consultez la liste exhaustive de toutes nos prestations administratives',
      link: '/prestations-par-thematique',
      color: '#023E79',
     image: 'assets/2150282045.webp',
    },
  ];

  platformServices: PlatformService[] = [
    {
      title: 'Espace Usager',
      description: 'Je soumets mes préoccupations',
      link: '/auth/logusager',
      color: '#023E79',
    },
    {
      title: 'Guichet Unique Virtuel',
      description: 'J’accède à toutes mes plateformes',
      link: '/auth/logusager',
      color: '#11845A',
    },
    {
      title: 'WECHE',
      description: 'Je suis ma situation administrative en temps réel',
      link: 'https://weche.fpbenin.net/',
      color: '#ecb009ff',
    },
    {
      title: 'Signalement',
      description: 'Je signale une dérive ou un dysfonctionnement',
      link: '/je-denonce',
      color: '#8d0b0bff',
    },
  ];

  constructor(private router: Router) {}

  goTo(link: string) {
    this.router.navigate([link]);
  }
}
