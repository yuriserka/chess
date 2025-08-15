import type { Board } from "../Board";
import type { Move, Position } from "./Move";

export type PieceColor = "white" | "black";

export abstract class Piece {
  color: PieceColor;
  type: string;
  position: Position;

  constructor(color: PieceColor, type: string, position: Position) {
    this.color = color;
    this.type = type;
    this.position = position;
  }

  abstract getMoves(board: Board): Move[];
}
