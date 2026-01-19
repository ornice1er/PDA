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
import { SharedModule } from '../../../../shared/shared.module';
import { DropdownChangeEvent } from 'primeng/dropdown';

@Component({
  selector: 'app-prestations-par-thematique',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    LoadingComponent,
    SampleSearchPipe,
    NgSelectModule,
    NgxPaginationModule,
    StatutComponent,
    SharedModule,
  ],
  templateUrl: './prestations-par-thematique.component.html',
  styleUrls: ['./prestations-par-thematique.component.css'],
})
export class PrestationsParThematiqueComponent implements OnInit {
  searchText = '';
  data: any[] = [];
  institutions:any[]=[]
  thematiques: any[] = [];
  thematiques2: any[] = [];

  _temp: any[] = [];
  selected_key = '';
  collectionSize = 0;
  page = 1;
  pageSize = 15;
  loading = false;
idEntite=1
  pg:any={
    pageSize:50,
    p:1,
    total:0
  }

  constructor(private pdaService: PdaService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // window.scroll(0, 0);
    this.thematiques = [{ id: 0, libelle: 'Toutes' }];
   this.getThematiques()
    this.loading = true;
    this.data = [];
    this._temp = [];
    // alert(this.route.snapshot.paramMap.get('param'))
    if (this.route.snapshot.paramMap.get('param') != null) {
      this.pdaService
        .getPrestationsByThematique(this.route.snapshot.paramMap.get('param'))
        .subscribe((res: any) => {
          this.data = res?.data;
          this.loading = false;
        });
    } else {

       this.pdaService.getEntiteFromIGSEP().subscribe({
      next: (res: any) => {
        this.institutions = res.data || [];
      },
      error: () => {
        this.institutions = [];
      }
    });
     this.getPrestations()
    }
  }

  getPrestations(){
     this.pdaService.getPrestations(this.idEntite).subscribe((res: any) => {
        this.data = res?.data;
        this._temp = this.data;
        this.collectionSize = this.data.length;
        this.loading = false;
      });
  }

  getThematiques(){
     this.pdaService.getThematiques(this.idEntite).subscribe((res: any) => {
      this.thematiques = res?.data;
          this.thematiques2 = [...[{ id: 0, libelle: 'Toutes' }],...this.thematiques.filter((e: any) => e.idEntite == this.idEntite)];

    });
  }


  filter1(event: DropdownChangeEvent) {
    this.data = [];
    if (event.value === 0) {
      this.data = this._temp;
    } else {
      this.idEntite=event.value
      this.getPrestations()
      this.getThematiques()
    }
    this.searchText = '';
    this.collectionSize = this.data.length;
  }


  filter(event: DropdownChangeEvent) {
    this.data = [];
    if (event.value === 0) {
      this.data = this._temp;
    } else {
      this.data = this._temp.filter((e: any) => e.idType == event.value);
    }
    this.searchText = '';
    this.collectionSize = this.data.length;
  }

  onActivate() {
    // window.scroll(0, 0);
  }

    getPage(event:any){
    this.pg.p=event
  }

}
