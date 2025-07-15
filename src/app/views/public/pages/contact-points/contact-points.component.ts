import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PdaService } from '../../../../core/services/pda.servic';
import { environment } from '../../../../../environments/environment.prod';

interface ContactPoint {
  id: number;
  title: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  services: string[];
  region: string;
  type: 'centre' | 'guichet';
}

@Component({
  selector: 'app-contact-points',
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './contact-points.component.html',
  styleUrls: ['./contact-points.component.scss'],
})
export class ContactPointsComponent implements OnInit, AfterViewInit {
  searchTerm = '';
  selectedRegion = '';
  selectedType = '';
  filteredContactPoints: any[] = [];
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  map: any;
  private isBrowser: boolean;
  query: string = '';
  searchResults: any[] = [];

  contactPoints: any[] = [
    // {
    //   id: 1,
    //   title: 'Centre Communal de Cotonou',
    //   address: 'Avenue Jean-Paul II, Cotonou, Littoral',
    //   phone: '+229 21 30 12 34',
    //   email: 'centre.cotonou@mtfp.gouv.bj',
    //   hours: 'Lun-Ven: 7h30-17h30',
    //   services: ['Borne tactile', 'Assistance usager', 'Information'],
    //   region: 'Littoral',
    //   type: 'centre',
    // },
    // {
    //   id: 2,
    //   title: 'Guichet de Service Porto-Novo',
    //   address: 'Place des Martyrs, Porto-Novo, Ouémé',
    //   phone: '+229 20 21 23 45',
    //   email: 'guichet.portonovo@mtfp.gouv.bj',
    //   hours: 'Lun-Ven: 8h00-17h00',
    //   services: ['Borne tactile', 'Enregistrement préoccupations'],
    //   region: 'Ouémé',
    //   type: 'guichet',
    // },
    // {
    //   id: 3,
    //   title: 'Centre Communal de Parakou',
    //   address: 'Quartier Banikanni, Parakou, Borgou',
    //   phone: '+229 23 61 12 78',
    //   email: 'centre.parakou@mtfp.gouv.bj',
    //   hours: 'Lun-Ven: 7h30-17h30',
    //   services: [
    //     'Borne tactile',
    //     'Assistance usager',
    //     'Information',
    //     'Formation',
    //   ],
    //   region: 'Borgou',
    //   type: 'centre',
    // },
    // {
    //   id: 4,
    //   title: 'Antenne de Bohicon',
    //   address: 'Carrefour Gare, Bohicon, Zou',
    //   phone: '+229 22 51 34 56',
    //   email: 'antenne.bohicon@mtfp.gouv.bj',
    //   hours: 'Lun-Ven: 8h00-16h30',
    //   services: ['Information', 'Orientation'],
    //   region: 'Zou',
    //   type: 'centre',
    // },
    // {
    //   id: 5,
    //   title: "Centre Communal d'Abomey-Calavi",
    //   address: 'Rond-point Godomey, Abomey-Calavi, Atlantique',
    //   phone: '+229 21 35 67 89',
    //   email: 'centre.abomeycalavi@mtfp.gouv.bj',
    //   hours: 'Lun-Ven: 7h30-17h30',
    //   services: ['Borne tactile', 'Assistance usager', 'Information'],
    //   region: 'Atlantique',
    //   type: 'centre',
    // },
    // {
    //   id: 6,
    //   title: 'Guichet de Service Natitingou',
    //   address: 'Avenue Kaba, Natitingou, Atacora',
    //   phone: '+229 23 82 45 67',
    //   email: 'guichet.natitingou@mtfp.gouv.bj',
    //   hours: 'Lun-Ven: 8h00-17h00',
    //   services: [
    //     'Borne tactile',
    //     'Enregistrement préoccupations',
    //     'Information',
    //   ],
    //   region: 'Atacora',
    //   type: 'guichet',
    // },
  ];

  constructor(
    private pdaService: PdaService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  ngOnInit(): void {
    this.pdaService.getPDC().subscribe((res) => {
      console.log(res);

      this.contactPoints = res?.data;
      this.filteredContactPoints = [...this.contactPoints];
    });
  }

  async ngAfterViewInit(): Promise<void> {
    if (!this.isBrowser) return;
    const mapboxglModule = await import('mapbox-gl');
    const mapboxgl = mapboxglModule.default;
    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/schadrac-sode/cl6v4rrem000m14osw4s29xnr',
      center: [2.313137999999981, 9.3220475],
      zoom: 6,
      accessToken: environment.mapbox.accessToken,
    });

    this.pdaService.getPDC().subscribe((res) => {
      console.log(res);
      this.contactPoints = res?.data;
      this.filteredContactPoints = [...this.contactPoints];
      if (this.filteredContactPoints.length > 0) {
        this.filteredContactPoints.forEach((point) => {
          console.log(this.convertToArray(point?.geolocalisation as string));

          const marker = new mapboxgl.Marker({ color: '#ff0000' })
            .setLngLat(this.convertToArray(point?.geolocalisation as string))
            .addTo(this.map);
        });
      }
    });

    // // Exemple de marker
    // new mapboxgl.Marker({ color: '#ff0000' })
    //   .setLngLat([2.313137999999981, 9.3220475])
    //   .addTo(map);
  }

  zoomTo(id: number) {
    const target = this.filteredContactPoints.find((l) => l.id === id);
    if (target && this.map) {
      this.map.flyTo({
        center: this.convertToArray(target?.geolocalisation as string),
        zoom: 12,
        speed: 1.6,
        curve: 1.2,
      });
    }
  }

  convertToArray(text: string): [number, number] {
    const numbers = text.split(';');
    return [parseFloat(numbers[1]), parseFloat(numbers[0])];
  }

  filterContactPoints() {
    this.filteredContactPoints = this.contactPoints.filter((point) => {
      const matchesSearch =
        !this.searchTerm ||
        point.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        point.address.toLowerCase().includes(this.searchTerm.toLowerCase());
      // point.region.toLowerCase().includes(this.searchTerm.toLowerCase());

      // const matchesRegion =
      //   !this.selectedRegion || point.region === this.selectedRegion;
      // const matchesType = !this.selectedType || point.type === this.selectedType;

      return matchesSearch;
    });
  }

  getTypeLabel(type: string): string {
    switch (type) {
      case 'centre':
        return 'Centre Communal';
      case 'guichet':
        return 'Guichet de Service';
      case 'antenne':
        return 'Antenne';
      default:
        return type;
    }
  }

  getTypeColor(type: string): string {
    switch (type) {
      case 'centre':
        return 'bg-[#11845A] text-white';
      case 'guichet':
        return 'bg-[#023E79] text-white';
      case 'antenne':
        return 'bg-[#162233] text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  }
}
