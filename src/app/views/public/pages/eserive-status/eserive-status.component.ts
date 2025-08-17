import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { EserviceService } from '../../../../core/services/eservice.service';


@Component({
  selector: 'app-eserive-status',
  templateUrl: './eserive-status.component.html',

    standalone: true,
      imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent],
  styleUrls: ['./eserive-status.component.css']
})
export class EseriveStatusComponent {
  private fragment: string | null="";
  code=""
  loading=false


  constructor(
    private route:ActivatedRoute,
    private eserviceService:EserviceService
  ) { }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
    this.code=this.route.snapshot.paramMap.get('code')??""
  }


  send(value:any){
    this.loading=true
    this.eserviceService.getStatus(this.code).subscribe((res:any)=>{
      this.loading=false
     AppSweetAlert.simpleAlert("info",'Statut de demande',res.message)

    },
    
    (res:any)=>{
      this.loading=false
    })
  }

}
