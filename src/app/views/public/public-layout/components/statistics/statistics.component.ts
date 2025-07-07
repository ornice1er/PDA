import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Statistic {
  value: string;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  // icon: any;
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  stats: Statistic[] = [
    {
      value: '0',
      label: 'Préoccupations adressées',
      color: 'text-[#162233]!',
      bgColor: 'bg-gray-50!',
      borderColor: 'border-gray-200!',
    },
    {
      value: '0',
      label: 'Prestations disponibles',
      color: 'text-[#11845A]!',
      bgColor: 'bg-green-50!',
      borderColor: 'border-green-200!',
    },
    {
      value: '12,450',
      label: 'Utilisateurs actifs',
      color: 'text-[#023E79]!',
      bgColor: 'bg-blue-50!',
      borderColor: 'border-blue-200!',
    },
    {
      value: '2.5h',
      label: 'Temps moyen de traitement',
      color: 'text-[#162233]!',
      bgColor: 'bg-slate-50!',
      borderColor: 'border-slate-200!',
    }
  ];
}
