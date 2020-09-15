import React, { useEffect, useRef, useState } from 'react';
import { AppState } from './AppState';
import { Board } from './layout/Board';
import { Navbar } from './layout/Navbar';
import { usePlayingState } from './use-playing-state';
import { shouldLive } from './utils';

function App(): any {
  const rows = 10;
  const cols = 25;
  const [cells, setCells] = useState(
    Array.from(new Array(rows * cols), (_, id) => ({
      row: Math.floor(id / cols),
      column: id % cols,
      live: false,
    })),
  );
  const { playing, startPlaying, stopPlaying } = usePlayingState();
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setTimeout(advance, 500);
    } else {
      clearTimeout(intervalRef.current as any);
    }
  }, [playing, cells]);

  function advance() {
    const nextColony = [...cells];

    for (const cell of cells) {
      nextColony[cell.row * cols + cell.column] = {
        ...cell,
        live: shouldLive(cell, cells),
      };
    }

    setCells(nextColony);
  }

  function handleCellClick(row: number, column: number) {
    if (!playing) {
      setCells((c) =>
        c.map((cell, id) => {
          if (id === row * cols + column) {
            return {
              ...cell,
              live: !cell.live,
            };
          }

          return cell;
        }),
      );
    }
  }

  function clearBoard() {
    setCells((c) =>
      c.map((cell) => ({
        ...cell,
        live: false,
      })),
    );
  }

  return (
    <AppState.Provider value={{ playing }}>
      <div className="flex flex-col items-center h-full w-full">
        <Navbar
          startGame={startPlaying}
          endGame={stopPlaying}
          clearBoard={clearBoard}
        />

        <Board
          rows={rows}
          columns={cols}
          colony={cells}
          onCellClick={handleCellClick}
        />
      </div>
    </AppState.Provider>
  );
}

export default App;
