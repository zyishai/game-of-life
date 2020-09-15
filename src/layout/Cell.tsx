import React from 'react';

type Props = {
  className?: string;
  row: number;
  column: number;
  onClick?: (row: number, column: number) => void;
  onHover?: (row: number, column: number) => void;
  onHoverLeave?: (row: number, column: number) => void;
};

export const Cell: React.FC<Props> = (props) => {
  const handleClick = () => {
    props.onClick && props.onClick(props.row, props.column);
  };
  const handleMouseEnter = () => {
    props.onHover && props.onHover(props.row, props.column);
  };
  const handleMouseLeave = () => {
    props.onHoverLeave && props.onHoverLeave(props.row, props.column);
  };

  return (
    <div
      className={`h-8 w-8 bg-gray-200 ${props.className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid={`cell-${props.row}-${props.column}`}
    ></div>
  );
};
