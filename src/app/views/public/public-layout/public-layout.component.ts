import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../components/loading/loading.component';
import { StatutComponent } from '../../components/statut/statut.component';
import { PublicHeaderComponent } from './components/public-header/public-header.component';
import { PublicFooterComponent } from './components/public-footer/public-footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { PubHeaderComponent } from './components/pub-header/pub-header.component';
import { StatisticsComponent } from "./components/statistics/statistics.component";
import { ServicesComponent } from './components/services/services.component';
import { JeDenonceComponent } from '../pages/je-denonce/je-denonce.component';

@Component({
  selector: 'app-public-layout',
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
    RouterModule,
    RouterOutlet,
    PublicFooterComponent,
    HeroComponent,
    PubHeaderComponent,
    StatisticsComponent,
    ServicesComponent,
    JeDenonceComponent
],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css',
})
export class PublicLayoutComponent {
  settings: any;
}
