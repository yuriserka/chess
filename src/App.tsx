import { useState } from "react"
import { Board } from "./Game/Board"
import type { Position } from "./Game/Pieces/Move"
import type { Piece } from "./Game/Pieces/Piece"

let board = new Board()

function App() {
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null)
  const [turn, setTurn] = useState<"white" | "black">("white")

  function movePiece(cell: Position) {
    if (selectedPiece) {
      const move = selectedPiece.getMoves(board).find(move => move.to.x === cell.x && move.to.y === cell.y);
      if (move) {
        move.execute(board)
        setSelectedPiece(null)
        setTurn(turn === "white" ? "black" : "white")
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-2xl font-bold">{turn} turn</h1>
      {

        board.pieces.map((row, i) => {
          return <div key={i} className={`flex flex-row items-center justify-center`}>
            {
              row.map(
                (cell, j) => {
                  const bgColor = (i + j) % 2 === 0 ? "bg-amber-900" : "bg-orange-300";
                  if (selectedPiece) {
                    const isMove = selectedPiece.getMoves(board).some(move => move.to.x === i && move.to.y === j);
                    if (isMove) {
                      const possibleMoveClasses = "border-green-500 border-3 cursor-pointer";
                      return (
                        <button
                          id={`${i}-${j}`}
                          key={`${i}-${j}`}
                          className={`w-14 h-14 border border-black text-${cell?.color} ${bgColor} ${possibleMoveClasses}`}
                          onClick={() => movePiece({ x: i, y: j })}
                        >
                          {cell?.type}
                        </button>
                      )
                    }
                  }
                  if (cell === null) {
                    return <div id={`${i}-${j}`} key={`${i}-${j}`} className={`w-14 h-14 border border-black ${bgColor}`} />
                  }
                  const isSelected = selectedPiece?.position.x === i && selectedPiece?.position.y === j;
                  const selectedClasses = (isSelected ? ["border-green-500", "border-3"] : []).join(" ");
                  const hoverBgColor = cell.color === "black" ? "hover:bg-amber-700" : "hover:bg-orange-400";
                  const isTurn = cell.color === turn;
                  const turnClasses = isTurn ? "cursor-pointer" : "";

                  return (
                    <button
                      disabled={!isTurn}
                      id={`${i}-${j}`}
                      key={`${i}-${j}`}
                      className={
                        `w-14 h-14 border border-black text-${cell.color} ${bgColor} ${hoverBgColor} ${selectedClasses} ${turnClasses}`
                      }
                      onClick={() => {
                        const piece = board.getPiece({ x: i, y: j });
                        if (selectedPiece === piece) {
                          setSelectedPiece(null)
                        } else {
                          setSelectedPiece(piece)
                        }
                      }}
                    >
                      {cell.type}
                    </button>
                  )
                }
              )
            }
          </div>
        })
      }
    </div>
  )
}

export default App
