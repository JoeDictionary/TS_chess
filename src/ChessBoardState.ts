class BoardState {
  board: string[]
  activeColor: string
  castling: Object
  enPassant: string

  constructor(fen: string)
  constructor(board: string, activeColor: string, castling: string, enPassant: string) {
    if (board) {
      this.board = [board]
      this.activeColor = activeColor
      this.castling = castling
      this.enPassant = enPassant
    } else {
      console.log(board)
    }
  }
}
