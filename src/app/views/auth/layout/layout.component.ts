import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicFooterComponent } from '../../public/public-layout/components/public-footer/public-footer.component';
import { PubHeaderComponent } from '../../public/public-layout/components/pub-header/pub-header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, PublicFooterComponent, PubHeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
