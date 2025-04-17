import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

@Component({
  selector: 'app-info-carriere',
  standalone: true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent],
  templateUrl: './info-carriere.component.html',
  styleUrls: ['./info-carriere.component.css']
})
export class InfoCarriereComponent implements OnInit {

  constructor(private http: HttpClient,private router:Router) { }

  ngOnInit(): void {

  }


 
}
