import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
// import { PdaService } from '../../core/_services/pda.servic';
// 
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';
import { PdaService } from '../../../../core/services/pda.servic';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';


@Component({
  selector: 'app-je-denonce',
  standalone: true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent],
  templateUrl: './je-denonce.component.html',
  styleUrls: ['./je-denonce.component.css']
})
export class JeDenonceComponent implements OnInit {
 
  institutions: any[] = [];
  recup_data: any;
  closeResult = '';
  file: File | null = null;
  select_entity = '';
  loading = false;

  @ViewChild('content') content: any;

  constructor(
    private pdaService: PdaService,
    private router: Router,
    private modalService: NgbModal,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    // ✅ S'assure que le code ne tourne que dans le navigateur
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }

    this.pdaService.getEntiteFromIGSEP().subscribe({
      next: (res: any) => {
        this.institutions = res.data || [];
      },
      error: () => {
        this.institutions = [];
      }
    });
  }

   open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => this.closeResult = `Closed with: ${result}`,
      (reason) => this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) return 'by pressing ESC';
    if (reason === ModalDismissReasons.BACKDROP_CLICK) return 'by clicking on a backdrop';
    return `with: ${reason}`;
  }

  showEntity(id: any): string {
    const el = this.institutions.find((e: any) => e.id === id);
    return el ? el.libelle : '';
  }

  save(usagerDenonciationform: any) {
    this.loading = true;

    // Construction du résumé enrichi
    usagerDenonciationform.value.resume += `\n Nom complet : ${usagerDenonciationform.value.nom} ${usagerDenonciationform.value.prenoms}`;
    if (this.select_entity !== 'private-admin') {
      if (this.select_entity) {
        usagerDenonciationform.value.resume += `\n Ministère / Institution de provenance : ${usagerDenonciationform.value.entity}`;
      }
    } else {
      usagerDenonciationform.value.resume += `\n Administration privée de provenance : ${usagerDenonciationform.value.precision_entity}`;
    }
    usagerDenonciationform.value.resume += `\n Téléphone : ${usagerDenonciationform.value.phone}`;
    usagerDenonciationform.value.resume += `\n Email : ${usagerDenonciationform.value.email}`;

    const formData = new FormData();
    formData.append('nom', usagerDenonciationform.value.nom);
    formData.append('prenoms', usagerDenonciationform.value.prenoms);
    formData.append('email', usagerDenonciationform.value.email);
    formData.append('phone', usagerDenonciationform.value.phone);
    formData.append('entity', usagerDenonciationform.value.entity);
    formData.append('precision_entity', usagerDenonciationform.value.precision_entity);
    formData.append('resume', usagerDenonciationform.value.resume);

    if (this.file) {
      formData.append('fichier_joint', this.file);
    }
    this.pdaService.storeDenonciation2(formData).subscribe({
      next: (res: any) => {
        this.loading = false;
          AppSweetAlert.simpleAlert('success', 'Dénonciation', 'Votre dénonciation a été envoyée avec succès');
          usagerDenonciationform.resetForm()
      },
      error: () => {
        this.loading = false;
        AppSweetAlert.simpleAlert('error', 'Erreur', 'Une erreur est survenue lors du processus. Veuillez contacter l\'administrateur ou réessayer plus tard');
      }
    });
  }

  onFileChange(event: Event) {
    this.file = null;
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.file = input.files[0];
    }
  }

  validate() {
    // TODO: compléter la logique si nécessaire
  }

}
