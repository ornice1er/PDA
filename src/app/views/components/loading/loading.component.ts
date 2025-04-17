import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SampleSearchPipe } from '../../../core/pipes/sample-search.pipe';
import { StatutComponent } from '../statut/statut.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-loading',
  imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent],
  templateUrl: './loading.component.html',
  standalone:true,
  // imports:[CommonModule],
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  @Input() isVisible=false;

  constructor() { }

  ngOnInit(): void {
  }

}
