import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule,BaseChartDirective],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements AfterViewInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @Input() lineChartData!: ChartConfiguration['data'];
  @Input() lineChartOptions!: ChartConfiguration['options'];
  public lineChartType: ChartType = 'line';

  ngAfterViewInit() {
    this.chart?.update();
  }

   ngOnChanges(changes: SimpleChanges) {
    if (changes['lineChartData'] && this.chart) {
      this.chart.update(); // met à jour quand les données changent
    }
  }
}
