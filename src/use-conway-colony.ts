import { useState } from 'react';
import { shouldLive } from './utils';

export const useConwayColony = (rows: number, columns: number) => {
  const [cells, setCells] = useState(
    Array.from(new Array(rows * columns), (_, id) => ({
      row: Math.floor(id / columns),
      column: id % columns,
      live: false,
    })),
  );

  function advance() {
    const nextColony = [...cells];

    for (const cell of cells) {
      nextColony[cell.row * columns + cell.column] = {
        ...cell,
        live: shouldLive(cell, cells),
      };
    }

    setCells(nextColony);
  }

  function toggleColonyUnit(row: number, column: number) {
    setCells((c) =>
      c.map((cell, id) => {
        if (id === row * columns + column) {
          return {
            ...cell,
            live: !cell.live,
          };
        }

        return cell;
      }),
    );
  }

  function resetColony() {
    setCells((c) =>
      c.map((cell) => ({
        ...cell,
        live: false,
      })),
    );
  }

  return {
    colony: cells,
    advance,
    toggleColonyUnit,
    resetColony,
  };
};
