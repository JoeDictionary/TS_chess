import { EMPTY_SQ } from './PieceMoves';
import { Coord } from './interfaces';
import { Fen } from './Types';
const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export class Board {
  private _state: string[][];
  private _activeColor: string;
  private _castling: string;
  private _enPassant: string;

  // TODO Any way to resolve the "any" type?
  get enPassant(): Coord {
    if (this._enPassant === '-') return { y: -1, x: -1 };
    return Board.algebraicToCoord(this._enPassant);
  }

  set enPassant({ y, x }: Coord) {
    const file = String.fromCharCode(97 + y);
    const rank = x + 1;
    this._enPassant = `${file}${rank}`;
  }

  // TODO Move to some kind of utility namespace
  // WARNING: Not meant to translate moves but square positions.
  static algebraicToCoord(algebraic: string) {
    const [rank, file] = [algebraic[1], algebraic[0]];
    const y = 7 - (parseInt(rank) - 1);
    const x = file.charCodeAt(0) - 97;

    return { y: y, x: x };
  }

  static piecePlacementFromFen(fen: string): string[][] {
    const [piecePlacementFen, , , , ,] = fen.split(' ');

    const ranks = piecePlacementFen.split('/');
    let board = [];
    for (const rank of ranks) {
      let boardRank: string[] = [];
      for (const i of rank) {
        if (/[1-8]/.test(i)) {
          boardRank = boardRank.concat(Array(parseInt(i)).fill(EMPTY_SQ));
        } else {
          boardRank.push(i);
        }
      }
      board.push(boardRank);
    }
    return board;
  }

  // 'fen' can be the whole fen-string or only the board-describing part.
  constructor(fen: Fen = START_FEN) {
    const [, activeColor, castling, enPassant, ,] = fen.split(' ');
    this._state = Board.piecePlacementFromFen(fen);
    this._activeColor = activeColor;
    this._castling = castling;
    this._enPassant = enPassant;
  }

  // Returns square at {y, x}. If out of board bounds returns '!'.
  getSq({ y, x }: Coord): string {
    if (y >= 0 && y <= 7 && x >= 0 && x <= 7) return this._state[y][x];
    return '!';
  }

  rankToFen(rank: string[]): string {
    const rankString = rank.reduce((accum, el) => accum + el, '');
    const re = RegExp(`([${EMPTY_SQ}prkbqkPRKBQK])\\1*`, 'g');
    const r = rankString.match(re)!;
    const fen = r?.reduce((accum, el) => {
      if (el[0] === EMPTY_SQ) return accum + el.length;
      return accum + el;
    }, '');

    return fen;
  }

  stateToFen() {
    const a = this._state.reduce((accum, el) => accum.concat(this.rankToFen(el)), []);
    return a.join('/');
  }

  boardStateToFen(): string {
    let fen = '';
    const piecePlacement = this.stateToFen();

    return `${piecePlacement} ${this._activeColor} ${this._castling} ${this._enPassant} 0 1`;
  }

  get state(): string[][] {
    return this._state;
  }
}
