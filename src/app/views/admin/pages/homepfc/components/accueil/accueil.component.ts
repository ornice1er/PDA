import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ModalDismissReasons,
  NgbModal,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../../../components/loading/loading.component';
import { StatutComponent } from '../../../../../components/statut/statut.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';
import { AppSweetAlert } from '../../../../../../core/utils/app-sweet-alert';
import { ConfigService } from '../../../../../../core/utils/config-service';
import { GlobalName } from '../../../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../../../core/utils/local-stoarge-service';
import { TitleService } from '../../../../../../core/utils/title.service';
import { DashService } from '../../../../../../core/services/dash.service';
import { SharedModule } from '../../../../../../shared/shared.module';
import { Dashboard } from '../../../../../../core/Models/dashboard';
import {
  AlertTriangle,
  LucideAngularModule,
  Megaphone,
  UserCheck,
  Users,
} from 'lucide-angular';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-accueil-pfc',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    LucideAngularModule,
    BaseChartDirective,
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css',
})
export class PfcAccueilComponent implements OnInit {
  onglet_What: any = false;
  user: any = false;
  loading: boolean = false;
  endDate: Date = new Date();
  selectedDate: Date = new Date();
  data!: Dashboard;
  reports:any[]=[];
  usersIcon = Users;
  userCheckIcon = UserCheck;
  alertTriangleIcon = AlertTriangle;
  megaphoneIcon = Megaphone;
  public lineChartType: ChartType = 'line';
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
        grid: {
          color: '#162233',
        },
      },
    },
  };
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [2, 5, 10],
        label: 'Évolution des visites au cours',
        backgroundColor: 'rgba(17, 132, 90, 0.2)',
        borderColor: '#11845A',
        pointBackgroundColor: '#11845A',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(17, 132, 90, 0.8)',
        fill: 'origin',
      },
    ],
    labels: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ],
  };
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  constructor(
    private user_auth_service: AuthService,
    private local_service: LocalStorageService,
    private service: DashService,
    private modalService: NgbModal,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private titleService: TitleService
  ) {
    // if(localStorage.getItem(GlobalName.tokenNameMat)!=undefined) this.user=this.local_service.get(GlobalName.tokenNameMat);
  }
  ngOnInit(): void {
    this.titleService.setTitle('Espace Point Focal Communal');
    this.titleService.setPfcState(1);

    if (this.localStorageService.get(GlobalName.tokenNameMat) != null) {
      this.user = this.localStorageService.get(GlobalName.userNameMat);
      this.titleService.setUserConnectedState(this.user);
      //Controle pour acceder à l'onglet WhatsApp
      if (this.user?.attribu_com !== null) {
        this.titleService.setWhatsappState(true);
      } else {
        this.titleService.setWhatsappState(false);
      }
    }
    this.loadData();
  }

  loadData(month?: number, year?: number) {
    this.loading = true;
    this.service.getDashboardPFC(month, year).subscribe({
      next: (res) => {
        if (res.status) {
          this.data = res.data;
          this.reports=this.data.reports;
          this.loading = false;
        }
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  onDateselected(event: Date) {
    const selectedDate = event;
    // Récupérer le mois (0-11, donc +1 pour avoir 1-12)
    const month = selectedDate.getMonth() + 1;
    // Récupérer l'année (ex: 2024)
    const year = selectedDate.getFullYear();
    this.loadData(month, year);
  }
}
