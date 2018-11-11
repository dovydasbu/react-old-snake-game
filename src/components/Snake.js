import React, {Component, Fragment} from 'react'
import styled from "styled-components";
import { areaParams } from './PlayingArea'

const Square = styled.div`
  width: 18px;
  height: 18px;
  border: 1px solid #00e640;
  background: #24252a;
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  
  ${props => props.head ? `
    &::before {
      content: '';
      display: block;
      width: 5px;
      height: 5px;
      position: absolute;
      border-radius: 180px;
      left: 50%;
      top: 50%;
      background-color: red;
      transform: translate(-50%, -50%);
    }
  `: '' }
`;

const squareWidth = 20;

export default class Snake extends Component {
  constructor(props) {
    super(props);

    this.state = {
      speed: 0.8, // in seconds
      direction: 'right',
      squares: [
        { x: 0 , y : 0 },
        { x: 20, y : 0 },
        { x: 40, y : 0, head: true },
      ]
    };

    this.moveSnake = this.moveSnake.bind(this);
  }

  componentDidMount() {
    this.movingInterval = setInterval(() => this.moveSnake(), this.state.speed * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.movingInterval);
  }

  moveSnake() {
    let { squares, direction } = this.state;

    squares.map( square => {
      switch (direction) {
        case 'right':
          square.x += squareWidth;
          break;

        default:
          return null;
      }

      return null;
    });

    this.isOutOfBounds().then(resp => {
      resp ? this.setState({ squares: squares }) : this.props.onGameOver();
    });
  }

  async isOutOfBounds() {
    let { squares, direction } = this.state;

    const head = squares.find( square => square.head === true);
    if (
      (head.x <= 0 && direction === 'left') ||
      (head.x >= areaParams.width && direction === 'right') ||
      (head.y <= 0 && direction === 'up') ||
      (head.y >= areaParams.height && direction === 'bottom')
    ) {
      return false;
    }

    return true;
  }

  render() {
    const { squares } = this.state;

    return (
      <Fragment>
        {squares !== undefined && squares.length > 0 && squares.map( (square, index) => (
          <Square key={index} {...square} />
        ))}
      </Fragment>
    )
  }
}