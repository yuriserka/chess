import { Move, type Position } from "./Move";
import { Piece, type PieceColor } from "./Piece";

export class King extends Piece {
  constructor(color: PieceColor, position: Position) {
    super(color, "king", position, "K");
  }

  getDirections(): Position[] {
    return [
      { x: 1, y: 1 }, // down-right
      { x: 1, y: -1 }, // down-left
      { x: -1, y: 1 }, // up-right
      { x: -1, y: -1 }, // up-left
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
    if (!pieceAtNewPosition || pieceAtNewPosition.color !== this.color) {
      moves.push(new Move(this.position, newPosition));
    }
    return { shouldStop: true };
  }
}
