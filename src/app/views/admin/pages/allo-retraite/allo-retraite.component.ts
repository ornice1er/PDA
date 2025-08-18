import { Component, OnInit } from '@angular/core';
// import { PdaService } from '../../core/_services/pda.servic';
// 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';
import { PdaService } from '../../../../core/services/pda.servic';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';

@Component({
  selector: 'app-allo-retraite',
  standalone: true,
  
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent],
  templateUrl: './allo-retraite.component.html',
  styleUrls: ['./allo-retraite.component.css']
})
export class AlloRetraiteComponent implements OnInit {

  constructor(private pdaService:PdaService,private router:Router) { }

  ngOnInit(): void {
    window.scroll(0,0);
  }


  loading=false
  save(value:any){
  
    this.loading=true
    value.plateforme="PDA"
    value.idEntite=1
    value.interfaceRequete="Usager Retraite"
    value.link_to_prestation=1
    value.plainte=2
    value.objet="Préoccupation / Usager Retraite"
    value.msgrequest+="\n Nom complet : "+value.lastname+" "+value.firstname
    value.msgrequest+="\n Matricule : "+value.code
    value.msgrequest+="\n Ministère / Institution : "+value.entity_name
    value.msgrequest+="\n Téléphone : "+value.contact
    value.msgrequest+="\n Année de départ : "+value.out_year
    value.msgrequest+="\n Localité : "+value.locality
    value.msgrequest+="\n Autre contact : "+value.contact_proche
    value.msgrequest+="\n Email : "+value.email
    
     this.pdaService.storePreoccupation(value).subscribe((res:any)=>{
      this.loading=false
      if(res.success){
        AppSweetAlert.simpleAlert("success","Requete usager","Requete envoyée avec succès")
        this.router.navigateByUrl('/main')
      }
     },(err)=>{
      this.loading=false;
        AppSweetAlert.simpleAlert("error","Erreur","Une erreur est survenue lors du processus. Veuillez contacter l'administrateur ou réessayer plutard")}
      )
  }
}
