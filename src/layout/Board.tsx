import React, { useContext, useState } from 'react';
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
  const [mouseDown, setMouseDown] = useState(false);
  const onBoardDragStart = () => setMouseDown(true);
  const onBoardDragEnd = () => setMouseDown(false);
  const onCellHover = mouseDown ? props.onCellClick : undefined;

  return (
    <div
      className={`inline-grid gap-x-2 gap-y-2 cursor-pointer ${props.className}`}
      style={{
        gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
      }}
      data-testid="colony-container"
      onMouseDown={onBoardDragStart}
      onMouseUp={onBoardDragEnd}
    >
      {props.colony.map((colonyUnit) => {
        const cellClassName = colonyUnit.live
          ? 'bg-blue-300'
          : playing
          ? ''
          : 'hover:bg-blue-300';
        return (
          <Cell
            key={`${colonyUnit.row},${colonyUnit.column}`}
            className={cellClassName}
            onClick={props.onCellClick}
            onHover={onCellHover}
            {...colonyUnit}
          />
        );
      })}
    </div>
  );
};
