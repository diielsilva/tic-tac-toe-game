import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {Match} from '../../models/match';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  public readonly matchState: InputSignal<Match> = input.required<Match>();
  public readonly onChoose: OutputEmitterRef<number[]> = output<number[]>();

  protected choose(row: number, column: number): void {
    this.onChoose.emit([row, column]);
  }

}
