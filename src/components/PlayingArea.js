import React, { Component, Fragment } from 'react'
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import styled from 'styled-components'

import { getRandomWidth, getRandomHeight } from '../Random'
import Snake, { defaultSquares } from './Snake'
import Food from './Food'
import Scores from './Scores'
import GameMessage from './GameMessage'

export const areaParams = {
  width: 800,
  height: 500
};

const Area = styled.div`
  background: #37dc65;
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

// Time left before speed increase
export const defaultTimeLeft = 15;
export const defaultSnakeSpeed = 0.17;

class PlayingArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHamburgerActive: false,
      snakeSpeed: defaultSnakeSpeed,
      timeLeft: defaultTimeLeft, // Time left before speed increase
      score: 0,
      hasReachedMaxSpeed: false,
      isPlaying: false,
      isGameOver: false,
      isFullScreen: false,
      isPause: false,
      isTimeBlinking: false,
      isScoreBlinking: false,
      foodPosition: this.getFoodCoords(defaultSquares())
    };

    this.startGame = this.startGame.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.updateTimeLeft = this.updateTimeLeft.bind(this);
    this.eatFood = this.eatFood.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.timeLeftInterval);
  }

  startGame() {
    clearInterval(this.timeLeftInterval);
    this.initTimeInterval();

    this.setState({
      score: 0,
      timeLeft: defaultTimeLeft,
      snakeSpeed: defaultSnakeSpeed,
      isPlaying: true,
      isGameOver: false,
      isPause: false
    });
  }

  pauseGame() {
    this.setState( prev => ({
        isPause: prev.isPlaying && ! prev.isGameOver ? ! prev.isPause : prev.isPause
    }));
  }

  gameOver(squares) {
    clearInterval(this.timeLeftInterval);

    const coords = this.getFoodCoords(squares);

    this.setState( prev => ({
      isPlaying: false,
      isGameOver: true,
      isPause: false,
      foodPosition: squares !== undefined ? coords : prev.foodPosition
    }));
  }

  initTimeInterval() {
    this.timeLeftInterval = setInterval( () => this.updateTimeLeft(), 1000 );
  }

  updateTimeLeft() {
    let { timeLeft, hasReachedMaxSpeed } = this.state;

    if (timeLeft === 0 && ! hasReachedMaxSpeed) {
      // Update time and increase speed
      this.setState({ isTimeBlinking: true });

      clearInterval(this.timeLeftInterval);
      if ( ! hasReachedMaxSpeed) {
        setTimeout(() => {
          let snakeSpeed = this.state.snakeSpeed;
          let timeLeft = defaultTimeLeft;

          if (snakeSpeed >= 0.12) {
            snakeSpeed -= 0.03
          } else if ( snakeSpeed >= 0.06 ) {
            snakeSpeed -= 0.01
          } else {
            hasReachedMaxSpeed = true;
            timeLeft = -1;
          }

          this.setState({
            timeLeft: timeLeft,
            hasReachedMaxSpeed: hasReachedMaxSpeed,
            isTimeBlinking: false,
            snakeSpeed: snakeSpeed
          });
          this.initTimeInterval();
        }, 1000)
      }

    } else if ( ! hasReachedMaxSpeed) {
      this.setState({ timeLeft: timeLeft - 1 });
    }
  }

  eatFood(squares) {
    const coords = this.getFoodCoords(squares);

    this.setState(previous => ({ foodPosition: Object.assign({}, coords), score: previous.score + 5 }));
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

  getTimeLeft() {
    const seconds = this.state.timeLeft;

    // Return parsed eternity sign
    if ( seconds === -1 ) {
      return ( new DOMParser()).parseFromString(`<!doctype html><body>&#8734;`, 'text/html').body.textContent;
    }

    return `${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  render() {
    const { score, snakeSpeed, isPlaying, isGameOver, isPause, isTimeBlinking, isScoreBlinking, foodPosition } = this.state;

    return (
      <Fragment>
        <Scores score={score} timeLeft={this.getTimeLeft()} isTimeBlinking={isTimeBlinking} isScoreBlinking={isScoreBlinking} />

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
              <Snake speed={snakeSpeed} isPause={isPause} onGameOver={this.gameOver} onFoodEaten={this.eatFood} foodPosition={foodPosition} />
            </Fragment>
          )}

          {isGameOver && (
            <GameMessage title="Game over" btnClick={this.startGame} btnText="restart" />
          )}

          { ! isPlaying && ! isGameOver && (
            <GameMessage title="Snake game" btnClick={this.startGame} btnText="play" />
          )}
        </Area>
      </Fragment>
    )
  }
}

export default PlayingArea