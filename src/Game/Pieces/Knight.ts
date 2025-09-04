import { Move, type Position } from "./Move";
import { Piece, type PieceColor } from "./Piece";

export class Knight extends Piece {
  constructor(color: PieceColor, position: Position) {
    super(color, "knight", position, "N");
  }

  getDirections(): Position[] {
    return [
      { x: 1, y: 2 }, // down-right
      { x: 1, y: -2 }, // down-left
      { x: -1, y: 2 }, // up-right
      { x: -1, y: -2 }, // up-left
      { x: 2, y: 1 }, // right-down
      { x: 2, y: -1 }, // right-up
      { x: -2, y: 1 }, // left-down
      { x: -2, y: -1 }, // left-up
    ];
  }

  getMovesInternal(
    pieceAtNewPosition: Piece | null,
    newPosition: Position,
    moves: Move[]
  ): { shouldStop: boolean } {
    if (!pieceAtNewPosition || pieceAtNewPosition.color !== this.color) {
      moves.push(new Move({ from: this.position, to: newPosition }));
    }
    return { shouldStop: true };
  }
}
