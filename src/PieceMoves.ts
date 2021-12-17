import { Board } from './Board';
import { Coord } from './interfaces';
import { Fen } from './Types';

const WHITE_PIECES = 'PRNBQK';
const BLACK_PIECES = 'prnbqk';
const ALL_PIECES = WHITE_PIECES + BLACK_PIECES;

export class PieceMoves {
  // TODO Leave in this class or move elsewhere?
  static N = { x: 0, y: -1 };
  static S = { x: 0, y: 1 };
  static E = { x: 1, y: 0 };
  static W = { x: -1, y: 0 };
  static NE = { x: 1, y: -1 };
  static NW = { x: -1, y: -1 };
  static SE = { x: 1, y: 1 };
  static SW = { x: -1, y: 1 };

  static isPiece(p: string) {
    return ALL_PIECES.includes(p);
  }

  static isWhite(piece: string) {
    return piece === piece.toUpperCase();
  }

  // static haveSameColor(piece1: string, piece2: string): boolean {
  //   return this.isWhite(piece1) === this.isWhite(piece2);
  // }

  static isOutOfBounds(pos: Coord) {
    return pos.x > 7 || pos.x < 0 || pos.y > 7 || pos.y < 0;
  }

  static offsetLineMoves(board: Board, pos: Coord, offset: Coord): Coord[] {
    /* Returns moves in a line from a given position */
    let moves: Coord[] = [];
    const isWhite = this.isWhite(board.state[pos.y][pos.x]);

    for (
      let y = pos.y + offset.y, x = pos.x + offset.x;
      !this.isOutOfBounds({ y: y, x: x });
      y += offset.y, x += offset.x
    ) {
      // console.log(`loop    x: ${x}    y: ${y}`);
      const targetSquare = board.state[y][x];
      const isTargetPiece = this.isPiece(targetSquare);
      const isTargetWhite = this.isWhite(targetSquare);

      if (this.isPiece(targetSquare) && isTargetWhite === isWhite) break;
      moves.push({ y: y, x: x });
      if (isTargetPiece && isTargetWhite !== isWhite) break;
    }
    return moves;
  }

  static RookMoves(board: Board, pos: Coord): Coord[] {
    const offsets = [this.E, this.W, this.N, this.S];

    let moves: Coord[] = [];

    for (let offset of offsets) {
      const a = this.offsetLineMoves(board, pos, offset);
      moves = moves.concat(a);
    }
    return moves;
  }

  // TODO CODE REPEATING
  static BishopMoves(board: Board, pos: Coord): Coord[] {
    const offsets = [this.NE, this.NW, this.SE, this.SW];

    let moves: Coord[] = [];

    for (let offset of offsets) {
      const a = this.offsetLineMoves(board, pos, offset);
      moves = moves.concat(a);
    }
    return moves;
  }
}
