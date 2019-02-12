import React, {Component, Fragment} from 'react'
import styled from "styled-components";
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import { areaParams } from './PlayingArea'

const Square = styled.div.attrs({
  style: ({ x, y }) => ({
    left: x, top: y
  }),
})`
  width: 18px;
  height: 18px;
  border: 1px solid #37dc65;
  background: #24252a;
  position: absolute;
  
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
      background-color: #f44336;
      transform: translate(-50%, -50%);
    }
  `: '' }
`;

export const squareSize = 20;

export const defaultSquares = () => [
  { x: 0 , y : 0, direction: 'right' },
  { x: 20, y : 0, direction: 'right' },
  { x: 40, y : 0, direction: 'right', head: true },
];

class Snake extends Component {
  constructor(props) {
    super(props);
    
    this._isMounted = false

    this.state = {
      speed: this.props.speed, // in seconds
      squares: defaultSquares(),
      keyStack: []
    };

    this.moveSnake = this.moveSnake.bind(this);
    this.directionToUp = this.directionToUp.bind(this);
    this.directionToRight = this.directionToRight.bind(this);
    this.directionToDown = this.directionToDown.bind(this);
    this.directionToLeft = this.directionToLeft.bind(this);
    this.foodEaten = this.foodEaten.bind(this);
  }

  componentDidMount() {
    this._isMounted = true
    
    // Start moving the snake
    this.setMovingInterval(this.state.speed);
    
    // Manage arrow keys gameplay, because react-key-handler does not work properly
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp' || 'Up':
          this.directionToUp()
          break;
  
        case 'ArrowRight' || 'Right':
          this.directionToRight()
          break;
  
        case 'ArrowDown' || 'Down':
          this.directionToDown()
          break;
  
        case 'ArrowLeft' || 'Left':
          this.directionToLeft()
          break;
          
        default:
          break;
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false
    clearInterval(this.movingInterval);
  }

  setMovingInterval(speed) {
    clearInterval(this.movingInterval);
    this.movingInterval = setInterval( () => this.moveSnake(), speed * 1000 );
  }

  foodEaten() {
    const { onFoodEaten } = this.props;
    let { squares } = this.state;

    // Change food position
    onFoodEaten(squares);

    // Add square to snake
    if (squares !== undefined && squares.length > 0) {
      const { x, y, direction } = squares[0];
      let newX = x;
      let newY = y;

      switch (direction) {
        case 'up':
          newY += squareSize;
          break;

        case 'right':
          newX -= squareSize;
          break;

        case 'down':
          newY -= squareSize;
          break;

        case 'left':
          newX += squareSize;
          break;

        default:
          break;
      }

      squares.unshift({ x: newX, y: newY, direction: direction });
    }
  
    this.setState({ squares: squares });
  }

  moveSnake() {
    let { squares, keyStack } = this.state;
    let { speed, foodPosition, onGameOver, isPause } = this.props;

    // Check if head has hit another square or went out of playing area
    if ( this.hasAteItself(squares) || this.isOutOfBounds(squares)) {
      onGameOver(squares);

    } else if ( ! isPause ) {
      if (this.state.speed !== speed) {
        this.setMovingInterval(this.props.speed);
      }

      squares.map( (square, index) => {
        // Move current square
        square = this.moveSquare(square);

        // Set square direction
        square = this.changeSquareDirection(squares, square, index);

        // Check if head has reached a food
        if ( square.head !== undefined && square.head && square.x === foodPosition.x && square.y === foodPosition.y ) {
          this.foodEaten();
        }

        return square;
      });
  
      this.setState({ squares: squares, keyStack: keyStack, speed: speed });
    }
  }

  moveSquare(square) {
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

    return square;
  }

  changeSquareDirection(squares, square, index) {
    const { keyStack } = this.state;

    if (square.head !== undefined && square.head && keyStack.length > 0)  {
      // do not let change direction to opposite side
      if (
        (square.direction === 'up' && keyStack[0] !== 'down') ||
        (square.direction === 'right' && keyStack[0] !== 'left') ||
        (square.direction === 'down' && keyStack[0] !== 'up') ||
        (square.direction === 'left' && keyStack[0] !== 'right'))
      {
        square.direction = keyStack[0];
      }

      // Delete most old key press
      keyStack.shift();
    } else {
      // Set normal square direction
      const hasToChangeDirection = squares[index + 1] !== undefined && squares[index + 1].direction !== square.direction;
      if (hasToChangeDirection) {
        square.direction = squares[index + 1] !== undefined ? squares[index + 1].direction : square.direction;
      }

      square.direction = squares[index + 1] !== undefined ? squares[index + 1].direction : square.direction;
    }

    return square;
  }

  isOutOfBounds(squares) {
    const head = squares.find( square => square.head === true);

    if (
      (head.x <= 0 && head.direction === 'left') ||
      (head.x >= areaParams.width - squareSize && head.direction === 'right') ||
      (head.y <= 0 && head.direction === 'up') ||
      (head.y >= areaParams.height - squareSize && head.direction === 'down')
    ) {
      return true;
    }

    return false;
  }

  hasAteItself(squares) {
    const head = squares.find( square => square.head === true);
    let coords = { x: head.x, y: head.y };
    let pass = true;

    switch (head.direction) {
      case 'up':
        coords.y -= squareSize;
        break;

      case 'right':
        coords.x += squareSize;
        break;

      case 'down':
        coords.y += squareSize;
        break;

      case 'left':
        coords.x -= squareSize;
        break;

      default:
        pass = false;
        break;
    }

    return pass ? squares.find(square => {
      return square.x === coords.x && square.y === coords.y;
    }) : undefined;
  }

  directionToUp(e) {
    if (e) {
      e.preventDefault()
    }

    this.setHeadDirection('up');
  };

  directionToRight(e) {
    if (e) {
      e.preventDefault()
    }

    this.setHeadDirection('right');
  };

  directionToDown(e) {
    if (e) {
      e.preventDefault()
    }

    this.setHeadDirection('down');
  };

  directionToLeft(e) {
    if (e) {
      e.preventDefault()
    }

    this.setHeadDirection('left');
  };
  
  setHeadDirection(direction) {
    let { squares, keyStack } = this.state;

    squares.map( square => {
      // if head and not oposite direction is clicked
      if (square.head !== undefined && square.head && keyStack[keyStack.length - 1] !== direction)
      {
        keyStack.push(direction);
      }

      return null;
    });
  
    this._isMounted && this.setState({ keyStack: keyStack });
  }

  render() {
    const { squares } = this.state;

    return (
      <Fragment>
        {/* With gaming keys */}
        <KeyHandler keyEventName={KEYPRESS} keyValue="w" onKeyHandle={this.directionToUp} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="d" onKeyHandle={this.directionToRight} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="s" onKeyHandle={this.directionToDown} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="a" onKeyHandle={this.directionToLeft} />

        {squares !== undefined && squares.length > 0 && squares.map( (square, key) => (
          <Square key={key} {...square} />
        ))}
      </Fragment>
    )
  }
}

export default Snake