import { Coord } from './interfaces';
import { PieceMoves } from './PieceMoves';
import { Board } from './Board';
import { ChessGameState, START_FEN } from './ChessGameState';
const TEST_FEN = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR';

function printBoard(board: Board | string[][]) {
  if (board instanceof Board) {
    board = board.state;
  }
  for (let rank of board) {
    console.log(rank.join(''));
  }
}

function markSquares(board: Board, squares: Coord[]): void {
  /* DEBUG Highlights squares on a given board and prints the board. */
  const char = '░';
  let tempBoard = board.state.slice();

  for (let square of squares) {
    tempBoard[square.y][square.x] = char;
  }
  printBoard(tempBoard);
}

let myBoard = new Board(TEST_FEN);
let moves = PieceMoves.QueenMoves(myBoard, { x: 4, y: 4 });
moves = PieceMoves.KnightMoves(myBoard, { x: 4, y: 4 });

markSquares(myBoard, moves);

// printBoard(myBoard);
