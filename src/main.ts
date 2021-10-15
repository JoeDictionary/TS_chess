import { Coord } from './interfaces';
import { PieceMoves } from './PieceMoves';
import { Board } from './Board';
import { ChessGameState, START_FEN } from './ChessGameState';
const TEST_FEN = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR';

function printBoard(state: string[][]) {
  for (let rank of state) {
    console.log(rank.join(''));
  }
}

function markMoves(board: Board, moves: Coord[]): void {
  const char = '█';
  let tempBoard = board.state.slice();

  for (let move of moves) {
    console.log(tempBoard[move.y][move.x]);
    tempBoard[move.y][move.x] = char;
  }
  printBoard(tempBoard);
}

let myBoard = new Board(TEST_FEN);
let moves = PieceMoves.RookMoves(myBoard, { x: 4, y: 4 });

markMoves(myBoard, moves);
