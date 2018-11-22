import React from 'react'
import styled from 'styled-components'
import GameTitle from './GameTitle'
import Button from './Button'

const Message = styled.div`
  z-index: 9;
`;

export const GameMessage = ({ title, btnClick, btnText, ...rest }) => (
  <Message>
    <GameTitle title={title} />

    {btnClick && btnText && (
      <Button onClick={btnClick} text={btnText} {...rest} />
    )}
  </Message>
);

export default GameMessage