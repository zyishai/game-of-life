import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BoardProperties } from './BoardProperties';

test('Set properties properly and update when props updated', () => {
  const comp = render(<BoardProperties rows={2} columns={3} />);

  expect(comp.getByTestId('rows')).toHaveValue(2);
  expect(comp.getByTestId('columns')).toHaveValue(3);

  comp.rerender(<BoardProperties rows={3} columns={1} />);

  expect(comp.getByTestId('rows')).toHaveValue(3);
  expect(comp.getByTestId('columns')).toHaveValue(1);
});

test('Change to component input trigger an appropriate change handler at the parent', () => {
  const rowChangeHandler = jest.fn();
  const comp = render(
    <BoardProperties rows={2} columns={3} onRowsChange={rowChangeHandler} />,
  );
  const rowsInput = comp.getByTestId('rows');

  userEvent.type(rowsInput, '5');

  expect(rowChangeHandler).toBeCalledTimes(1);
  expect(rowChangeHandler).toBeCalledWith('25');
});
