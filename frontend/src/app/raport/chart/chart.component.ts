import { Component, OnInit } from '@angular/core';
import { Fatigue } from '../../models/fatigue.model';
import { FatigueService } from '../../services/fatigue.service';
import {
  ActivatedRoute,
  Event,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements OnInit {
  fatigueData!: Fatigue[];
  id_player!: string;
  chartError: string = '';

  constructor(
    private fatigueService: FatigueService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((parameter) => {
      this.id_player = parameter['id_player'];
      this.fatigueService.findByPlayer(this.id_player).subscribe({
        next: (data) => {
          console.log(data);
          this.fatigueData = data;
        },
        error: (errorData) => {
          this.chartError = "Jugador sin datos de fatiga registrados.";
        },
      });
    });
  }

  ngOnInit(): void {
    this.fatigueService.findByPlayer(this.id_player).subscribe({
      next: (data) => {
        console.log(data);
        this.fatigueData = data;
      },
    });
  }
  // get id_player() {
  //   return this.route.snapshot.paramMap.get('id_player') || '';
  // }
}
