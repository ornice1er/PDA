import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

interface MainService {
  title: string;
  description: string;
  // icon: any;
  color: string;
  image: string;
}

interface PlatformService {
  title: string;
  description: string;
  // icon: any;
  color: string;
}

@Component({
  selector: "app-services",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.css"],
})
export class ServicesComponent {
  mainServices: MainService[] = [
    {
      title: "Points de Contact",
      description:
        "Trouvez vos points de contact sur toute l'étendue du territoire national",
      // icon: MessageCircle,
      color: "#11845A",
      image:
        "https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    },
    {
      title: "Catalogue des Prestations",
      description:
        "Consultez la liste exhaustive de toutes nos prestations administratives",
      // icon: FileText,
      color: "#023E79",
      image:
        "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    },
  ];

  platformServices: PlatformService[] = [
    {
      title: "Espace Usager",
      description: "Soumettre mes préoccupations",
      // icon: Eye,
      color: "#11845A",
    },
    {
      title: "Guichet Unique Virtuel",
      description: "Accès unifié aux plateformes",
      // icon: Globe,
      color: "#023E79",
    },
    {
      title: "WECHE",
      description: "Situation administrative en temps réel",
      // icon: Users,
      color: "#11845A",
    },
    {
      title: "Signalement",
      description: "Signaler un dysfonctionnement",
      // icon: AlertTriangle,
      color: "#162233",
    },
  ];
}
