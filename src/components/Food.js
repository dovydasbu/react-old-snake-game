import React, { Component } from 'react'
import styled from 'styled-components'
import { squareSize } from './Snake'

const FoodItem = styled.div.attrs({
  style: ({ x, y }) => ({
    left: x, top: y
  }),
})`
  width: ${squareSize - 4}px;
  height: ${squareSize - 4}px;
  background: #f44336;
  position: absolute;
  border-radius: 180px;
`;

class Food extends Component {
  render() {
    const { x, y } = this.props;

    return (
      <FoodItem x={x + 2} y={y + 2} />
    )
  }
}

export default Food