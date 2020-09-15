import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Cell } from './Cell';

test('Cell default color and overriding default color', () => {
  const dullCell = render(<Cell row={1} column={1} />);
  const colorfulCell = render(
    <Cell row={1} column={2} className="bg-red-300" />,
  );

  expect(dullCell.getByTestId('cell-1-1')).toHaveClass('bg-gray-200');
  expect(dullCell.getByTestId('cell-1-1')).not.toHaveClass('bg-red-300');
  expect(colorfulCell.getByTestId('cell-1-2')).toHaveClass('bg-red-300');
});

test('Clicking of Cell component', () => {
  const onClick = jest.fn();
  const cell = render(<Cell row={1} column={1} onClick={onClick} />);

  userEvent.click(cell.getByTestId('cell-1-1'));
  expect(onClick).toHaveBeenCalledTimes(1);
  expect(onClick).toBeCalledWith(1, 1);
});

test('Hoverring over Cell component', () => {
  const onHover = jest.fn();
  const cell = render(<Cell row={1} column={1} onHover={onHover} />);

  userEvent.hover(cell.getByTestId('cell-1-1'));
  expect(onHover).toHaveBeenCalledTimes(1);
  expect(onHover).toBeCalledWith(1, 1);
});
