import React, { useEffect } from 'react';
import { AppState } from './AppState';
import { Board } from './layout/Board';
import { GameControls } from './layout/GameControls';
import { Navbar } from './layout/Navbar';
import { useConwayColony } from './use-conway-colony';
import { useInterval } from './use-interval';
import { usePlayingState } from './use-playing-state';

const rows = 10;
const cols = 25;

function App() {
  const { colony, advance, toggleColonyUnit, resetColony } = useConwayColony(
    rows,
    cols,
  );
  const { playing, startPlaying, stopPlaying } = usePlayingState();
  const { start: startGameLoop, stop: stopGameLoop } = useInterval(
    advance,
    200,
    playing,
    colony,
  );

  useEffect(() => {
    if (playing) {
      startGameLoop();
    } else {
      stopGameLoop();
    }
  }, [playing]);

  function handleCellClick(row: number, column: number) {
    if (!playing) {
      toggleColonyUnit(row, column);
    }
  }

  function clearBoard() {
    resetColony();
  }

  return (
    <AppState.Provider value={{ playing }}>
      <div className="flex flex-col items-center h-full w-full">
        <Navbar />

        <Board
          rows={rows}
          columns={cols}
          colony={colony}
          onCellClick={handleCellClick}
          className="mb-4"
        />
        <GameControls
          startGame={startPlaying}
          endGame={stopPlaying}
          clearBoard={clearBoard}
          className="grid grid-flow-col gap-x-2"
        />
      </div>
    </AppState.Provider>
  );
}

export default App;
