const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

export class BoardState {
  // 'fen' can be the whole fen-string or only the part describing piece-placement
  static boardStateFromFen(fen = START_FEN): string[] {
    console.log('Test')
    const [boardState, , , , ,] = fen.split(' ')

    const ranks = boardState.split('/')
    let board = []

    for (const rank of ranks) {
      let boardRank = ''
      for (const i of rank) {
        if (/[1-8]/.test(i)) {
          boardRank += [' '.repeat(parseInt(i))]
        } else {
          boardRank += i
        }
      }
      board.push(boardRank)
    }
    return board
  }

  // 'fen' can be the whole fen-string or only the board part.
  constructor(fen: string) {
    BoardState.boardStateFromFen(fen)
  }
}
