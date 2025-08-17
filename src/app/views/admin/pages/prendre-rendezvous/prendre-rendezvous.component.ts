import { Component, OnInit, ViewChild } from '@angular/core';
// import { PdaService } from '../../core/_services/pda.servic';
// 
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';
import { PdaService } from '../../../../core/services/pda.servic';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';

@Component({
  selector: 'app-prendre-rendezvous',
  standalone: true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent],
  templateUrl: './prendre-rendezvous.component.html',
  styleUrls: ['./prendre-rendezvous.component.css']
})
export class PrendreRendezvousComponent implements OnInit {

  structures:any = []
  crenaux:any= []
  constructor(private pdaService: PdaService,private router:Router, private modalService:NgbModal) { }
  recup_data:any
  closeResult=""
  @ViewChild('content') content : any;

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    window.scroll(0,0);
    this.structures = []
    this.pdaService.getStructures(1, 1).subscribe(
      (res: any) => {
        this.structures = res
      })

    this.crenaux = []
    this.pdaService.getRdvCreneaux().subscribe(
      (res: any) => {
        this.crenaux = res
      })
  }

  loading=false

  save(value:any) {
    this.recup_data=value
    this.modalService.open(this.content);
   
  }

  showCreneaux(id:any){
    let el=this.crenaux.filter((e:any)=>(e.id==id))[0]
    return el.heureDebut+" "+el.heureFin
  }
  showStructure(id:any){
    let el=this.structures.filter((e:any)=>(e.id==id))[0]
    return el.libelle
  }

  validate(){
    let value:any=this.recup_data  
    value.status=1
    value.idEntite=1
    this.loading=true
     this.pdaService.storeRDV(value).subscribe((res:any)=>{
      this.loading=false
      this.modalService.dismissAll()
      if(res.status=="success"){
        AppSweetAlert.simpleAlert("success","Rendez-vous","Demande de rendez-vous envoyée avec succès")
        this.router.navigateByUrl('/main')
      }else{
        AppSweetAlert.simpleAlert("error","Rendez-vous",res.msg)
      }
     }, (err)=>{
      this.loading=false;
        AppSweetAlert.simpleAlert("error","Une erreur est survenue lors du processus. Veuillez contacter l'administrateur ou réessayer plutard")}
      )
  }
}

