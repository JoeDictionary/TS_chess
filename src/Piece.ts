import { SquarePosition } from './interfaces/Position'

abstract class Piece {
  constructor() {
    
  }
}

export const pieces = {
  PAWN: 'p',
  ROOK: 'r',
  KNIGHT: 'n',
  BISHOP: 'b',
  QUEEN: 'q',
  KING: 'k',
}
