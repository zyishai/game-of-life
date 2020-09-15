import React from 'react';

interface Props {
  className?: string;
  children: any;
}

export const Title: React.FC<Props> = ({ children, className }) => {
  return (
    <h1 className={`text-2xl font-bold tracking-wide ${className}`}>
      {children}
    </h1>
  );
};
