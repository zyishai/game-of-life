import React from 'react';
import { Title } from './Title';

export const Navbar: React.FC = () => {
  return (
    <nav className="w-full flex justify-between items-center p-3 mb-3">
      <Title className="text-blue-500">Game of Life</Title>
    </nav>
  );
};
