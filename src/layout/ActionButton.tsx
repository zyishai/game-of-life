import React from 'react';

interface Props {
  onClick?: () => void;
}

export const ActionButton: React.FC<Props> = (props) => {
  return (
    <button
      className="px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
