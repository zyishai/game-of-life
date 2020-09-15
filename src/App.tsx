import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Title } from './layout/Title';
import { noop, shouldLive } from './utils';

const Cell: React.FC<CellProps> = (props) => {
  const isPending = useMemo(() => !props.gameStarted, [props.gameStarted]);

  const color = props.live
    ? 'bg-blue-300'
    : `bg-gray-200 ${isPending && 'hover:bg-gray-300'}`;

  const handleClick = () => {
    props.onClick && isPending && props.onClick(props.row, props.column);
  };

  return <div className={`h-8 w-8 ${color}`} onClick={handleClick}></div>;
};

function App(): any {
  const width = 10;
  const height = 10;
  const [cells, setCells] = useState(
    Array.from(new Array(width * height), (_, id) => ({
      row: Math.floor(id / width),
      column: id % width,
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
      nextColony[cell.row * width + cell.column] = {
        ...cell,
        live: shouldLive(cell, cells),
      };
    }

    setCells(nextColony);
  }

  function toggleCell(row: number, column: number) {
    setCells((c) =>
      c.map((cell, id) => {
        if (id === row * width + column) {
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
              <button
                className="px-3 py-2 mr-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-900"
                onClick={clearBoard}
              >
                Clear Board
              </button>
              <button
                className="px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                onClick={startGame}
              >
                Start Game
              </button>
            </>
          ) : (
            <button
              className="px-3 py-2 rounded-lg bg-red-400 hover:bg-red-500 text-white"
              onClick={endGame}
            >
              Stop Game
            </button>
          )}
        </div>
      </div>

      <div
        className={`inline-grid grid-cols-10 gap-x-2 gap-y-2 ${
          !started && 'cursor-pointer'
        }`}
      >
        {cells.map((cell) => (
          <Cell
            key={`${cell.row},${cell.column}`}
            onClick={!started ? toggleCell : noop}
            gameStarted={started}
            {...cell}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
