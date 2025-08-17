import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pub-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pub-header.component.html',
  styleUrls: ['./pub-header.component.css']
})
export class PubHeaderComponent {
  isMenuOpen = false;

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
