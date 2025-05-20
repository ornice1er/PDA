import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, Subject } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';
import { AppSweetAlert } from '../../../../../../core/utils/app-sweet-alert';
import { ConfigService } from '../../../../../../core/utils/config-service';
import { GlobalName } from '../../../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../../../core/utils/local-stoarge-service';
import { TitleService } from '../../../../../../core/utils/title.service';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../../../components/loading/loading.component';
import { StatutComponent } from '../../../../../components/statut/statut.component';
import { RegistreService } from '../../../../../../core/services/registre.service';
import { Chart,registerables, ChartConfiguration, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, annotationPlugin,ChartDataLabels);

@Component({
  selector: 'app-performance-requete',
  standalone: true,
     imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent,BaseChartDirective],
  templateUrl: './performance-requete.component.html',
  styleUrl: './performance-requete.component.css'
})
export class PerformanceRequeteComponent {
  @ViewChild('contentRetraite') contentRetraite : any;
  @ViewChild('contentCarriere') contentCarriere : any;
  @ViewChild('contentPDF') contentPDF:TemplateRef<any> | undefined
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
pg={
    pageSize:10,
    p:0,
    total:0
  }
  page = 1;
  pagerv = 1;
  loading2:any = false;
  year_stats:any = [];
  monthly_stats:any = [];
  registres:any = [];
    loading:any=false
  id:any
  data:any
  user:any
  access_token:any
  error=""
   pg2={
    pageSize:10,
    p:0,
    total:0
  }
search_text:any=""
  selected_data:any
  onglet_What = false
  mat_aff = false


  private newLabel? = 'New label';
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @ViewChild(BaseChartDirective) chart2?: BaseChartDirective;
  
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [],
  };

    public lineChartOptions: ChartConfiguration['options'] ={
  elements: {
    line: {
      tension: 0.5,
    },
  },
  scales: {
    y: {
      position: 'left',
    },
    y1: {
      position: 'right',
      grid: {
        color: 'rgba(255,0,0,0.3)',
      },
      ticks: {
        color: 'red',
      },
    },
  },
  plugins: {
    legend: { display: true },
    annotation: {
      annotations: {
        line1: {
          type: 'line',
          scaleID: 'x',
          value: 'Janvier', // attention : Chart.js attend une valeur exacte du label x
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            display: true,
            position: 'center',
            color: 'orange',
            content: 'Janvier',
            font: {
              weight: 'bold',
            },
          },
        },
      },
    },
  }
}
;

 public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
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
    private user_auth_service:AuthService, 
    private  local_service:LocalStorageService,
    private router:Router,
    private  registreService:RegistreService,
    private localStorageService:LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private titleService: TitleService,
    private modalService: NgbModal,
    private offcanvasService: NgbOffcanvas

    ) { 
    if(localStorage.getItem(GlobalName.tokenNameMat)!=undefined) this.user=this.local_service.get(GlobalName.tokenNameMat);
  }


  ngOnInit(): void {
    this.titleService.setTitle('Espace Point Focal Communal')

    if (localStorage.getItem(GlobalName.tokenNameMat) != null) {
      this.user = this.localStorageService.get(GlobalName.userNameMat)
      //Controle pour acceder à l'onglet WhatsApp
      if(this.user?.attribu_com != null){
        this.onglet_What = true
      }else{
        this.onglet_What = false
      }
      
    }
    this.init()
    
  }

init(){
  this.getStats()
}
 

    

getRegistres(value:any){

  let d2 = formatDate(value.end_date,'yyyy-MM-dd','en_US');
  let d1 =formatDate(value.start_date,'yyyy-MM-dd','en_US');

  if(d2 < d1){
    this.error="Date de fin ne peut être antérieur à date début"
    AppSweetAlert.simpleAlert('error',"Visites", "Erreur, Date de fin ne peut être antérieur à date début")
  }
  this.loading2=true
  this.registreService.getAll(value.start_date,value.end_date,value.sex).subscribe((res: any) => {
    this.registres=res.data 
    this.pg.pageSize=10
    this.pg.p=1
    this.pg.total=res.data.length
    this.modalService.dismissAll()
    this.loading2=false
  }, (err) => {
    this.loading2=false
    AppSweetAlert.simpleAlert('error',"Visites", "Erreur, Verifiez que vous avez une bonne connexion internet")
  })
}
getStats(value?:any){
 this.lineChartData.datasets[0].data=[]
 this.lineChartData.labels=[]
 this.barChartData.labels=[]
 this.barChartData.datasets=[]
 
  this.loading2=true
  this.registreService.getStats(value ?? {}).subscribe((res: any) => {
    this.year_stats=res.data.year_stats 
    this.monthly_stats=res.data.month_stats 
    this.year_stats.forEach((el:any) => {
      this.lineChartData.datasets[0].data.push(el.total)
      this.lineChartData.labels?.push(el.mois)
    });

    this.monthly_stats.forEach((el:any) => {
      this.barChartData.labels?.push(res.data.month)
      this.barChartData.datasets.push({ data: [el.total], label: el.commune })
    });

    this.registres=res.data.data
    this.pg.pageSize=10
    this.pg.p=1
    this.pg.total=res.data.data.length
    this.chart?.update();
    this.chart2?.update();
    console.log(this.lineChartData);
    console.log(this.barChartData);
    this.loading2=false
  }, (err) => {
    this.loading2=false
    AppSweetAlert.simpleAlert('error',"Visites", "Erreur, Verifiez que vous avez une bonne connexion internet")
  })
}

  getPage(event:any){
  this.pg.p=event
}

getPage2(event:any){
  this.pg2.p=event
}

}
