import React, { useContext } from 'react';
import { AppState } from '../AppState';
import { Cell } from './Cell';

type Props = {
  className?: string;
  rows: number;
  columns: number;
  colony: ColonyUnit[];
  onCellClick?: (row: number, column: number) => void;
};

export const Board: React.FC<Props> = (props) => {
  const { playing } = useContext(AppState);

  return (
    <div
      className={`inline-grid gap-x-2 gap-y-2 cursor-pointer ${props.className}`}
      style={{
        gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
      }}
      data-testid="colony-container"
    >
      {props.colony.map((colonyUnit) => (
        <Cell
          key={`${colonyUnit.row},${colonyUnit.column}`}
          className={`${
            colonyUnit.live ? 'bg-blue-300' : playing ? '' : 'hover:bg-blue-300'
          }`}
          onClick={props.onCellClick}
          {...colonyUnit}
        />
      ))}
    </div>
  );
};
