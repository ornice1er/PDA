import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule,BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements AfterViewInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() data!: ChartData<'bar'> ;
  @Input() options!: ChartConfiguration<'bar'>['options'];
  public barChartType = 'bar' as const;

  ngAfterViewInit() {
    console.log('------------------------------',this.data)
    this.chart?.update();
  }

   ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.chart) {
      this.chart.update(); // met à jour quand les données changent
    }
  }
}
