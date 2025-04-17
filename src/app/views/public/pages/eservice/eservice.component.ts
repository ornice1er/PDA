import { Component, OnInit } from '@angular/core';
// import { NgwWowModule, NgwWowService } from 'ngx-wow';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';
import { PdaService } from '../../../../core/services/pda.servic';
import { PrestationItemComponent } from '../../../components/prestation-item/prestation-item.component';

@Component({
  selector: 'app-eservice',
  templateUrl: './eservice.component.html',

    standalone: true,
      imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent,PrestationItemComponent],
  styleUrls: ['./eservice.component.css']
})
export class EserviceComponent implements OnInit {
data:any[]=[]
private wowSubscription: Subscription | undefined;

  constructor(
    private router: Router, 
    private pdaService:PdaService,
  //  private wowService: NgwWowService
  ) { 
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
         // this.wowService.init(); 
        }
     });
    }

  ngOnInit(): void {
    // this.wowSubscription = this.wowService.itemRevealed$.subscribe(
    //   (item:HTMLElement) => {
    //     // do whatever you want with revealed element
    //   });
    this.pdaService.getEservices().subscribe((res:any)=>{
      this.data=res.data
    })
  }


  ngOnDestroy() {
    this.wowSubscription?.unsubscribe();
  }
}
