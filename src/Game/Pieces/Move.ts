import type { Board } from "../Board";

export type Position = { x: number; y: number };

export class Move {
  from: Position;
  to: Position;
  postEffect?: (board: Board) => void;
  hasCapture: boolean;

  constructor(
    from: Position,
    to: Position,
    postEffect?: (board: Board) => void
  ) {
    this.from = from;
    this.to = to;
    this.postEffect = postEffect;
    this.hasCapture = false;
  }

  execute(board: Board) {
    const piece = board.getPiece(this.from);
    if (!piece) {
      throw new Error("No piece at from position");
    }
    const capturedPiece = board.getPiece(this.to);
    board.setPiece(this.to, piece);
    board.removePiece(this.from);
    this.postEffect?.(board);
    this.hasCapture = !!capturedPiece;
    return capturedPiece;
  }
}
