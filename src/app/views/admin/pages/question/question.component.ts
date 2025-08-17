import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { PdaService } from '../../core/_services/pda.servic';
// 
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { PdaService } from '../../../../core/services/pda.servic';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';

@Component({
  selector: 'app-question',
  standalone: true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(private pdaService:PdaService,private router:Router) { }

  ngOnInit(): void {
    window.scroll(0,0);
  }


  loading=false
  save(value:any){
  
   this.loading=true
    
     this.pdaService.storeQuestion(value).subscribe((res:any)=>{
      this.loading=false
      if(res.success){
        AppSweetAlert.simpleAlert("success","Question","Votre question a été envoyée avec succès")
        this.router.navigateByUrl('/main')
      }
     }, (err)=>{
      this.loading=false;
        AppSweetAlert.simpleAlert("error","Erreur","Une erreur est survenue lors du processus. Veuillez contacter l'administrateur ou réessayer plutard")}
      )
  }
}
