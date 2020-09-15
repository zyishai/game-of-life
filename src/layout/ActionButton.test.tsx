import { render } from '@testing-library/react';
import React from 'react';
import { ActionButton } from './ActionButton';

test('regular button colors', () => {
  const { getByText } = render(<ActionButton>test</ActionButton>);

  const button = getByText('test');
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass('bg-gray-300');
});

test('primary button colors', () => {
  const { getByText } = render(
    <ActionButton variant="primary">test</ActionButton>,
  );

  const button = getByText('test');
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass('bg-blue-500');
});

test('secondary button colors', () => {
  const { getByText } = render(
    <ActionButton variant="secondary">test</ActionButton>,
  );

  const button = getByText('test');
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass('bg-red-400');
});
