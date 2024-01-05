import { Component } from '@angular/core';
import { Player } from '../../models/player.model';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  playerList: Player[] = [];

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.getAll().subscribe({
      next: (response) => {
        this.playerList = response;
        console.log(response);
      },
      error: (errorData) => {
        console.error(errorData);
      },
      complete: () => {
        console.info('Carga completa');
      },
    });
  }
}
