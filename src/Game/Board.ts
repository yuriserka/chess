import type { Position } from "./Pieces/Move";
import { Pawn } from "./Pieces/Pawn";
import type { Piece } from "./Pieces/Piece";
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
      const whitePawn = new Pawn("white", { x: 1, y: i });
      const blackPawn = new Pawn("black", { x: 6, y: i });

      this.setPiece(whitePawn.position, whitePawn);
      this.setPiece(blackPawn.position, blackPawn);
    }

    for (let i = 0, j = 7; ; ) {
      [
        new Rook("white", { x: 0, y: i }),
        new Rook("white", { x: 0, y: j }),
        new Rook("black", { x: 7, y: i }),
        new Rook("black", { x: 7, y: j }),
      ].forEach((rook) => {
        this.setPiece(rook.position, rook);
      });
      i++, j--;

      break;
    }
  }
}
