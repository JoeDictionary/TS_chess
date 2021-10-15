import { Board } from './Board';
import { Coord } from './interfaces';
import { Fen } from './Types';

const WHITE_PIECES = 'PRNBQK';
const BLACK_PIECES = 'prnbqk';
const ALL_PIECES = WHITE_PIECES + BLACK_PIECES;

export class PieceMoves {
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
    // const isWhite = PieceMoves.isWhite(board.state[pos.y][pos.x]);
    let moves: Coord[] = [];
    let isMovingWhite = this.isWhite(board.state[pos.y][pos.x]);

    for (
      let y = pos.y + offset.y, x = pos.x + offset.x;
      !this.isOutOfBounds({ y: y, x: x });
      y += offset.y, x += offset.x
    ) {
      // console.log(`loop    x: ${x}    y: ${y}`);
      const targetSquare = board.state[y][x];
      const isTargetPiece = this.isPiece(targetSquare);
      const isTargetWhite = this.isWhite(targetSquare);

      // Check if target square has piece and if it has a piece:
      //    if piece is ally to "movingPiece" break
      if (this.isPiece(targetSquare) && isTargetWhite === isMovingWhite) break;
      moves.push({ y: y, x: x });
      // Check if target square has a piece and if it is a piece:
      //    if piece is enemy to "movingPiece" break
      if (isTargetPiece && isTargetWhite !== isMovingWhite) break;
    }
    return moves;
  }

  static RookMoves(board: Board, pos: Coord): Coord[] {
    const offsets = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];

    let moves: Coord[] = [];

    for (let offset of offsets) {
      const a = this.offsetLineMoves(board, pos, offset);
      moves = moves.concat(a)
    }
    return moves;
  }
}
