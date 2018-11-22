import React, { Component, Fragment } from 'react'
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import styled from 'styled-components'
import Snake, { defaultSquares } from './Snake'
import Food from "./Food"
import GameMessage from './GameMessage'
import { getRandomWidth, getRandomHeight } from '../Random'

export const areaParams = {
  width: 800,
  height: 500
};

const Area = styled.div`
  border: 6px solid #24252a;
  width: ${areaParams.width}px;
  height: ${areaParams.height}px;
  position: relative;
  box-shadow: 0 11px 70px rgba(0,0,0,0.515);
  margin: 0 auto;
  
  ${ props => ! props.isPlaying ? `
    display: flex;
    justify-content: center;
    align-items: center;
  `: ''}
`;

class PlayingArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      isGameOver: false,
      isFullScreen: false,
      foodPosition: this.getFoodCoords(defaultSquares())
    };

    this.startGame = this.startGame.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.eatFood = this.eatFood.bind(this);
  }

  startGame() {
    this.setState({ isPlaying: true, isGameOver: false });
  }

  gameOver(squares) {
    const coords = this.getFoodCoords(squares);

    this.setState( previousState => {
      return {
        isPlaying: false,
        isGameOver: true,
        foodPosition: squares !== undefined ? coords : previousState.foodPosition
      }
    });
  }

  eatFood(squares) {
    const coords = this.getFoodCoords(squares);

    this.setState({ foodPosition: Object.assign({}, coords) });
  }

  getFoodCoords(squares) {
    let resp = true;
    let coords = { x: 0, y: 0 };

    do {
      coords = { x: getRandomWidth(), y: getRandomHeight() };

      resp = this.getSquareByCoords(squares, coords);
    } while (resp !== undefined);

    return coords;
  }

  getSquareByCoords(squares, coords) {
    return squares.find(square => {
      return square.x === coords.x && square.y === coords.y;
    });
  }

  render() {
    const { isPlaying, isGameOver, isPause, foodPosition } = this.state;

    return (
      <Area>
        <KeyHandler keyEventName={KEYPRESS} keyValue="Enter" onKeyHandle={this.startGame} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="Spacebar" onKeyHandle={this.startGame} />
        <KeyHandler keyEventName={KEYPRESS} keyValue=" " onKeyHandle={this.startGame} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="p" onKeyHandle={this.pauseGame} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="P" onKeyHandle={this.pauseGame} />

        {isPlaying && (
          <Fragment>
            {isPause && (
              <GameMessage title="pause" btnClick={this.pauseGame} btnText="resume" />
            )}

            <Food {...foodPosition} />
            <Snake isPause={isPause} onGameOver={this.gameOver} onFoodEaten={this.eatFood} foodPosition={foodPosition} />
          </Fragment>
        )}

        {isGameOver && (
          <GameMessage title="Game over" btnClick={this.startGame} btnText="restart" />
        )}

        { ! isPlaying && ! isGameOver && (
          <GameMessage title="Snake game" btnClick={this.startGame} btnText="play" />
        )}
      </Area>
    )
  }
}

export default PlayingArea