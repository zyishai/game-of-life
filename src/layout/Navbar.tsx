import React, { useContext } from 'react';
import { AppState } from '../AppState';
import { ActionButton } from './ActionButton';
import { Title } from './Title';

interface Props {
  clearBoard: () => void;
  startGame: () => void;
  endGame: () => void;
}

export const Navbar: React.FC<Props> = (props) => {
  const { playing } = useContext(AppState);
  return (
    <nav className="w-full flex justify-between items-center p-3 mb-3">
      <Title className="text-blue-500">Game of Life</Title>

      <div>
        {!playing ? (
          <>
            <ActionButton className="mr-2" onClick={props.clearBoard}>
              Clear Board
            </ActionButton>
            <ActionButton variant="primary" onClick={props.startGame}>
              Start Game
            </ActionButton>
          </>
        ) : (
          <ActionButton variant="secondary" onClick={props.endGame}>
            Stop Game
          </ActionButton>
        )}
      </div>
    </nav>
  );
};
