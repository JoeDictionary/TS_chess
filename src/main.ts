import { Coord } from './interfaces';
import { PieceMoves, EMPTY_SQ } from './PieceMoves';
import { Board } from './Board';
const TEST_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

function printBoard(board: Board | string[][]) {
  if (board instanceof Board) {
    board = board.state;
  }

  console.log('  abcdefgh\n  | | | |');

  let rankNumber = 8;
  for (let rank of board) {
    rank = rank.reduce((accum, el) => {
      if (el === EMPTY_SQ) return accum.concat(' ');
      else return accum.concat(el);
    }, [] as string[]); // Why does it this array need to be explicitly typed?

    console.log(`${(rankNumber--).toString()} ${rank.join('')}`);
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

let myBoard = new Board('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1');
let moves = PieceMoves.QueenMoves(myBoard, { x: 4, y: 4 });
// moves = PieceMoves.KnightMoves(myBoard, { y: 4, x: 4 });
// moves = PieceMoves.PawnMoves(myBoard, { y: 4, x: 4 });

markSquares(myBoard, moves);
// console.log(moves);
// console.log(myBoard.boardStateToFen());
