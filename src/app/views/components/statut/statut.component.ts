import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-statut',
  standalone: true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent],
  // standalone: true,
  // imports: [
  //   CommonModule,
  // ],
  templateUrl: './statut.component.html',
  styleUrl: './statut.component.css'
})
export class StatutComponent {
  @Input('status') status:any;
  @Input('message') message:any;  
}
