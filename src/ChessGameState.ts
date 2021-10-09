import { BoardState } from './BoardState'
export const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

export class ChessGameState {
  board: BoardState
  isWhiteActive: boolean
  castling: string
  enPassant: string

  static stateFromFen(fen: string): [BoardState, boolean, string, string] {
    // TODO CHANGE enPassant TO x,y COORDINATES
    const [boardState, activeColor, castling, enPassant, ,] = fen.split(' ')
    return [new BoardState(fen), true ? activeColor === 'w' : false, castling, enPassant]
  }

  constructor(
    boardStateOrFen: BoardState | string,
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
