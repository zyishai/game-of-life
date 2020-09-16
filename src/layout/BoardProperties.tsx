import React, { ChangeEvent } from 'react';

interface Props {
  rows: number;
  columns: number;
  onRowsChange?: (rows: number) => void;
  onColumnsChange?: (columns: number) => void;
}

export const BoardProperties: React.FC<Props> = (props) => {
  const onChange = (changeHandler) => {
    return (event: ChangeEvent<HTMLInputElement>) =>
      changeHandler(event.target.value);
  };
  return (
    <>
      <label>
        Rows:
        <input
          type="number"
          onChange={onChange(props.onRowsChange)}
          value={props.rows}
          data-testid="rows"
        />
      </label>
      <label>
        Columns:
        <input
          type="number"
          onChange={onChange(props.onColumnsChange)}
          value={props.columns}
          data-testid="columns"
        />
      </label>
    </>
  );
};
