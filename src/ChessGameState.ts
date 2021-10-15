import { Fen } from './Types';
import { Board } from './Board'
export const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

export class ChessGameState {
  board: Board
  isWhiteActive: boolean
  castling: string
  enPassant: string

  static stateFromFen(fen: string): [Board, boolean, string, string] {
    // TODO CHANGE enPassant to x,y COORDINATES
    const [boardState, activeColor, castling, enPassant, ,] = fen.split(' ')
    return [new Board(fen), true ? activeColor === 'w' : false, castling, enPassant]
  }

  constructor(
    boardStateOrFen: Board | Fen,
    isWhiteActive: boolean,
    castling: string,
    enPassant: string
  ) {
    if (typeof boardStateOrFen === 'string') {
      ;[this.board, this.isWhiteActive, this.castling, this.enPassant] =
        ChessGameState.stateFromFen(boardStateOrFen)
    } else {
      this.board = boardStateOrFen
      this.isWhiteActive = isWhiteActive
      this.castling = castling
      this.enPassant = enPassant
    }
  }
}
