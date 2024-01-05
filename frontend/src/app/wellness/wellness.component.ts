import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FatigueService } from '../services/fatigue.service';
import { Fatigue } from '../models/fatigue.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../models/player.model';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-wellness',
  templateUrl: './wellness.component.html',
  styleUrl: './wellness.component.scss',
})
export class WellnessComponent implements OnInit {
  wellnessError: string = '';
  wellnessForm = this.formBuilder.group({
    feeling: ['', Validators.required],
  });
  playerData!: Player;

  constructor(
    private formBuilder: FormBuilder,
    private fatigueService: FatigueService,
    private playerService: PlayerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.playerService.getOne(this.id_player || '').subscribe({
      next: (data) => {
        this.playerData = data;
      },
      error: (errorData) => {
        console.error(errorData);
      },
      complete: () => {
        console.info('Jugador encontrado');
      },
    });
  }

  get feeling() {
    return this.wellnessForm.controls.feeling;
  }
  get id_player() {
    return this.route.snapshot.paramMap.get('id_player');
  }

  register() {
    if (!this.wellnessForm.valid) {
      this.wellnessForm.markAllAsTouched();
      alert('Error al ingresar los datos.');
      return;
    }
    this.wellnessError = '';
    console.log(this.feeling.value);
    const fatigue: Fatigue = {
      feeling: this.feeling.value ? Number.parseInt(this.feeling.value) : NaN,
      id: undefined,
      id_player: this.id_player ? Number.parseInt(this.id_player) : NaN,
      registry_date: undefined,
    };
    this.fatigueService.create(fatigue).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (errorData) => {
        console.error(errorData);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Un error ocurrió!',
        });
        this.wellnessError = errorData;
      },
      complete: () => {
        console.info('Fatiga registrada');
        Swal.fire({ icon: 'success', title: 'Fatiga registrada!' });
        this.router.navigateByUrl('/player');
        this.wellnessForm.reset();
      },
    });
  }
}
