import { Move, type Position } from "./Move";
import type { PieceColor } from "./Piece";
import { Piece } from "./Piece";

export class Rook extends Piece {
  constructor(color: PieceColor, position: Position) {
    super(color, "rook", position, "R");
  }

  getDirections(): Position[] {
    return [
      { x: 1, y: 0 }, // down
      { x: -1, y: 0 }, // up
      { x: 0, y: 1 }, // right
      { x: 0, y: -1 }, // left
    ];
  }

  getMovesInternal(
    pieceAtNewPosition: Piece | null,
    newPosition: Position,
    moves: Move[]
  ): { shouldStop: boolean } {
    if (!pieceAtNewPosition) {
      moves.push(new Move(this.position, newPosition));
    } else {
      if (pieceAtNewPosition.color !== this.color) {
        moves.push(new Move(this.position, newPosition));
      }
      return { shouldStop: true };
    }
    return { shouldStop: false };
  }
}
