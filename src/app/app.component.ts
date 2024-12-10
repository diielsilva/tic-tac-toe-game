import {Component, inject, Signal} from '@angular/core';
import {MatchService} from './services/match.service';
import {Match} from './models/match';
import {ChooseOptionComponent} from './components/choose-option/choose-option.component';
import {BoardComponent} from './components/board/board.component';
import {ResetComponent} from './components/reset/reset.component';

@Component({
  selector: 'app-root',
  imports: [
    ChooseOptionComponent,
    BoardComponent,
    ResetComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private matchService: MatchService = inject(MatchService);
  protected matchState: Signal<Match> = this.matchService.matchState;

  protected choose(option: number): void {
    this.matchService.chosen(option);
  }

  protected play(indexes: number[]): void {
    this.matchService.play(indexes[0], indexes[1]);
  }

  protected restart(): void {
    this.matchService.reset();
  }

}
