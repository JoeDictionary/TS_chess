import { Fen } from './Types';
const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export class Board {
  private _state: string[][];

  // 'fen' can be the whole fen-string or only the board-describing part.
  static boardStateFromFen(fen = START_FEN): string[][] {
    const [boardState, , , , ,] = fen.split(' ');

    const ranks = boardState.split('/');
    let board = [];

    for (const rank of ranks) {
      let boardRank: string[] = [];
      for (const i of rank) {
        if (/[1-8]/.test(i)) {
          boardRank = boardRank.concat(Array(parseInt(i)).fill(' '));
        } else {
          boardRank.push(i);
        }
      }
      board.push(boardRank);
    }
    return board;
  }

  // 'fen' can be the whole fen-string or only the board-describing part.
  constructor(board: Fen | string[][] = START_FEN) {
    if (typeof board === 'string') {
      this._state = Board.boardStateFromFen(board);
    } else {
      this._state = board;
    }
  }

  get state(): string[][] {
    return this._state;
  }

  set state(newState: string[][] | Fen) {
    if (typeof newState === 'string') {
      this._state = Board.boardStateFromFen(newState);
      return;
    }
    this._state = newState;
  }
}
