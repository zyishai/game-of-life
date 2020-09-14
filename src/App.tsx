import React from 'react';
import { Button } from './components/Button';

function App() {
  return (
    <div className="flex flex-col w-3/4 mx-auto my-12 items-center">
      <h1>Game of Life</h1>
      <Button onClick={() => console.log('I was clicked')}>
        Start the game
      </Button>
    </div>
  );
}

export default App;
