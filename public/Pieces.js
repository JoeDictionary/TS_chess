"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testPosition;
var PAWN = 'P';
var ROOK = 'r';
var KNIGHT = 'n';
var BISHOP = 'b';
var QUEEN = 'q';
var KING = 'k';
var exampleFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
function boardFromFen(fen) {
    var _a = fen.split(' '), 
    // prettier-ignore
    piecePlacement = _a[0], activeColor = _a[1], castling = _a[2], enPassant = _a[3], halfmoves = _a[4], fullmoves = _a[5];
    console.log(piecePlacement);
    console.log(activeColor);
    console.log(castling);
    console.log(enPassant);
    console.log(halfmoves);
    console.log(fullmoves);
}
boardFromFen(exampleFen);
