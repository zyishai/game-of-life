import React, { useState } from 'react';

interface ColonyCell {
  row: number;
  column: number;
  live: boolean;
}

type Props = {
  /** width of board in cells */
  width: number;
  /** height of board in cells */
  height: number;
  /** render function. takes `cells` array and `toggleCell` method */
  children: (
    cells: Array<ColonyCell>,
    toggleCell: (row: number, column: number) => void,
  ) => any;
};

export const ColonyManager: React.FC<Props> = (props) => {
  const [cells, setCells] = useState<Array<ColonyCell>>(
    Array.from(new Array(props.width * props.height), (_, id) => ({
      row: Math.floor(id / props.width),
      column: id % props.width,
      live: false,
    })),
  );
  const toggleCell = (row: number, column: number) => {
    setCells((c) =>
      c.map((cell, id) => {
        if (id === row * props.width + column) {
          return {
            ...cell,
            live: !cell.live,
          };
        }

        return cell;
      }),
    );
  };

  return props.children(cells, toggleCell);
};
