import { Coord } from './interfaces';
import { Fen } from './Types';
const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export class Board {
  private _state: string[][];
  private _activeColor: string;
  private _castling: string;
  private _enPassant: string;

  // TODO Any way to resolve the "any" type?
  get enPassant(): any {
    if (this._enPassant === '-') return null;
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
    const y = parseInt(algebraic[1]) - 1;
    const x = algebraic.charCodeAt(0) - 97;

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
  constructor(fen: Fen = START_FEN) {
    const [, activeColor, castling, enPassant, ,] = fen.split(' ');
    this._state = Board.piecePlacementFromFen(fen);
    this._activeColor = activeColor;
    this._castling = castling;
    this._enPassant = enPassant;
  }

  getSquare(pos: Coord) {
    return this._state[pos.y][pos.x];
  }

  rankToFen(rank: string[]): string {
    const rankString = rank.reduce((accum, el) => accum + el, '');
    const reg = /([\sprkbqkPRKBQK])\1*/g;
    const r = rankString.match(reg)!;
    const fen = r?.reduce((accum, el) => {
      if (el[0] === ' ') return accum + el.length;
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
