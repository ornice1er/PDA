import { Component, OnInit } from '@angular/core';
// import { PdaService } from '../../core/_services/pda.servic';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';
import { PdaService } from '../../../../core/services/pda.servic';

@Component({
  selector: 'app-prestations-par-thematique',
  standalone: true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent],
  templateUrl: './prestations-par-thematique.component.html',
  styleUrls: ['./prestations-par-thematique.component.css']
})
export class PrestationsParThematiqueComponent implements OnInit {

  searchText=""
  data:any[]=[]
  thematiques:any[]=[]
  _temp:any[]=[]
  selected_key=""
  collectionSize=0
  page=1
  pageSize=15
  loading=false

  search(){
    this.data=this._temp.filter((r:any) => {
      const term = this.searchText.toLowerCase();
      return r.libelle.toLowerCase().includes(term) 
    })
    this.selected_key=""
    this.collectionSize=this.data.length
  }
  constructor(private pdaService:PdaService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.thematiques=[]
    this.pdaService.getThematiques().subscribe(
      (res:any)=>{
        this.thematiques=res
      },)
    this.loading=true
    this.data=[]
    this._temp=[]
   // alert(this.route.snapshot.paramMap.get('param'))
    if(this.route.snapshot.paramMap.get('param')!=null){
      this.pdaService.getPrestationsByThematique(this.route.snapshot.paramMap.get('param')).subscribe(
        (res:any)=>{
                this.data=res
                this.loading=false
        },)
    }else{
      this.pdaService.getPrestations().subscribe(
        (res:any)=>{
                this.data=res
                this._temp=this.data
                this.collectionSize=this.data.length
                this.loading=false
        },)
    }
    
  }

  filter(event:any){
    this.data=[]
    if(event.target.value=="0"){
      this.data=this._temp
    }else{
      this.data=this._temp.filter((e:any)=> (e.idType==event.target.value))
    }
    this.searchText=""
    this.collectionSize=this.data.length
  }

  onActivate() {
    window.scroll(0,0);
  }
}
