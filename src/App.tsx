import React, { useEffect, useRef, useState } from 'react';
import { ActionButton } from './layout/ActionButton';
import { Cell } from './layout/Cell';
import { Title } from './layout/Title';
import { noop, shouldLive } from './utils';

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

  function toggleCell(row: number, column: number) {
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
  }

  function endGame() {
    setStarted(false);
  }

  return (
    <div className="flex flex-col items-center h-full w-full">
      <div className="w-full flex justify-between items-center p-3 mb-3">
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
      </div>

      <div
        className={`inline-grid gap-x-2 gap-y-2 ${
          !started && 'cursor-pointer'
        }`}
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}
      >
        {cells.map((cell) => (
          <Cell
            key={`${cell.row},${cell.column}`}
            onClick={!started ? toggleCell : noop}
            {...cell}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
