import { boardRemapper } from "../../Utils/board-remapper";
import type { Board } from "../Board";
import type { Piece } from "./Piece";

export type Position = { x: number; y: number };

type MoveProps = {
  from: Position;
  to: Position;
  postEffect?: (board: Board) => void;
  isCheck?: boolean;
};

export class Move {
  from: Position;
  to: Position;
  postEffect?: (board: Board) => void;
  hasCapture: boolean;
  isPromotion: boolean;
  notation?: string;
  isCheck?: boolean;

  constructor({ from, to, postEffect, isCheck }: MoveProps) {
    this.from = from;
    this.to = to;
    this.postEffect = postEffect;
    this.hasCapture = false;
    this.isPromotion = false;
    this.isCheck = isCheck;
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
    this.notation = this.getNotation(piece);
    this.isPromotion = piece.type === "pawn" && [0, 7].includes(this.to.x);
    return capturedPiece;
  }

  private getNotation(piece: Piece) {
    const fromSquare = boardRemapper(this.from);
    const toSquare = boardRemapper(this.to);
    return [
      piece.notation,
      piece.type === "pawn" && this.hasCapture ? fromSquare.split("")[0] : "",
      this.hasCapture ? "x" : "",
      toSquare,
      this.isPromotion ? "=Q" : "",
    ].join("");
  }
}
