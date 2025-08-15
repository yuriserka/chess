import { Board } from "./Board";
import type { Move, Position } from "./Pieces/Move";
import type { Piece } from "./Pieces/Piece";

type EnhancedMove = {
  capturedPiece: Piece | null;
  piece: Piece;
  move: Move;
};

export class Instance {
  board: Board;
  turn: "white" | "black";
  gameLog: EnhancedMove[] = [];
  score: { white: Piece[]; black: Piece[] } = { white: [], black: [] };

  constructor() {
    this.board = new Board();
    this.turn = "white";
  }

  movePiece(piece: Piece, to: Position, afterMove: () => void) {
    const move = piece
      .getMoves(this.board)
      .find((move) => move.to.x === to.x && move.to.y === to.y);

    if (move) {
      const capturedPiece = move.execute(this.board);
      if (capturedPiece) {
        if (capturedPiece.color === "white") {
          this.score.black.push(capturedPiece);
        } else {
          this.score.white.push(capturedPiece);
        }
      }
      afterMove();
      this.turn = this.turn === "white" ? "black" : "white";
      this.gameLog.push({
        move,
        capturedPiece,
        piece,
      });
    }

    console.log({
      nextTurn: this.turn,
      score: this.score,
      gameLog: this.gameLog,
    });
  }
}

export const instance = new Instance();
