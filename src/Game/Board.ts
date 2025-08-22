import { Bishop } from "./Pieces/Bishop";
import { King } from "./Pieces/King";
import { Knight } from "./Pieces/Knight";
import type { Position } from "./Pieces/Move";
import { Pawn } from "./Pieces/Pawn";
import type { Piece } from "./Pieces/Piece";
import { Queen } from "./Pieces/Queen";
import { Rook } from "./Pieces/Rook";

export class Board {
  pieces: (Piece | null)[][];

  constructor() {
    this.pieces = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];
    this.fillBoard();
  }

  getPiece(position: Position): Piece | null {
    this.validatePosition(position);
    return this.pieces[position.x][position.y];
  }

  setPiece(position: Position, piece: Piece) {
    this.validatePosition(position);
    piece.position = position;
    this.pieces[position.x][position.y] = piece;
  }

  removePiece(position: Position) {
    this.validatePosition(position);
    this.pieces[position.x][position.y] = null;
  }

  isValidPosition(position: Position) {
    return (
      position.x >= 0 && position.x < 8 && position.y >= 0 && position.y < 8
    );
  }

  private validatePosition(position: Position) {
    if (!this.isValidPosition(position)) {
      throw new Error("Invalid position");
    }
  }

  private fillBoard() {
    for (let i = 0; i < 8; i++) {
      const whitePawn = new Pawn("white", { x: 6, y: i });
      const blackPawn = new Pawn("black", { x: 1, y: i });

      this.setPiece(whitePawn.position, whitePawn);
      this.setPiece(blackPawn.position, blackPawn);
    }

    for (let i = 0, j = 7; ; ) {
      [
        new Rook("white", { x: 7, y: i }),
        new Rook("white", { x: 7, y: j }),
        new Rook("black", { x: 0, y: i }),
        new Rook("black", { x: 0, y: j }),
      ].forEach((rook) => this.setPiece(rook.position, rook));
      i++, j--;

      [
        new Knight("white", { x: 7, y: i }),
        new Knight("white", { x: 7, y: j }),
        new Knight("black", { x: 0, y: i }),
        new Knight("black", { x: 0, y: j }),
      ].forEach((knight) => this.setPiece(knight.position, knight));
      i++, j--;

      [
        new Bishop("white", { x: 7, y: i }),
        new Bishop("white", { x: 7, y: j }),
        new Bishop("black", { x: 0, y: i }),
        new Bishop("black", { x: 0, y: j }),
      ].forEach((bishop) => this.setPiece(bishop.position, bishop));
      i++, j--;

      [
        new Queen("white", { x: 7, y: i }),
        new Queen("black", { x: 0, y: i }),
      ].forEach((queen) => this.setPiece(queen.position, queen));
      i++, j--;

      [
        new King("white", { x: 7, y: i }),
        new King("black", { x: 0, y: i }),
      ].forEach((king) => this.setPiece(king.position, king));

      break;
    }
  }
}
