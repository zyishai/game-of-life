import React, { useContext } from 'react';
import { AppState } from '../AppState';
import { ActionButton } from './ActionButton';

type Props = {
  clearBoard: () => void;
  startGame: () => void;
  endGame: () => void;
  className?: string;
};

export const GameControls: React.FC<Props> = (props) => {
  const { playing } = useContext(AppState);

  return (
    <div className={props.className}>
      {!playing ? (
        <>
          <ActionButton onClick={props.clearBoard}>Clear Board</ActionButton>
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
  );
};
