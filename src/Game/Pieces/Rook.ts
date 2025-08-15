import type { Board } from "../Board";
import { Move, type Position } from "./Move";
import type { PieceColor } from "./Piece";
import { Piece } from "./Piece";

export class Rook extends Piece {
  constructor(color: PieceColor, position: Position) {
    super(color, "rook", position);
  }

  getMoves(board: Board): Move[] {
    const directions = [
      { x: 1, y: 0 }, // down
      { x: -1, y: 0 }, // up
      { x: 0, y: 1 }, // right
      { x: 0, y: -1 }, // left
    ];
    const moves: Move[] = [];
    for (const direction of directions) {
      let newPosition = {
        x: this.position.x + direction.x,
        y: this.position.y + direction.y,
      };
      while (board.isValidPosition(newPosition)) {
        const piece = board.getPiece(newPosition);
        if (piece === null) {
          moves.push(new Move(this.position, newPosition));
        } else {
          if (piece.color !== this.color) {
            moves.push(new Move(this.position, newPosition));
          }
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
