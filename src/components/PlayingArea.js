import React, { Component, Fragment } from 'react'
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import styled from 'styled-components'
import Snake, { squareSize } from './Snake'
import Button from './Button'
import Food from "./Food"

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

const GameTitle = styled.h1`
  font-family: 'Joystix';
  margin: 0;
`;

class PlayingArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      isGameOver: false,
      isFullScreen: false,
      foodPosition: { x: getRandomWidth(), y: getRandomHeight() }
    };

    this.startGame = this.startGame.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.restart = this.restart.bind(this);
    this.eatFood = this.eatFood.bind(this);
  }

  startGame() {
    this.setState({ isPlaying: true, isGameOver: false });
  }

  gameOver() {
    this.setState({ isPlaying: false, isGameOver: true });
  }

  restart() {
    this.setState({ isPlaying: true, isGameOver: false });
  }

  eatFood() {
    this.setState({ foodPosition: { x: getRandomWidth(), y: getRandomHeight()}});
  }

  render() {
    const { isPlaying, isGameOver, foodPosition } = this.state;

    return (
      <Area>
        <KeyHandler keyEventName={KEYPRESS} keyValue="Enter" onKeyHandle={this.startGame} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="Spacebar" onKeyHandle={this.startGame} />
        <KeyHandler keyEventName={KEYPRESS} keyValue=" " onKeyHandle={this.startGame} />

        {isPlaying && (
          <Fragment>
            <Food {...foodPosition} />
            <Snake onGameOver={this.gameOver} onFoodEaten={this.eatFood} foodPosition={foodPosition} />
          </Fragment>
        )}

        {isGameOver && (
          <div>
            <GameTitle>Game  over</GameTitle>
            <Button onClick={this.restart} text="restart" />
          </div>
        )}

        { ! isPlaying && ! isGameOver && (
          <div>
            <GameTitle>Snake game</GameTitle>
            <Button onClick={this.startGame} text="Play" />
          </div>
        )}
      </Area>
    )
  }
}

export default PlayingArea

function getRandomWidth() {
  return getRandomInt(1, (areaParams.width / squareSize) - 1) * 20;
}

function getRandomHeight() {
  return getRandomInt(1, (areaParams.height / squareSize) - 1) * 20;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}