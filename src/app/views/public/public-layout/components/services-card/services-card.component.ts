import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './services-card.component.html',
  styleUrls: ['./services-card.component.css'],
})
export class ServiceCardComponent {
  @Input() service!: any;

  clockIcon = Clock;
  chevronRightIcon = ChevronRight;
  externalLinkIcon = ExternalLink;

  @Output() serviceSelect = new EventEmitter<string>();

  isHovered = false;

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'Facile':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Moyen':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Difficile':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  }

  onServiceClick(event?: MouseEvent) {
    if (event) event.stopPropagation();
    this.serviceSelect.emit(this.service.id);
  }

  stopClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
