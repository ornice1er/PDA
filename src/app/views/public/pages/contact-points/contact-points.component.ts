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
  @ViewChild('mapSection') mapSection!: ElementRef;
  map: any;
  private isBrowser: boolean;
  query: string = '';
  searchResults: any[] = [];

  contactPoints: any[] = [

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

  const geo = point?.geolocalisation;

  if (!geo) return;

  const coords = this.convertToArray(geo);

  if (!coords) {
    console.warn('Adresse non convertible en coordonnées :', geo);
    return;
  }

  new mapboxgl.Marker({ color: '#ff0000' })
    .setLngLat(coords)
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
    this.mapSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
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

convertToArray(text: string): [number, number] | null {

  if (!text || typeof text !== 'string') {
    return null;
  }

  // Regex latitude,longitude
  const regex = /^\s*(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)\s*$/;

  const match = text.match(regex);

  if (!match) {
    return null; // 👉 Ce n’est pas une coordonnée
  }

  const lat = parseFloat(match[1]);
  const lng = parseFloat(match[3]);

  if (isNaN(lat) || isNaN(lng)) {
    return null;
  }

  return [lng, lat]; // ton ordre d'origine
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
