import { Board } from './Board';
import { Coord } from './interfaces';
import { Fen } from './Types';

const WHITE_PIECES = 'PRNBQK';
const BLACK_PIECES = 'prnbqk';
export const EMPTY_SQ = ' '; // Cannot be an empty string

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

  static getPiece(board: Board, pos: Coord): string {
    return board.state[pos.y][pos.x];
  }

  /*
  Returns straight line of moves in a given "direction" on the "board" from POV of piece on position "pos".
  If color different form the color of the piece on "pos" on the "board" should be used, set "isWhite" accordingly.
  Used for example in move generation for Rooks or Bishops.
  */
  static lineMoves(
    board: Board,
    pos: Coord,
    direction: Coord,
    isWhite?: boolean
  ): Coord[] {
    let moves: Coord[] = [];
    if (!isWhite) {
      isWhite = this.isWhite(board.state[pos.y][pos.x]);
    }

    for (
      let y = pos.y + direction.y, x = pos.x + direction.x;
      !this.isOutOfBounds({ y: y, x: x });
      y += direction.y, x += direction.x
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

  // TODO move this into "lineMoves"
  static multipleLinesMoves(
    board: Board,
    pos: Coord,
    directions: Coord[],
    isWhite?: boolean
  ): Coord[] {
    let moves: Coord[] = [];

    for (let direction of directions) {
      const m = this.lineMoves(board, pos, direction, isWhite);
      moves = moves.concat(m);
    }

    return moves;
  }

  static RookMoves(board: Board, pos: Coord): Coord[] {
    const directions = [this.E, this.W, this.N, this.S];
    return this.multipleLinesMoves(board, pos, directions);
  }

  static BishopMoves(board: Board, pos: Coord): Coord[] {
    const directions = [this.NE, this.NW, this.SE, this.SW];
    return this.multipleLinesMoves(board, pos, directions);
  }

  static QueenMoves(board: Board, pos: Coord): Coord[] {
    const directions = [
      this.E,
      this.W,
      this.N,
      this.S,
      this.NE,
      this.NW,
      this.SE,
      this.SW,
    ];

    return this.multipleLinesMoves(board, pos, directions);
  }

  static KnightMoves(board: Board, pos: Coord): Coord[] {
    const moves: Coord[] = [];
    const offsets = [
      { y: -3, x: -1 },
      { y: -3, x: 1 },
      { y: -1, x: 3 },
      { y: 1, x: 3 },
      { y: 3, x: 1 },
      { y: 3, x: -1 },
      { y: 1, x: -3 },
      { y: -1, x: -3 },
    ];
    // TODO code repeat!
    const isWhite = this.isWhite(board.state[pos.y][pos.x]);

    for (let offset of offsets) {
      const y = pos.y + offset.y;
      const x = pos.x + offset.x;
      // TODO code repeat!
      const targetSquare = board.state[y][x];
      const isTargetWhite = this.isWhite(targetSquare);

      if (this.isPiece(targetSquare) && isTargetWhite === isWhite) continue;
      moves.push({ y, x });
    }

    return moves;
  }

  static isFirstMove(isWhite: boolean, pos: Coord): boolean {
    if (isWhite && pos.y === 6) return true;
    if (!isWhite && pos.y === 1) return true;
    return false;
  }

}
