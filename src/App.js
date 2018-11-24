import React, { Component } from 'react'
import styled from 'styled-components'
import Fullscreen from "react-full-screen";
import PlayingArea from './components/PlayingArea'
import Button from './components/Button'

const GameWrap = styled.div`;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFullScreen: false,
    };

    this.toggleFullScreen = this.toggleFullScreen.bind(this);
  }

  toggleFullScreen() {
    this.setState({ isFullScreen: ! this.state.isFullScreen });
  }

  render() {
    return (
      <GameWrap>
        <div>
          <Button onClick={this.toggleFullScreen} text="Fullscreen" type="fullscreen" />

          <Fullscreen
            enabled={this.state.isFullScreen}
            onChange={isFullScreen => this.setState({isFullScreen})}
          >
            <PlayingArea/>
          </Fullscreen>
        </div>
      </GameWrap>
    )
  }
}

export default App