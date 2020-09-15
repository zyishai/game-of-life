import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { GameState } from '../game/gameState';

interface Props {
  gameState?: GameState;
  className?: string;
  row: number;
  column: number;
  live: boolean;
  onClick?: (row: number, column: number) => void;
}

const DisplayCell: React.FC<Props> = (props) => {
  const isPending = useCallback(() => props.gameState === GameState.PENDING, [
    props.gameState,
  ]);

  const color = props.live
    ? 'bg-blue-300'
    : `bg-gray-200 ${isPending() && 'hover:bg-gray-300'}`;

  const handleClick = () => {
    props.onClick && isPending() && props.onClick(props.row, props.column);
  };

  return <div className={`h-8 w-8 ${color}`} onClick={handleClick}></div>;
};

const mapStateToProps = (state) => ({
  gameState: state.gameState,
});

export const Cell = connect(mapStateToProps, null)(DisplayCell);
