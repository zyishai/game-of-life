import React from 'react';

interface Props {
  className?: string;
}

export const GameBoard: React.FC<Props> = (props) => {
  return (
    <div className="inline-grid grid-cols-10 gap-x-2 gap-y-2 cursor-pointer">
      {props.children}
    </div>
  );
};
