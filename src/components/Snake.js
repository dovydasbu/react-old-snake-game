import React, {Component, Fragment} from 'react'
import styled from "styled-components";
import KeyHandler, { KEYPRESS } from 'react-key-handler';
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

const squareSize = 20;

class Snake extends Component {
  constructor(props) {
    super(props);

    this.state = {
      speed: 0.2, // in seconds
      squares: [
        { x: 0 , y : 0, direction: 'right' },
        { x: 20, y : 0, direction: 'right' },
        { x: 40, y : 0, direction: 'right', head: true },
      ]
    };

    this.moveSnake = this.moveSnake.bind(this);
    this.directionToUp = this.directionToUp.bind(this);
    this.directionToRight = this.directionToRight.bind(this);
    this.directionToDown = this.directionToDown.bind(this);
    this.directionToLeft = this.directionToLeft.bind(this);
  }

  componentDidMount() {
    this.movingInterval = setInterval(() => this.moveSnake(), this.state.speed * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.movingInterval);
  }

  moveSnake() {
    let { squares } = this.state;

    squares.map( (square, index) => {
      switch (square.direction) {
        case 'up':
          square.y -= squareSize;
          break;

        case 'right':
          square.x += squareSize;
          break;

        case 'down':
          square.y += squareSize;
          break;

        case 'left':
          square.x -= squareSize;
          break;

        default:
          return null;
      }

      const hasToChangeDirection = squares[index + 1] !== undefined && squares[index + 1].direction !== square.direction;
      if (hasToChangeDirection) {
        square.direction = squares[index + 1] !== undefined ? squares[index + 1].direction : square.direction;
      }

      square.direction = squares[index + 1] !== undefined ? squares[index + 1].direction : square.direction;

      return null;
    });

    this.isOutOfBounds().then(resp => {
      resp ? this.setState({ squares: squares }) : this.props.onGameOver();
    });
  }

  async isOutOfBounds() {
    let { squares } = this.state;

    const head = squares.find( square => square.head === true);
    if (
      (head.x === squareSize * -1 && head.direction === 'left') ||
      (head.x >= areaParams.width && head.direction === 'right') ||
      (head.y === squareSize * -1 && head.direction === 'up') ||
      (head.y >= areaParams.height && head.direction === 'down')
    ) {
      return false;
    }

    return true;
  }

  directionToUp(e) {
    e.preventDefault();
    this.setHeadDirection('up');
  };

  directionToRight(e) {
    e.preventDefault();
    this.setHeadDirection('right');
  };

  directionToDown(e) {
    e.preventDefault();
    this.setHeadDirection('down');
  };

  directionToLeft(e) {
    e.preventDefault();
    this.setHeadDirection('left');
  };
  
  setHeadDirection(direction) {
    let squares = this.state.squares;

    squares.map( square => {
      if (square.head !== undefined && square.head) {
        square.direction = direction;
      }
    });

    this.setState({ squares: squares });
  }

  render() {
    const { squares } = this.state;

    return (
      <Fragment>
        <KeyHandler keyEventName={KEYPRESS} keyValue="ArrowUp" onKeyHandle={this.directionToUp} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="ArrowRight" onKeyHandle={this.directionToRight} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="ArrowDown" onKeyHandle={this.directionToDown} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="ArrowLeft" onKeyHandle={this.directionToLeft} />

        {squares !== undefined && squares.length > 0 && squares.map( (square, key) => (
          <Square key={key} {...square} />
        ))}
      </Fragment>
    )
  }
}

export default Snake