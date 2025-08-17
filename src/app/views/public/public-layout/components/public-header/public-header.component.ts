import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-public-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './public-header.component.html',
  styleUrl: './public-header.component.css'
})
export class PublicHeaderComponent {
 isMenuOpen = false;

  // Lucide icons
  // menuIcon = Menu;
  // xIcon = X;
  // userIcon = User;
  // bellIcon = Bell;

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
