import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss',
})
export class PlayerListComponent implements OnInit {
  playerList: Player[] = [];

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.getAll().subscribe({
      next: (response) => {
        this.playerList=response
        console.log(response);
      },error: (errorData) => {
        console.error(errorData);
      },
      complete: () => {
        console.info('Carga completa');
      },
    });
  }
}
