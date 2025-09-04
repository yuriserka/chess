import { Board } from "./Board";
import type { Move, Position } from "./Pieces/Move";
import type { Piece } from "./Pieces/Piece";

type EnhancedMove = {
  capturedPiece: Piece | null;
  piece: Piece;
  move: Move;
};

type Time = {
  time: number;
  lastMoveTimestamp: number;
};

export class Instance {
  board: Board;
  turn: "white" | "black";
  gameLog: EnhancedMove[] = [];
  score: { white: Piece[]; black: Piece[] } = { white: [], black: [] };
  sequence: string[] = [];
  time: { white: Time; black: Time };
  checkMoves: Move[] = [];

  constructor(timer: number) {
    this.board = new Board();
    this.turn = "white";
    this.time = {
      white: {
        time: timer,
        lastMoveTimestamp: Date.now(),
      },
      black: {
        time: timer,
        lastMoveTimestamp: Date.now(),
      },
    };
  }

  movePiece(piece: Piece, to: Position, afterMove: () => void) {
    const move = piece
      .getMoves(this.board)
      .find((move) => move.to.x === to.x && move.to.y === to.y);

    if (move) {
      const capturedPiece = move.execute(this.board);
      this.checkMoves = [
        ...this.checkMoves,
        ...this.board.getCheckMoves(this.turn),
      ];
      if (this.checkMoves.length > 0) {
        const checkMove = this.checkMoves[0];
        if (checkMove.from.x !== to.x && checkMove.from.y !== to.y) {
          throw new Error(
            `Cannot execute move because ${this.turn} king is in check`
          );
        }
      }

      if (capturedPiece) {
        if (capturedPiece.color === "white") {
          this.score.black.push(capturedPiece);
        } else {
          this.score.white.push(capturedPiece);
        }
      }
      afterMove();
      if (this.turn === "white") {
        this.time.white.lastMoveTimestamp = Date.now();
      } else {
        this.time.black.lastMoveTimestamp = Date.now();
      }
      this.turn = this.turn === "white" ? "black" : "white";
      this.gameLog.push({
        move,
        capturedPiece,
        piece,
      });
      if (this.gameLog.length % 2 === 0 && this.gameLog.length > 1) {
        this.updateSequence();
      }
    }

    console.log({
      nextTurn: this.turn,
      score: this.score,
      gameLog: this.gameLog,
      sequence: this.sequence,
      checkMoves: this.checkMoves,
    });
  }

  private updateSequence() {
    const lastMove = this.gameLog[this.gameLog.length - 1];
    const lastLastMove = this.gameLog[this.gameLog.length - 2];
    this.sequence.push(
      `${lastLastMove.move.notation} ${lastMove.move.notation}`
    );
  }
}

export const instance = new Instance(2 * 60);
