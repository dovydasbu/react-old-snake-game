import React, { Component, Fragment } from 'react';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowRight, faArrowDown, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getRandomWidth, getRandomHeight } from '../Random';
import Snake, { defaultSquares } from './Snake';
import Food from './Food';
import Scores from './Scores';
import GameMessage from './GameMessage';
import Button from "./Button";
export const areaParams = {
  width: 800,
  height: 500
};
const Area = styled.div`
  background: #37dc65;
  border: 6px solid #24252a;
  width: ${props => props.areaParams.width}px;
  height: ${props => props.areaParams.height}px;
  position: relative;
  box-shadow: 0 11px 70px rgba(0,0,0,0.515);
  margin: 0 auto;
  
  ${props => !props.isPlaying ? `
    display: flex;
    justify-content: center;
    align-items: center;
  ` : ''}
`;
const ButtonsWrap = styled.div`
  display: flex;
  z-index: 9999;
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const SnakeButton = styled(Button)`
  min-width: 25%;
  min-height: 70px;
  margin-top: 0;
  
  ${props => props.fullWidth && `
    width: 100%;
  `}
  
  ${props => props.mt && `
    margin-top: 20px;
  `}
  
  ${props => props.leftSide && `
    margin-right: 15px;
  `}
  
  ${props => props.rightSide && `
    margin-left: 15px;
  `}
`; // Time left before speed increase

export const defaultTimeLeft = 15;
export const defaultSnakeSpeed = 0.17;

class PlayingArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHamburgerActive: false,
      snakeSpeed: defaultSnakeSpeed,
      timeLeft: defaultTimeLeft,
      // Time left before speed increase
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
    this.setState(prevState => ({
      score: 0,
      timeLeft: prevState.timeLeft || defaultTimeLeft,
      snakeSpeed: defaultSnakeSpeed,
      isPlaying: true,
      isGameOver: false,
      isPause: false
    }));
  }

  pauseGame() {
    this.setState(prev => {
      if (!prev.isPause) {
        clearInterval(this.timeLeftInterval);
      } else {
        this.initTimeInterval();
      }

      return {
        isPause: prev.isPlaying && !prev.isGameOver ? !prev.isPause : prev.isPause
      };
    });
  }

  gameOver(squares) {
    clearInterval(this.timeLeftInterval);
    const coords = this.getFoodCoords(squares);
    this.setState(prev => ({
      isPlaying: false,
      isGameOver: true,
      isPause: false,
      foodPosition: squares !== undefined ? coords : prev.foodPosition
    }));
  }

  initTimeInterval() {
    this.timeLeftInterval = setInterval(() => this.updateTimeLeft(), 1000);
  }

  updateTimeLeft() {
    let {
      timeLeft,
      hasReachedMaxSpeed
    } = this.state;

    if (timeLeft === 0 && !hasReachedMaxSpeed) {
      // Update time and increase speed
      this.setState({
        isTimeBlinking: true
      });
      clearInterval(this.timeLeftInterval);

      if (!hasReachedMaxSpeed) {
        setTimeout(() => {
          let snakeSpeed = this.state.snakeSpeed;
          let timeLeft = defaultTimeLeft;

          if (snakeSpeed >= 0.12) {
            snakeSpeed -= 0.03;
          } else if (snakeSpeed >= 0.06) {
            snakeSpeed -= 0.01;
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
        }, 1000);
      }
    } else if (!hasReachedMaxSpeed) {
      this.setState({
        timeLeft: timeLeft - 1
      });
    }
  }

  eatFood(squares) {
    const coords = this.getFoodCoords(squares);
    this.setState(previous => ({
      foodPosition: Object.assign({}, coords),
      score: previous.score + 5
    }));
  }

  getFoodCoords(squares) {
    let resp = true;
    let coords = {
      x: 0,
      y: 0
    };

    do {
      coords = {
        x: getRandomWidth(),
        y: getRandomHeight()
      };
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
    const seconds = this.state.timeLeft; // Return parsed eternity sign

    if (seconds === -1) {
      return new DOMParser().parseFromString(`<!doctype html><body>&#8734;`, 'text/html').body.textContent;
    }

    return `${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  static triggerEvent(key) {
    const keyboardEvent = document.createEvent("KeyboardEvent");
    const initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
    keyboardEvent[initMethod]("keydown", // event type: keydown, keyup, keypress
    true, // bubbles
    true, // cancelable
    window, // view: should be window
    false, // ctrlKey
    false, // altKey
    false, // shiftKey
    false, // metaKey
    40, // keyCode: unsigned long - the virtual key code, else 0
    0 // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
    );
    Object.defineProperty(keyboardEvent, 'key', {
      get: () => {
        return key;
      }
    });
    document.dispatchEvent(keyboardEvent);
  }

  render() {
    const {
      score,
      snakeSpeed,
      isPlaying,
      isGameOver,
      isPause,
      isTimeBlinking,
      isScoreBlinking,
      foodPosition
    } = this.state;
    return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Scores, {
      score: score,
      timeLeft: this.getTimeLeft(),
      isTimeBlinking: isTimeBlinking,
      isScoreBlinking: isScoreBlinking
    }), /*#__PURE__*/React.createElement(Area, {
      areaParams: areaParams
    }, /*#__PURE__*/React.createElement(KeyHandler, {
      keyEventName: KEYPRESS,
      keyValue: "Enter",
      onKeyHandle: this.startGame
    }), /*#__PURE__*/React.createElement(KeyHandler, {
      keyEventName: KEYPRESS,
      keyValue: "Spacebar",
      onKeyHandle: this.startGame
    }), /*#__PURE__*/React.createElement(KeyHandler, {
      keyEventName: KEYPRESS,
      keyValue: " ",
      onKeyHandle: this.startGame
    }), /*#__PURE__*/React.createElement(KeyHandler, {
      keyEventName: KEYPRESS,
      keyValue: "p",
      onKeyHandle: this.pauseGame
    }), /*#__PURE__*/React.createElement(KeyHandler, {
      keyEventName: KEYPRESS,
      keyValue: "P",
      onKeyHandle: this.pauseGame
    }), isPlaying && /*#__PURE__*/React.createElement(Fragment, null, isPause && /*#__PURE__*/React.createElement(GameMessage, {
      title: "pause",
      btnClick: this.pauseGame,
      btnText: "resume"
    }), /*#__PURE__*/React.createElement(Food, foodPosition), /*#__PURE__*/React.createElement(Snake, {
      speed: snakeSpeed,
      isPause: isPause,
      onGameOver: this.gameOver,
      onFoodEaten: this.eatFood,
      foodPosition: foodPosition
    })), isGameOver && /*#__PURE__*/React.createElement(GameMessage, {
      title: "Game over",
      btnClick: this.startGame,
      btnText: "restart"
    }), !isPlaying && !isGameOver && /*#__PURE__*/React.createElement(GameMessage, {
      title: "Snake game",
      btnClick: this.startGame,
      btnText: "play"
    })), /*#__PURE__*/React.createElement(ButtonsWrap, null, /*#__PURE__*/React.createElement(SnakeButton, {
      leftSide: true,
      onClick: () => PlayingArea.triggerEvent('Left')
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faArrowLeft
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%'
      }
    }, /*#__PURE__*/React.createElement(SnakeButton, {
      fullWidth: true,
      onClick: () => PlayingArea.triggerEvent('Up')
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faArrowUp
    })), /*#__PURE__*/React.createElement(SnakeButton, {
      fullWidth: true,
      mt: true,
      onClick: () => PlayingArea.triggerEvent('Down')
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faArrowDown
    }))), /*#__PURE__*/React.createElement(SnakeButton, {
      rightSide: true,
      onClick: () => PlayingArea.triggerEvent('Right')
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faArrowRight
    }))));
  }

}

export default PlayingArea;