import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ModalDismissReasons,
  NgbModal,
  NgbModule,
  NgbOffcanvas,
} from '@ng-bootstrap/ng-bootstrap';
import { Subscription, Subject } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';
import { AppSweetAlert } from '../../../../../../core/utils/app-sweet-alert';
import { ConfigService } from '../../../../../../core/utils/config-service';
import { GlobalName } from '../../../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../../../core/utils/local-stoarge-service';
import { TitleService } from '../../../../../../core/utils/title.service';
import { CommonModule, formatDate } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../../../components/loading/loading.component';
import { StatutComponent } from '../../../../../components/statut/statut.component';
import { RegistreService } from '../../../../../../core/services/registre.service';
import {
  Chart,
  registerables,
  ChartConfiguration,
  ChartType,
  ChartData,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { SharedModule } from '../../../../../../shared/shared.module';
import { BarChartComponent } from '../../../../components/bar-chart/bar-chart.component';
import { LineChartComponent } from '../../../../components/line-chart/line-chart.component';

Chart.register(...registerables, annotationPlugin, ChartDataLabels);

@Component({
  selector: 'app-performance-requete',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    LoadingComponent,
    SampleSearchPipe,
    NgSelectModule,
    NgxPaginationModule,
    StatutComponent,
    BaseChartDirective,
    SharedModule,
    LineChartComponent,
    BarChartComponent
  ],
  templateUrl: './performance-requete.component.html',
  styleUrl: './performance-requete.component.css',
})
export class PerformanceRequeteComponent {
  @ViewChild('contentRetraite') contentRetraite: any;
  @ViewChild('contentCarriere') contentCarriere: any;
  @ViewChild('contentPDF') contentPDF: TemplateRef<any> | undefined;
  pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  pg = {
    pageSize: 10,
    p: 0,
    total: 0,
  };
  page = 1;
  pagerv = 1;
  loading2: any = false;
  year_stats: any = [];
  monthly_stats: any = [];
  registres: any = [];
  loading: any = false;
  id: any;
  data: any;
  user: any;
  access_token: any;
  error = '';
  pg2 = {
    pageSize: 10,
    p: 0,
    total: 0,
  };
  search_text: any = '';
  selected_data: any;
  onglet_What = false;
  mat_aff = false;
  endDate: Date = new Date();
  selectedDate: Date[] = [new Date(), new Date()];
  selectedType: Date = new Date();
  searchForm: FormGroup;

  private newLabel? = 'New label';
  public lineChartType: ChartType = 'line';

@ViewChild('lineChart',{ static: false }) lineChart?: BaseChartDirective;
@ViewChild('barChart',{ static: false }) barChart?: BaseChartDirective;


  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Evolution de la fréquentation de mon centre',
        backgroundColor: 'rgba(17, 132, 90, 0.2)',
        borderColor: '#11845A',
        pointBackgroundColor: '#11845A',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(17, 132, 90, 0.8)',
      },
    ],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      y: {
        position: 'left',
        grid: {
          color: '#162233',
        },
      },
    },
    plugins: {
      legend: { display: true },
    },
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
            beginAtZero: true,

      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType = 'bar' as const;

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  constructor(
    private local_service: LocalStorageService,
    private router: Router,
    private registreService: RegistreService,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private titleService: TitleService,
    private modalService: NgbModal,
    private offcanvasService: NgbOffcanvas
  ) {
    if (localStorage.getItem(GlobalName.tokenNameMat) != undefined)
      this.user = this.local_service.get(GlobalName.tokenNameMat);

    this.searchForm = new FormGroup({
      dates: new FormControl<Date[] | null>(null, [Validators.required]),
      sex: new FormControl<string | null>(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Espace Point Focal Communal');

    if (localStorage.getItem(GlobalName.tokenNameMat) != null) {
      this.user = this.localStorageService.get(GlobalName.userNameMat);
      //Controle pour acceder à l'onglet WhatsApp
      if (this.user?.attribu_com != null) {
        this.onglet_What = true;
      } else {
        this.onglet_What = false;
      }
    }
    this.init();
  }

  ngAfterViewInit(): void {
  // Attendre que les chart soient initialisés
  setTimeout(() => {
    this.lineChart?.update();
    this.barChart?.update();
  }, 0);
}

  init() {
    this.getStats();
  }

  getRegistres(value: any) {
    let d2 = formatDate(value.end_date, 'yyyy-MM-dd', 'en_US');
    let d1 = formatDate(value.start_date, 'yyyy-MM-dd', 'en_US');

    if (d2 < d1) {
      this.error = 'Date de fin ne peut être antérieur à date début';
      AppSweetAlert.simpleAlert(
        'error',
        'Visites',
        'Erreur, Date de fin ne peut être antérieur à date début'
      );
    }
    this.loading2 = true;
    this.registreService
      .getAll(value.start_date, value.end_date, value.sex)
      .subscribe(
        (res: any) => {
          this.registres = res.data;
          this.pg.pageSize = 10;
          this.pg.p = 1;
          this.pg.total = res.data.length;
          this.modalService.dismissAll();
          this.loading2 = false;
        },
        (err) => {
          this.loading2 = false;
          AppSweetAlert.simpleAlert(
            'error',
            'Visites',
            'Erreur, Verifiez que vous avez une bonne connexion internet'
          );
        }
      );
  }
  getStats() {
    const { dates, sex } = this.searchForm.value;
    // console.log(dates);
    // const start_date = this.onFormatDate(dates[0]);
    // const end_date = this.onFormatDate(dates[1]);

    this.lineChartData.datasets[0].data = [];
    this.lineChartData.labels = [];
    this.barChartData.labels = [];
    this.barChartData.datasets = [];
    this.loading2 = true;
    this.registreService
      .getStats(
        dates
          ? {
              start_date: this.onFormatDate(dates[0]),
              end_date: this.onFormatDate(dates[1]),
              sex,
            }
          : {}
      )
      .subscribe(
        (res: any) => {
              this.loading2 = false;

          this.year_stats = res.data.year_stats;
        this.monthly_stats = res.data.month_stats;

        // === Line chart ===
       this.lineChartData = {
          labels: this.year_stats.map((el: any) => el.mois),
          datasets: [
            {
              data: this.year_stats.map((el: any) => el.total),
              label: 'Evolution de la fréquentation de mon centre',
              backgroundColor: 'rgba(17, 132, 90, 0.2)',
              borderColor: '#11845A',
              pointBackgroundColor: '#11845A',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(17, 132, 90, 0.8)',
            }
          ]
        };
        // === Bar chart ===
       this.barChartData = {
        labels: this.monthly_stats.map((el: any) => el.pfc ?? 'Inconnu'),
        datasets: [
          {
            label: 'Total par commune',
            data: this.monthly_stats.map((el: any) => el.total ?? 0),
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
};
        console.log(this.barChartData)
        // Pagination
        this.registres = res.data.data.data;
        this.pg.pageSize = 10;
        this.pg.p = 1;
        this.pg.total = res.data.data.total;

        },
        (err) => {
          this.loading2 = false;
          AppSweetAlert.simpleAlert(
            'error',
            'Visites',
            'Erreur, Verifiez que vous avez une bonne connexion internet'
          );
        }
      );

    // this.registreService
    //   .getStats2(
    //     dates
    //       ? {
    //           start_date: this.onFormatDate(dates[0]),
    //           end_date: this.onFormatDate(dates[1]),
    //           sex,
    //         }
    //       : {}
    //   )
    //   .subscribe(
    //     (res: any) => {
    //       console.log(res);

    //       // this.monthly_stats.forEach((el: any) => {
    //       //   this.barChartData.labels?.push(res.data.month);
    //       //   this.barChartData.datasets.push({
    //       //     data: [el.total],
    //       //     label: el.commune,
    //       //   });
    //       // });
    //       this.chart?.update();
    //       this.chart2?.update();
    //       this.loading2 = false;
    //     },
    //     (err) => {
    //       this.loading2 = false;
    //       AppSweetAlert.simpleAlert(
    //         'error',
    //         'Visites',
    //         'Erreur, Verifiez que vous avez une bonne connexion internet'
    //       );
    //     }
    //   );
  }

  getPage(event: any) {
    this.pg.p = event;
  }

  getPage2(event: any) {
    this.pg2.p = event;
  }

  onFormatDate(event: Date) {
    const selectedDate = event;
    // Get year, month, and day
    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero
    const day = selectedDate.getDate().toString().padStart(2, '0'); // Add leading zero
    // Format as yyyy-mm-dd
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
}
