import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-prestation-item',
  templateUrl: './prestation-item.component.html',
  standalone:true,
  imports: [CommonModule,RouterModule],
  styleUrls: ['./prestation-item.component.css']
})
export class PrestationItemComponent {
@Input('data') data:any

}
