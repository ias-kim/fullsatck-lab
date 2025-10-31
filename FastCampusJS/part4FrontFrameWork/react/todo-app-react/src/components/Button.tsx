import React from 'react';

interface Props {
  color?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

function Button(props: Props) {
  return (
    <button
      style={{
        background: '#4f90ff',
        margin: '5px',
        border: 0,
        color: props.color || '#fff',
        padding: '8px 12px',
        borderRadius: '8px',
      }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
