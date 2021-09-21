import { Position } from './interfaces/Position'

const PAWN = 'P'
const ROOK = 'r'
const KNIGHT = 'n'
const BISHOP = 'b'
const QUEEN = 'q'
const KING = 'k'

const exampleFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

function boardFromFen(fen: string) {
  const [
    // prettier-ignore
    piecePlacement,
    activeColor,
    castling,
    enPassant,
    halfmoves,
    fullmoves,
  ] = fen.split(' ')

  console.log(piecePlacement.split('/'))
  console.log(activeColor)
  console.log(castling)
  console.log(enPassant)
  console.log(halfmoves)
  console.log(fullmoves)
}

boardFromFen(exampleFen)
