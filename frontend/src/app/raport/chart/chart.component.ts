import { Component } from '@angular/core';
import { Fatigue } from '../../models/fatigue.model';
import { FatigueService } from '../../services/fatigue.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent {
  fatigueData!: Fatigue[];
  id_player!: string;
  chartError: string = '';

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
        },
        error: (errorData) => {
          this.chartError = 'Jugador sin datos de fatiga registrados.';
        },
        complete: () => {
          console.log('Datos de la Fatiga del jugador encontrados');
        },
      });
    });
  }
}
