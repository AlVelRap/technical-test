import { Component, OnInit } from '@angular/core';
import { Fatigue } from '../../models/fatigue.model';
import { FatigueService } from '../../services/fatigue.service';
import { ActivatedRoute } from '@angular/router';
import {
  Chart,
  ChartConfiguration,
  ChartOptions,
  ChartType,
} from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent {
  fatigueData!: Fatigue[];
  id_player!: string;
  chartError: string = '';
  public chart: any;
  chartData: number[] = [];
  chartLabels: string[] = [];

  constructor(
    private fatigueService: FatigueService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((parameter) => {
      this.id_player = parameter['id_player'];
      this.fatigueService.findByPlayer(parameter['id_player']).subscribe({
        next: (data) => {
          this.chartError = '';
          this.fatigueData = data;
          console.log(data);
        },
        error: (errorData) => {
          this.chartError = 'Jugador sin datos de fatiga registrados en la última semana.';
          this.chart.data.labels = [];
          this.chart.data.datasets[0].data = [];
          this.chart.update();
        },
        complete: () => {
          const labels = this.fatigueData.map((fatigue: Fatigue) => {
            const date = fatigue.registry_date
              ? new Date(fatigue.registry_date)
              : new Date();
            const day = String(date.getDay()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
          });

          this.chart.data.labels = labels;

          const data = this.fatigueData.map((fatigue: Fatigue) => {
            return fatigue.feeling;
          });

          this.chart.data.datasets[0].data = data;
          this.chart.update();

          console.log('Datos de la Fatiga del jugador encontrados');
        },
      });
    });
  }

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'line' as ChartType,
      data: {
        // values on X-Axis
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Fatiga',
            data: this.chartData,
            backgroundColor: '#F652A0',
            pointRadius: 5
          },
        ],
      },
      options: {
        responsive:true
      },
    });
  }
}
