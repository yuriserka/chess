import type { Board } from "../Board";
import type { Move, Position } from "./Move";

export type PieceColor = "white" | "black";

export type Direction = Position & {
  condition?: (board: Board, pieceAtNewPosition: Piece | null) => boolean;
};

export type PieceType =
  | "bishop"
  | "king"
  | "knight"
  | "pawn"
  | "queen"
  | "rook";

export abstract class Piece {
  color: PieceColor;
  type: PieceType;
  position: Position;
  notation?: string;

  constructor(
    color: PieceColor,
    type: PieceType,
    position: Position,
    notation?: string
  ) {
    this.color = color;
    this.type = type;
    this.position = position;
    this.notation = notation ?? "";
  }

  protected abstract getMovesInternal(
    pieceAtNewPosition: Piece | null,
    newPosition: Position,
    moves: Move[]
  ): { shouldStop: boolean };

  protected abstract getDirections(): Direction[];

  getMoves(board: Board): Move[] {
    const directions = this.getDirections();
    const moves: Move[] = [];
    for (const direction of directions) {
      let newPosition = {
        x: this.position.x + direction.x,
        y: this.position.y + direction.y,
      };
      while (board.isValidPosition(newPosition)) {
        const piece = board.getPiece(newPosition);
        if (direction.condition && !direction.condition(board, piece)) {
          break;
        }
        const { shouldStop } = this.getMovesInternal(piece, newPosition, moves);
        if (shouldStop) {
          break;
        }
        newPosition = {
          x: newPosition.x + direction.x,
          y: newPosition.y + direction.y,
        };
      }
    }
    return moves;
  }
}
