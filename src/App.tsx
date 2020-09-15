import React, { useEffect, useRef, useState } from 'react';
import { AppState } from './AppState';
import { ActionButton } from './layout/ActionButton';
import { Board } from './layout/Board';
import { Title } from './layout/Title';
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
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (started) {
      intervalRef.current = setTimeout(advance, 500);
    } else {
      clearTimeout(intervalRef.current as any);
    }
  }, [started, cells]);

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

  function startGame() {
    advance();
    setStarted(true);
    setPlaying(true);
  }

  function endGame() {
    setStarted(false);
    setPlaying(false);
  }

  return (
    <AppState.Provider value={{ playing }}>
      <div className="flex flex-col items-center h-full w-full">
        <nav className="w-full flex justify-between items-center p-3 mb-3">
          <Title className="text-blue-500">Game of Life</Title>

          <div>
            {!started ? (
              <>
                <ActionButton onClick={clearBoard}>Clear Board</ActionButton>
                <ActionButton variant="primary" onClick={startGame}>
                  Start Game
                </ActionButton>
              </>
            ) : (
              <ActionButton variant="secondary" onClick={endGame}>
                Stop Game
              </ActionButton>
            )}
          </div>
        </nav>

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
