import { Coord } from './interfaces';
import { Fen } from './Types';
const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export class Board {
  private _state: string[][];
  private _activeColor: string;
  private _castling: object;
  private _enPassant: Coord | null;

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

  static castlingFromFen(fen: string): object {
    const [, , castlingFen, , ,] = fen.split(' ');
    const castling = {
      w: { king: false, queen: false },
      b: { king: false, queen: false },
    };
    // TODO Better way?
    if (castlingFen.includes('K')) castling.w.king = true;
    if (castlingFen.includes('Q')) castling.w.queen = true;
    if (castlingFen.includes('k')) castling.b.king = true;
    if (castlingFen.includes('q')) castling.b.queen = true;
    return castling;
  }

  static enPassantFromFen(fen: string): Coord | null {
    const [, , , enPassantFen, ,] = fen.split(' ');
    if (enPassantFen === '-') return null;
    return this.algebraicToCoord(enPassantFen);
  }

  static boardStateFromFen(fen = START_FEN): [string[][], string, object, Coord | null] {
    const piecePlacement = this.piecePlacementFromFen(fen);
    const [, activeColor, , , ,] = fen.split(' ');
    const castling = this.castlingFromFen(fen);
    const enPassant = this.enPassantFromFen(fen);

    return [piecePlacement, activeColor, castling, enPassant];
  }

  // 'fen' can be the whole fen-string or only the board-describing part.
  constructor(fen: Fen = START_FEN) {
    [this._state, this._activeColor, this._castling, this._enPassant] =
      Board.boardStateFromFen(fen);
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
