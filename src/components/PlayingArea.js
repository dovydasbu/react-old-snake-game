import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import playImg from '../assets/images/play.png';
import Field from './Field'

const Area = styled.div`
  border: 6px solid #24252a;
  width: 802px;
  height: 502px;

  ${ props => ! props.isPlaying ? `
    display: flex;
    justify-content: center;
    align-items: center;
  ` : ''}
`;

const PlayButton = styled.div`
  background: url(${playImg}) no-repeat center center;
  background-size: cover;
  width: 100px;
  height: 100px;
  cursor: pointer;
`;

class PlayingArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false
    };

    this.startPlay = this.startPlay.bind(this)
  }

  startPlay() {
    this.setState({ isPlaying: true });
  }

  render() {
    const { isPlaying } = this.state;

    return (
      <Area>
        {isPlaying ? (
          <Fragment>
            <Field/>
          </Fragment>
        ) : (
          <PlayButton onClick={this.startPlay} />
        )}
      </Area>
    )
  }
}

export default PlayingArea