import type { Position } from "../Game/Pieces/Move";

const xRemap: Record<number, string> = {
  0: "a",
  1: "b",
  2: "c",
  3: "d",
  4: "e",
  5: "f",
  6: "g",
  7: "h",
};

const yRemap = (y: number) => 8 - y;

export function boardRemapper(position: Position): string {
  return `${xRemap[position.y]}${yRemap(position.x)}`;
}
