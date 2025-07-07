import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

interface ContactPoint {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  services: string[];
  region: string;
  type: "centre" | "guichet";
}

@Component({
  selector: "app-contact-points",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: "./contact-points.component.html",
  styleUrls: ["./contact-points.component.scss"],
})
export class ContactPointsComponent {
  searchTerm = "";
  selectedRegion = "";
  selectedType = "";
  filteredContactPoints: ContactPoint[] = [];

  contactPoints: ContactPoint[] = [
    {
      id: 1,
      name: "Centre Communal de Cotonou",
      address: "Avenue Jean-Paul II, Cotonou, Littoral",
      phone: "+229 21 30 12 34",
      email: "centre.cotonou@mtfp.gouv.bj",
      hours: "Lun-Ven: 7h30-17h30",
      services: ["Borne tactile", "Assistance usager", "Information"],
      region: "Littoral",
      type: "centre",
    },
    {
      id: 2,
      name: "Guichet de Service Porto-Novo",
      address: "Place des Martyrs, Porto-Novo, Ouémé",
      phone: "+229 20 21 23 45",
      email: "guichet.portonovo@mtfp.gouv.bj",
      hours: "Lun-Ven: 8h00-17h00",
      services: ["Borne tactile", "Enregistrement préoccupations"],
      region: "Ouémé",
      type: "guichet",
    },
    {
      id: 3,
      name: "Centre Communal de Parakou",
      address: "Quartier Banikanni, Parakou, Borgou",
      phone: "+229 23 61 12 78",
      email: "centre.parakou@mtfp.gouv.bj",
      hours: "Lun-Ven: 7h30-17h30",
      services: [
        "Borne tactile",
        "Assistance usager",
        "Information",
        "Formation",
      ],
      region: "Borgou",
      type: "centre",
    },
    {
      id: 4,
      name: "Antenne de Bohicon",
      address: "Carrefour Gare, Bohicon, Zou",
      phone: "+229 22 51 34 56",
      email: "antenne.bohicon@mtfp.gouv.bj",
      hours: "Lun-Ven: 8h00-16h30",
      services: ["Information", "Orientation"],
      region: "Zou",
      type: "centre",
    },
    {
      id: 5,
      name: "Centre Communal d'Abomey-Calavi",
      address: "Rond-point Godomey, Abomey-Calavi, Atlantique",
      phone: "+229 21 35 67 89",
      email: "centre.abomeycalavi@mtfp.gouv.bj",
      hours: "Lun-Ven: 7h30-17h30",
      services: ["Borne tactile", "Assistance usager", "Information"],
      region: "Atlantique",
      type: "centre",
    },
    {
      id: 6,
      name: "Guichet de Service Natitingou",
      address: "Avenue Kaba, Natitingou, Atacora",
      phone: "+229 23 82 45 67",
      email: "guichet.natitingou@mtfp.gouv.bj",
      hours: "Lun-Ven: 8h00-17h00",
      services: [
        "Borne tactile",
        "Enregistrement préoccupations",
        "Information",
      ],
      region: "Atacora",
      type: "guichet",
    },
  ];

  constructor() {
    this.filteredContactPoints = [...this.contactPoints];
  }

  filterContactPoints() {
    this.filteredContactPoints = this.contactPoints.filter((point) => {
      const matchesSearch =
        !this.searchTerm ||
        point.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        point.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        point.region.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesRegion =
        !this.selectedRegion || point.region === this.selectedRegion;
      const matchesType =
        !this.selectedType || point.type === this.selectedType;

      return matchesSearch && matchesRegion && matchesType;
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
}
