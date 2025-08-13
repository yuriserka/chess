import type { Board } from "../Board";

export type Position = { x: number, y: number };

export class Move {
  from: Position;
  to: Position;

  constructor(from: Position, to: Position) {
    this.from = from;
    this.to = to;
  }

  execute(board: Board) {
    console.log("executing move", { from: this.from, to: this.to });
    const piece = board.getPiece(this.from);
    if (!piece) {
      throw new Error("No piece at from position");
    }
    try {
      const capturedPiece = board.getPiece(this.to);
      if (capturedPiece) {
        console.log("captured piece", capturedPiece);
        //board.incrementScore(piece.color);
      }
    } catch (e) {
      console.error(e);
    }

    board.setPiece(this.to, piece);
    board.removePiece(this.from);
  }
}
