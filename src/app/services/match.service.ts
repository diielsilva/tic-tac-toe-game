import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {BoardPosition} from '../models/board-position';
import {Match} from '../models/match';
import {MatchState} from '../enums/match-state';
import {MatchResult} from '../enums/match-result';

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

  public chosen(choice: number): void {
    let player: string = '';
    let cpu: string = '';

    if (choice === 0) {
      player = this.matchSignal().choices[0];
      cpu = this.matchSignal().choices[1];
    } else {
      player = this.matchSignal().choices[1];
      cpu = this.matchSignal().choices[0];
    }

    this.matchSignal().state = MatchState.PLAYING;
    this.matchSignal().player = player;
    this.matchSignal().cpu = cpu;
    this.matchSignal().turnBelongsTo = player;
  }

  public play(row: number, column: number): void {
    const position: string = this.compactChosenPosition(row, column);
    const currentTurn: string = this.matchSignal().turnBelongsTo;

    if (this.isAvailable(position)) {
      this.matchSignal().board[row][column].value = currentTurn;
      this.removeChosenPosition(position);

      const canHaveWinner: boolean = this.matchSignal().availablePositions.length < 5;

      if (canHaveWinner) {

        const hasWinner: boolean = this.hasSequenceInRows() || this.hasSequenceInColumns() || this.hasSequenceInDiagonals();
        const hasDraw: boolean = this.matchSignal().availablePositions.length === 0 && !hasWinner;

        if (hasWinner) {
          this.matchSignal().state = MatchState.FINISHED;
          this.matchSignal().result = currentTurn === this.matchSignal().player ? MatchResult.PLAYER_VICTORY : MatchResult.CPU_VICTORY;
        }

        if (hasDraw) {
          this.matchSignal().state = MatchState.FINISHED;
          this.matchSignal().result = MatchResult.DRAW;
        }

      }

      this.changeTurn(currentTurn);

      const isCpuTurn: boolean = this.matchSignal().turnBelongsTo === this.matchSignal().cpu;

      if (isCpuTurn) {
        const position: string = this.getRandomPosition();
        const indexes: number[] = this.extractChosenPosition(position);

        this.play(indexes[0], indexes[1]);
      }

    }

  }

  public reset(): void {
    this.matchSignal.set(this.start());
  }

  private compactChosenPosition(row: number, column: number): string {
    return `${row}${column}`;
  }

  private extractChosenPosition(position: string): number[] {
    const row: number = Number.parseInt(position[0]);
    const column: number = Number.parseInt(position[1]);

    return [row, column];
  }

  private isAvailable(position: string): boolean {
    return this.matchSignal().availablePositions.includes(position);
  }

  private removeChosenPosition(chosen: string): void {
    this.matchSignal().availablePositions = this.matchSignal().availablePositions.filter(position => position !== chosen);
  }

  private changeTurn(currentTurn: string): void {
    const player = this.matchSignal().player;
    const cpu = this.matchSignal().cpu;
    let nextTurn: string = '';

    if (currentTurn === player) {
      nextTurn = cpu;
    } else {
      nextTurn = player;
    }

    this.matchSignal().turnBelongsTo = nextTurn;
  }

  private hasSequenceInDiagonals(): boolean {
    let firstDiagonal: string[] = [];
    let secondDiagonal: string[] = [];
    const currentPlayer = this.matchSignal().turnBelongsTo;
    let position = 2;

    //Validating First Diagonal
    for (let i: number = 0; i < 3; i++) {

      if (this.matchSignal().board[i][i].value === currentPlayer) {
        firstDiagonal.push(currentPlayer);
      }

    }

    //Validating Second Diagonal
    for (let i: number = 0; i < 3; i++) {

      if (this.matchSignal().board[i][position].value === currentPlayer) {
        secondDiagonal.push(currentPlayer);
      }

      position--;
    }

    return firstDiagonal.length === 3 || secondDiagonal.length === 3;
  }


  private hasSequenceInRows(): boolean {
    const currentPlayer: string = this.matchSignal().turnBelongsTo;

    for (let i: number = 0; i < 3; i++) {
      let sequence: string[] = [];

      for (let j: number = 0; j < 3; j++) {
        if (this.matchSignal().board[i][j].value === currentPlayer) {
          sequence.push(currentPlayer);
        }
      }

      if (sequence.length === 3) {
        return true;
      }

    }

    return false;
  }

  private hasSequenceInColumns(): boolean {
    const currentPlayer: string = this.matchSignal().turnBelongsTo;

    for (let i: number = 0; i < 3; i++) {
      let sequence: string[] = [];

      for (let j: number = 0; j < 3; j++) {
        if (this.matchSignal().board[j][i].value === currentPlayer) {
          sequence.push(currentPlayer);
        }
      }

      if (sequence.length === 3) {
        return true;
      }

    }

    return false;
  }

  private getRandomPosition(): string {
    const index: number = Math.floor(Math.random() * this.matchSignal().availablePositions.length);
    return this.matchSignal().availablePositions[index];
  }

}
