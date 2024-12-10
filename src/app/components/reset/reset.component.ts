import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {Match} from '../../models/match';

@Component({
  selector: 'app-reset',
  imports: [],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export class ResetComponent {
  public readonly match: InputSignal<Match> = input.required<Match>();
  public readonly onReset: OutputEmitterRef<void> = output<void>();

  protected reset(): void {
    this.onReset.emit();
  }
}
