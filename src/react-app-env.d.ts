/// <reference types="react-scripts" />

interface CellProps {
  className?: string;
  row: number;
  column: number;
  live: boolean;
  gameStarted: boolean;
  onClick?: (row: number, column: number) => void;
}

interface Cell {
  row: number;
  column: number;
  live: boolean;
}
