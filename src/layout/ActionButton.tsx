import React from 'react';

type Variant = 'primary' | 'secondary' | 'none';

interface Props {
  variant?: Variant;
  onClick?: () => void;
}

type StringOrNumber = string | number;
const variants: { [key in Variant]: Array<StringOrNumber> } = {
  primary: ['bg-blue-500', 'hover:bg-blue-600', 'text-white'],
  secondary: ['bg-red-400', 'hover:bg-red-500', 'text-white'],
  none: ['bg-gray-300', 'hover:bg-gray-400', 'text-black'],
};

export const ActionButton: React.FC<Props> = (props) => {
  const [bg, bgHover, text] = variants[props.variant || 'none'];
  const colors = `${bg} ${bgHover} ${text}`;
  return (
    <button
      className={`px-3 py-2 rounded-lg ${colors}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
