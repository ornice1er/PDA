import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdaService } from '../../../../../core/services/pda.servic';

interface Statistic {
  value: number | string;
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
export class StatisticsComponent implements OnInit {
  stats: Statistic[] = [
  {
    value: '-',
    label: 'Prestations',
    color: 'text-[#7C3AED]!',          // Violet profond
    bgColor: 'bg-purple-50!',          // Violet clair
    borderColor: 'border-purple-200!',
  },
  {
    value: '-',
    label: 'Préoccupations reçus',
    color: 'text-[#DC2626]!',          // Rouge vif
    bgColor: 'bg-red-50!',             // Rouge clair
    borderColor: 'border-red-200!',
  },
  {
    value: '-',
    label: 'Préoccupations traitées',
    color: 'text-[#2563EB]!',          // Bleu intense
    bgColor: 'bg-blue-50!',            // Bleu pâle
    borderColor: 'border-blue-200!',
  },
  {
    value: '-',
    label: 'Taux de satisfactions',
    color: 'text-[#F59E0B]!',          // Jaune / orange
    bgColor: 'bg-amber-50!',           // Jaune très clair
    borderColor: 'border-amber-200!',
  },
  {
    value: '-',
    label: 'Points de contact (CCSP/GSRU)',
    color: 'text-[#059669]!',          // Vert émeraude
    bgColor: 'bg-emerald-50!',         // Vert très clair
    borderColor: 'border-emerald-200!',
  }
];


  constructor(private pdaService: PdaService){
  }
  ngOnInit(): void {
    this.pdaService.getPrestationsDashStat().subscribe((res)=>{
      console.log(res);
      const data = res?.data;
      // this.stats[0].value = data.nb_prestations;
      // this.stats[1].value = data.nb_preoccupations;
      // this.stats[2].value = data.nb_usagers;
      this.stats[3].value = "86%"//data.taux_satisfaction;
      this.stats[4].value = 28  //data.nb_acteurs_ccsp_gsru;

    })
  }

}
