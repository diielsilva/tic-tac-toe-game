import {MatchState} from '../enums/match-state';
import {MatchResult} from '../enums/match-result';
import {BoardPosition} from './board-position';

export interface Match {
  state: MatchState;
  choices: string[];
  player: string;
  cpu: string;
  turnBelongsTo: string;
  availablePositions: string[];
  board: BoardPosition[];
  result?: MatchResult;
}
