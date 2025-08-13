import { Board } from "../Board";
import { Move, type Position } from "./Move";
import { Piece, type PieceColor } from "./Piece";


export class Pawn extends Piece {
  constructor(color: PieceColor, position: Position) {
    super(color, "pawn", position);
  }

  getMoves(board: Board): Move[] {
    return [
      this.getForwardMove(board),
      this.getDoubleForwardMove(board),
      ...this.getCaptureMove(board),
    ].filter(move => move !== null);
  }

  private getDirection(): number {
    return this.color === "white" ? 1 : -1;
  }

  private canMoveForward(board: Board, direction: number): { canMove: boolean, newPosition: Position } {
    const forward = this.position.x + direction;
    const newPosition = { x: forward, y: this.position.y };
    return { canMove: board.getPiece(newPosition) === null, newPosition };
  }

  private getForwardMove(board: Board): Move | null {
    const direction = this.getDirection();
    const { canMove, newPosition } = this.canMoveForward(board, direction);
    if (canMove) {
      return new Move(this.position, newPosition);
    }
    return null;
  }

  private getDoubleForwardMove(board: Board): Move | null {
    if (!this.getForwardMove(board)) {
      return null;
    }

    const isWhiteInitial = this.position.x === 1 && this.color === "white";
    const isBlackInitial = this.position.x === 6 && this.color === "black";

    if (isWhiteInitial || isBlackInitial) {
      const direction = this.getDirection();
      const { canMove, newPosition } = this.canMoveForward(board, 2 * direction);
      if (canMove) {
        return new Move(this.position, newPosition);
      }
    }
    return null;
  }

  private canMoveDiagonally(board: Board, direction: number) {
    const forward = this.position.x + direction;
    const newPositionRight = { x: forward, y: this.position.y - direction };
    const newPositionLeft = { x: forward, y: this.position.y + direction };
    return {
      canMoveRight: board.getPiece(newPositionRight) !== null,
      newPositionRight: newPositionRight,
      canMoveLeft: board.getPiece(newPositionLeft) !== null,
      newPositionLeft: newPositionLeft
    };
  }

  private getCaptureMove(board: Board): Move[] {
    const direction = this.getDirection();
    const { canMoveRight, newPositionRight, canMoveLeft, newPositionLeft } = this.canMoveDiagonally(board, direction);
    let moves: Move[] = [];
    if (canMoveRight) {
      moves.push(new Move(this.position, newPositionRight));
    }
    if (canMoveLeft) {
      moves.push(new Move(this.position, newPositionLeft));
    }
    return moves;
  }
}