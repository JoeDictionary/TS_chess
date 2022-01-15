import { Board } from './Board';
import { Coord } from './interfaces';

const WHITE_PIECES = 'PRNBQK';
const BLACK_PIECES = 'prnbqk';
const WHITE = 'w';
const BLACK = 'b';
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
    return (WHITE_PIECES + BLACK_PIECES).includes(p);
  }

  static getColor(piece: string): string {
    if (WHITE_PIECES.includes(piece)) return WHITE;
    if (BLACK_PIECES.includes(piece)) return BLACK;
    return '';
  }

  static isInBounds(pos: Coord): boolean {
    return !(pos.x > 7 || pos.x < 0 || pos.y > 7 || pos.y < 0);
  }

  /*
  Returns straight line of moves in a given "direction" on the "board" from POV of piece on position "pos".
  If color different form the color of the piece on "pos" on the "board" should be used, set "color" accordingly.
  Used for example in move generation for Rooks or Bishops.
  */
  static lineMoves(board: Board, pos: Coord, direction: Coord, color?: string): Coord[] {
    let moves: Coord[] = [];
    if (!color) {
      color = this.getColor(board.getSq(pos));
    }

    for (
      let y = pos.y + direction.y, x = pos.x + direction.x;
      this.isInBounds({ y: y, x: x });
      y += direction.y, x += direction.x
    ) {
      const targetSquare = board.getSq({ y, x });
      const targetIsPiece = this.isPiece(targetSquare);
      const targetColor = this.getColor(targetSquare);

      if (targetIsPiece) {
        if (targetColor === color) break;
        moves.push({ y: y, x: x });
        break;
      }
      moves.push({ y: y, x: x });
    }
    return moves;
  }

  // TODO move this into "lineMoves"
  static multipleLinesMoves(
    board: Board,
    pos: Coord,
    directions: Coord[],
    color?: string
  ): Coord[] {
    let moves: Coord[] = [];

    for (let direction of directions) {
      const m = this.lineMoves(board, pos, direction, color);
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
      { y: -2, x: -1 },
      { y: -2, x: 1 },
      { y: -1, x: 2 },
      { y: 1, x: 2 },
      { y: 2, x: 1 },
      { y: 2, x: -1 },
      { y: 1, x: -2 },
      { y: -1, x: -2 },
    ];
    // TODO code repeat!
    const color = this.getColor(board.getSq(pos));

    for (let offset of offsets) {
      const target = { y: pos.y + offset.y, x: pos.x + offset.x };
      // TODO code repeat!
      const targetSquare = board.getSq(target);
      const targetColor = this.getColor(targetSquare);

      if (this.isPiece(targetSquare) && targetColor === color) continue; // TODO is 'isPiece'-check required?
      moves.push(target);
    }

    // TODO is filtering required or is it filtered by above if-statement
    return moves.filter((el) => {
      return this.isInBounds(el);
    });
  }

  static PawnMoves(board: Board, pos: Coord): Coord[] {
    const moves: Coord[] = [];
    const color = this.getColor(board.getSq(pos));
    const isFirstMove = this.isPawnFirstMove(color, pos);
    const enPass = board.enPassant;
    const offset = color === WHITE ? -1 : 1;

    // Possible moves: diag1, diag2, forward1, forward2
    // forward2 only if pawn hasn't moved AND no piece on forward1 AND no piece on forward2
    // diag1 and diag2 only if enemy pieces or enPassant square is on target square

    const forward1 = { y: pos.y + offset, x: pos.x };
    const forward2 = { y: pos.y + 2 * offset, x: pos.x };
    const diag1 = { y: pos.y + offset, x: pos.x - 1 };
    const diag2 = { y: pos.y + offset, x: pos.x + 1 };

    // Check for forward1 and forward2
    if (board.getSq(forward1) === EMPTY_SQ) {
      moves.push(forward1);
      if (isFirstMove && board.getSq(forward2) === EMPTY_SQ) moves.push(forward2);
    }

    for (let move of [diag1, diag2]) {
      const targetSq = board.getSq(move);
      if (this.isInBounds(move)) {
        if (this.isPiece(targetSq) && color !== this.getColor(targetSq)) moves.push(move);
        if (move.y === enPass.y && move.y === enPass.x) moves.push(move);
      }
    }

    return moves;
  }

  static isPawnFirstMove(color: string, pos: Coord): boolean {
    if (color === WHITE && pos.y === 6) return true;
    if (color === BLACK && pos.y === 1) return true;
    return false;
  }
}
