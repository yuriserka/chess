import { Move, type Position } from "./Move";
import { Piece, type Direction, type PieceColor } from "./Piece";
import { Rook } from "./Rook";

export class Pawn extends Piece {
  constructor(color: PieceColor, position: Position) {
    super(color, "pawn", position);
  }

  getDirections(): Direction[] {
    const direction = this.color === "black" ? 1 : -1;

    const isInitialPosition =
      (this.position.x === 6 && this.color === "white") ||
      (this.position.x === 1 && this.color === "black");

    return [
      {
        x: direction,
        y: 0,
        condition: (_, pieceAtNewPosition) => !pieceAtNewPosition,
      }, // forward
      {
        x: 2 * direction,
        y: 0,
        condition: (board, pieceAtNewPosition) =>
          isInitialPosition &&
          !pieceAtNewPosition &&
          !board.getPiece({
            x: this.position.x + direction,
            y: this.position.y,
          }),
      }, // double forward
      {
        x: direction,
        y: 1,
        condition: (_, pieceAtNewPosition) =>
          !!pieceAtNewPosition && pieceAtNewPosition?.color !== this.color,
      }, // capture right
      {
        x: direction,
        y: -1,
        condition: (_, pieceAtNewPosition) =>
          !!pieceAtNewPosition && pieceAtNewPosition?.color !== this.color,
      }, // capture left
    ];
  }

  getMovesInternal(
    _: Piece | null,
    newPosition: Position,
    moves: Move[]
  ): { shouldStop: boolean } {
    const isFinalPosition =
      (newPosition.x === 0 && this.color === "white") ||
      (newPosition.x === 7 && this.color === "black");

    if (!isFinalPosition) {
      moves.push(new Move(this.position, newPosition));
    } else {
      moves.push(
        new Move(this.position, newPosition, (board) => {
          // TODO: handle promotion
          board.setPiece(newPosition, new Rook(this.color, newPosition));
        })
      );
    }

    return { shouldStop: true };
  }
}
