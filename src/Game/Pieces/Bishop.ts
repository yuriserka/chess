import { Move, type Position } from "./Move";
import { Piece, type PieceColor } from "./Piece";

export class Bishop extends Piece {
  constructor(color: PieceColor, position: Position) {
    super(color, "bishop", position, "B");
  }

  getDirections(): Position[] {
    return [
      { x: 1, y: 1 }, // down-right
      { x: 1, y: -1 }, // down-left
      { x: -1, y: 1 }, // up-right
      { x: -1, y: -1 }, // up-left
    ];
  }

  getMovesInternal(
    pieceAtNewPosition: Piece | null,
    newPosition: Position,
    moves: Move[]
  ): { shouldStop: boolean } {
    if (!pieceAtNewPosition) {
      moves.push(new Move({ from: this.position, to: newPosition }));
    } else {
      if (pieceAtNewPosition.color !== this.color) {
        moves.push(new Move({ from: this.position, to: newPosition }));
      }
      return { shouldStop: true };
    }
    return { shouldStop: false };
  }
}
