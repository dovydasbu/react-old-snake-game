import React from 'react'
import styled from 'styled-components'

const Btn = styled.button`
  font-family: 'Joystix';
  font-size: 16px;
  border: 3px solid #24252a;
  max-width: auto;
  padding: 7px 13px;
  display: table;
  margin: 20px auto 0;
  border-radius: 5px;
  background: #37dc65;
  cursor: pointer;
  color: #24252a;
  
  @media (hover: none and min-width 1600px) {
    &:hover {
      color: #37dc65;
      background: #24252a;
    }
  }
`;

const Button = ({ text, children, ...props }) => (
  <Btn {...props}>{text || children}</Btn>
);

export default Button