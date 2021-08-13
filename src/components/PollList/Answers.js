import React from 'react';
import styled from 'styled-components';

const Answer = styled.div.attrs({
  className: 'px-3 py-1 inline-block cursor-pointer border',
})`
  border-color: ${(props) => (props.active ? 'black' : 'transparent')};
`;

export default function Answers({ options, onClick, selected }) {
  return (
    <div className="p-4">
      {options.map((option) => {
        return (
          <div className="mb-2" key={option.id}>
            <Answer
              active={selected.includes(option.id)}
              style={{ background: option.color }}
              onClick={() => {
                onClick(option.id);
              }}
            >
              {option.title}
            </Answer>
          </div>
        );
      })}
    </div>
  );
}
