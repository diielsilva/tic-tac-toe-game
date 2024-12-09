import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {BoardPosition} from '../models/board-position';
import {Match} from '../models/match';
import {MatchState} from '../enums/match-state';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private matchSignal: WritableSignal<Match> = signal<Match>(this.start());
  public matchState: Signal<Match> = computed(() => this.matchSignal());

  private start(): Match {
    const choices: string[] = this.getChoices();
    const board: BoardPosition[][] = this.getEmptyBoard();
    const availablePositions: string[] = this.getAvailablePositions();

    return {
      state: MatchState.INITIAL,
      choices: choices,
      player: '',
      cpu: '',
      turnBelongsTo: '',
      availablePositions,
      board
    };
  }

  private getChoices(): string[] {
    return ['X', 'O'];
  }

  private getEmptyBoard(): BoardPosition[][] {
    const board: BoardPosition[][] = [];

    for (let i: number = 0; i < 3; i++) {
      const row: BoardPosition[] = []

      for (let j: number = 0; j < 3; j++) {
        const position: BoardPosition = {value: '', disabled: false, isVictorySequence: false};
        row.push(position);
      }

      board.push(row);
    }

    return board;
  }

  private getAvailablePositions(): string[] {
    const positions: string[] = [];

    for (let i: number = 0; i < 3; i++) {

      for (let j: number = 0; j < 3; j++) {
        const position: string = `${i}${j}`;
        positions.push(position);
      }

    }

    return positions;
  }

}
