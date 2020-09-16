import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Board } from './Board';

const boardWidth = 4;
const boardHeight = 2;
const colony: ColonyUnit[] = Array.from(new Array(8), (_, id) => ({
  row: Math.floor(id / boardWidth),
  column: id % boardWidth,
  live: false,
}));

test('Board render cells correctly', () => {
  const board = render(
    <Board rows={boardHeight} columns={boardWidth} colony={colony} />,
  );
  const colonyContainer = board.getByTestId('colony-container');

  expect(colonyContainer.children.length).toBe(8);
});

test('Board handle cell clicks properly', () => {
  const onCellClick = jest.fn();
  const board = render(
    <Board
      rows={boardHeight}
      columns={boardWidth}
      colony={colony}
      onCellClick={onCellClick}
    />,
  );
  const colonyContainer = board.getByTestId('colony-container');

  userEvent.click(colonyContainer.children[0]);

  expect(onCellClick).toBeCalledTimes(1);
  expect(onCellClick).toBeCalledWith(0, 0);
});

// TODO: MISSING TESTS FOR DRAG N DROP FUNCTIONALITY
