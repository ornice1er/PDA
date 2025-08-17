import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { SampleSearchPipe } from '../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../components/loading/loading.component';
import { StatutComponent } from '../../components/statut/statut.component';

@Component({
  selector: 'app-register-success',
  standalone: true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent,RouterModule],
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.css']
})
export class RegisterSuccessComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  gotoHashtag(fragment: string) {
     
    setTimeout(function(){
      const element:any = document.querySelector("#" + fragment);
      if (element) element.scrollIntoView();
    })
}
}
