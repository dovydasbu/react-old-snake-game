import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  font-family: 'Joystix';
  margin: 0;
  padding: 0 3px;
  background-color: #37dc65b3;
`;

export const GameTitle = ({ title, ...rest }) => (
  <Title {...rest}>{title}</Title>
);

export default GameTitle