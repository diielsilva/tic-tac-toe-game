import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {Match} from '../../models/match';

@Component({
  selector: 'app-choose-option',
  imports: [],
  templateUrl: './choose-option.component.html',
  styleUrl: './choose-option.component.css'
})
export class ChooseOptionComponent {
  public match: InputSignal<Match> = input.required<Match>();
  public onChoose: OutputEmitterRef<number> = output<number>();

  protected choose(option: number): void {
    this.onChoose.emit(option);
  }

}
