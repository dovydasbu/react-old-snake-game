import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import playImg from '../assets/images/play.png';
import Snake from './Snake'

export const areaParams = {
  width: 800,
  height: 500
};

const Area = styled.div`
  border: 6px solid #24252a;
  width: ${areaParams.width}px;
  height: ${areaParams.height}px;
  position: relative;
  box-shadow: 0 11px 70px rgba(0, 0, 0, 0.15);
  
  ${ props => ! props.isPlaying ? `
    display: flex;
    justify-content: center;
    align-items: center;
  `: ''}
`;

const PlayButton = styled.div`
  background: url(${playImg}) no-repeat center center;
  background-size: cover;
  width: 100px;
  height: 100px;
  cursor: pointer;
`;

const GameOver = styled.div``;

const GameOverTitle = styled.h1`
  font-family: 'Joystix';
  margin: 0;
`;

const RestartTitle = styled.p`
  font-family: 'Joystix';
  margin: 10px 0 0;
  text-align: center;
  cursor: pointer;
`;

class PlayingArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      isGameOver: false,
    };

    this.startGame = this.startGame.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.restart = this.restart.bind(this);
  }

  startGame() {
    this.setState({ isPlaying: true });
  }

  gameOver() {
    this.setState({ isPlaying: false, isGameOver: true });
  }

  restart() {
    this.setState({ isPlaying: true, isGameOver: false });
  }

  render() {
    const { isPlaying, isGameOver } = this.state;

    return (
      <Area>
        {isPlaying && (
          <Fragment>
            <Snake onGameOver={this.gameOver} />
          </Fragment>
        )}

        {isGameOver && (
          <GameOver>
            <GameOverTitle>Game  over</GameOverTitle>
            <RestartTitle onClick={this.restart}>restart</RestartTitle>
          </GameOver>
        )}

        { ! isPlaying && ! isGameOver && (
          <PlayButton onClick={this.startGame} />
        )}
      </Area>
    )
  }
}

export default PlayingArea