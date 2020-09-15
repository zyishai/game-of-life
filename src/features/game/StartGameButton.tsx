import React from 'react';
import { connect } from 'react-redux';
import { ActionButton } from '../../layout/ActionButton';
import { startGame } from './gameStateSlice';

const Button = ({ startGame }) => {
  return <ActionButton onClick={startGame}>Start Game</ActionButton>;
};

const mapDispatchToProps = { startGame };

export const StartGameButton = connect(null, mapDispatchToProps)(Button);
