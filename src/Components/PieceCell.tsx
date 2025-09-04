import { useEffect } from "react";
import { instance } from "../Game/Instance";
import type { Position } from "../Game/Pieces/Move";
import { Piece } from "../Game/Pieces/Piece";

type Props = {
  piece: Piece | null;
  backgroundColor: string;
  currentPosition: Position;
  isSelected: boolean;
  currentSelectedPiece: Piece | null;
  setSelectedPiece: (piece: Piece | null) => void;
};

function PieceCell({
  piece,
  backgroundColor,
  currentPosition,
  isSelected,
  currentSelectedPiece,
  setSelectedPiece,
}: Props) {
  function movePiece(position: Position) {
    if (currentSelectedPiece) {
      instance.movePiece(currentSelectedPiece, position, () => {
        setSelectedPiece(null);
      });
    }
  }

  const pieceColor = piece?.color === "white" ? "text-white" : "text-black";
  const currentSelectedPieceMoves = currentSelectedPiece?.getMoves?.(
    instance.board
  );
  const isKingInCheck = instance.checkMoves.length > 0;

  useEffect(() => {
    if (isKingInCheck) {
      setSelectedPiece(instance.board.getPiece(instance.checkMoves[0].to));
    }
  }, [isKingInCheck]);

  if (currentSelectedPiece) {
    const isMove = currentSelectedPieceMoves?.some(
      (move) =>
        move.to.x === currentPosition.x && move.to.y === currentPosition.y
    );
    if (isMove) {
      const possibleMoveClasses = "border-green-500 border-3 cursor-pointer";

      return (
        <button
          className={`w-14 h-14 border border-black ${pieceColor} ${backgroundColor} ${possibleMoveClasses}`}
          onClick={() => movePiece(currentPosition)}
        >
          {piece?.type}
        </button>
      );
    }
  }

  if (!piece) {
    return (
      <div className={`w-14 h-14 border border-black ${backgroundColor}`} />
    );
  }

  const selectedClasses = (
    isSelected ? ["border-green-500", "border-3"] : []
  ).join(" ");
  const hoverBgColor =
    piece.color === "black" ? "hover:bg-amber-700" : "hover:bg-orange-400";
  const isTurn = piece.color === instance.turn;
  const turnClasses = isTurn ? "cursor-pointer" : "";

  return (
    <button
      disabled={!isTurn}
      className={`w-14 h-14 border border-black ${pieceColor} ${backgroundColor} ${hoverBgColor} ${selectedClasses} ${turnClasses}`}
      onClick={() => {
        const piece = instance.board.getPiece(currentPosition);
        if (currentSelectedPiece === piece) {
          setSelectedPiece(null);
        } else {
          setSelectedPiece(piece);
        }
      }}
    >
      {piece.type}
    </button>
  );
}

export default PieceCell;
