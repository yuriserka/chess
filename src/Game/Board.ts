import type { Position } from "./Pieces/Move";
import { Pawn } from "./Pieces/Pawn";
import type { Piece } from "./Pieces/Piece";

export class Board {
  pieces: (Piece | null)[][];

  constructor() {
    this.pieces = this.getInitialBoard();
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

  private validatePosition(position: Position) {
    if (position.x < 0 || position.x >= 8 || position.y < 0 || position.y >= 8) {
      throw new Error("Invalid position");
    }
  }

  private getInitialBoard() {
    const clearBoard = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];
    this.pieces = clearBoard;

    for (let i = 0; i < 8; i++) {
      const whitePawn = new Pawn("white", { x: 1, y: i });
      const blackPawn = new Pawn("black", { x: 6, y: i });

      this.setPiece(whitePawn.position, whitePawn);
      this.setPiece(blackPawn.position, blackPawn);
    }

    return clearBoard;
  }
}