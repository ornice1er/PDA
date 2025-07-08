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
      image: '/assets/165463.webp',
    },
    {
      title: 'Catalogue des Prestations',
      description:
        'Consultez la liste exhaustive de toutes nos prestations administratives',
      link: '/prestations-par-thematique',
      color: '#023E79',
     image: '/assets/2150282045.webp',
    },
  ];

  platformServices: PlatformService[] = [
    {
      title: 'Espace Usager',
      description: 'Soumettre mes préoccupations',
      link: '/auth/logusager',
      color: '#11845A',
    },
    {
      title: 'Guichet Unique Virtuel',
      description: 'Accès unifié aux plateformes',
      link: '/auth/logusager',
      color: '#023E79',
    },
    {
      title: 'WECHE',
      description: 'Situation administrative en temps réel',
      link: 'https://weche.fpbenin.net/',
      color: '#11845A',
    },
    {
      title: 'Signalement',
      description: 'Signaler un dysfonctionnement',
      link: 'https://demarchesmtfp.gouv.bj/je-denonce',
      color: '#162233',
    },
  ];

  constructor(private router: Router) {}

  goTo(link: string) {
    this.router.navigate([link]);
  }
}
