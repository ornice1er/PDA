import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { EserviceService } from '../../../../core/services/eservice.service';

@Component({
  selector: 'app-eservice-proof',
  templateUrl: './eservice-proof.component.html',

    standalone: true,
      imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent],
  styleUrls: ['./eservice-proof.component.css']
})
export class EserviceProofComponent {
  private fragment: string | null="";
  token:any
  data:any
  fileInput:any
  loading=false


  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private eserviceService:EserviceService
  ) { }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
    this.token=this.route.snapshot.paramMap.get('token')??""
    if (this.token!=undefined) {
      this.eserviceService.getDetailsByToken(this.token).subscribe((res:any)=>{
        this.data=JSON.parse(res.data.details)
        this.loading=false
       //AppSweetAlert.simpleAlert('Statut de demande',res.message,'info')
  
      },
      
      (res:any)=>{
        this.loading=false
      })
    }
  }

  upload(ev:any){
    if (ev.target.files.length!=0) {
      this.fileInput=ev.target.files[0]
    }
  }


  send(){
    this.loading=true
    let formData= new FormData()
    formData.append('proof',this.fileInput)
    formData.append('token',this.token)

    this.eserviceService.setProof(formData).subscribe((res:any)=>{
      this.loading=false
     AppSweetAlert.simpleAlert('Ajout de preuve de demande',res.message,'info')
      this.router.navigate(['/'])
    },
    
    (err:any)=>{
     AppSweetAlert.simpleAlert('Ajout de preuve de demande',err.error.message,'error')
      this.router.navigate(['/'])
      this.loading=false
    })
  }
}
