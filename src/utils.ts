export function noop(): void {}

export function shouldLive(cell: Cell, colony: Cell[]): boolean {
  const neighbors = colony.filter(
    (c) =>
      Math.max(Math.abs(cell.row - c.row), Math.abs(cell.column - c.column)) ===
      1,
  );
  const liveNeighbors = neighbors.filter((neighbor: Cell) => neighbor.live)
    .length;

  return (
    (cell.live && (liveNeighbors === 2 || liveNeighbors === 3)) ||
    (!cell.live && liveNeighbors === 3)
  );
}
