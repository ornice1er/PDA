import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PdaService } from '../../../../core/services/pda.servic';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';

@Component({
  selector: 'app-prestations-par-structure',
  templateUrl: './prestations-par-structure.component.html',
   standalone: true,
      imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent],
  styleUrls: ['./prestations-par-structure.component.css']
})
export class PrestationsParStructureComponent implements OnInit {

  searchText=""
  data:any[]=[]
  structures:any[]=[]
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

    this.structures=[]
    this.pdaService.getStructures_new(1).subscribe(
      (res:any)=>{
        // this.structures=res.filter((e:any)=> (e.services.length!=0))
        this.structures=res
        // console.log(res)
      },)

    this.loading=true
    this.data=[]
    this._temp=[]
    if(this.route.snapshot.paramMap.get('param')!=null){
      
      this.pdaService.getPrestationsByStructure(this.route.snapshot.paramMap.get('param')).subscribe(
        (res:any)=>{
                this.data=res
                this.loading=false
        },)
    }else{
      this.pdaService.getPrestations().subscribe(
        (res:any)=>{
            this.data=res.filter((e:any)=>{
              if(e.service_parent != null){
                return (e.service_parent.type_s=='dt' && e.service_parent.active=='1')
              }
              return ;
            })
            this._temp=this.data
            this.collectionSize=this.data.length
            this.loading=false
            // console.log(res)

        },)
      // this.pdaService.getPrestations().subscribe(
      //   (res:any)=>{
      //           this.data=res.filter((e:any)=> (e.service_parent != null ? e.service_parent.type_s=='dt' && e.service_parent.active=='1' : ''))
      //           this._temp=this.data
      //           this.collectionSize=this.data.length
      //           this.loading=false
      //           console.log(res)
      //   },)
    }
    
  }

  filter(event:any){
    this.data=[]
    if(event.target.value=="0"){
      this.data=this._temp
    }else{
      this.data=this._temp.filter((e:any)=> (e.idParent==event.target.value))
    }
    this.searchText=""
    this.collectionSize=this.data.length
  }

  onActivate() {
    window.scroll(0,0);
  }

}
