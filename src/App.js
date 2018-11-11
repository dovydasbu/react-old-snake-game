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

const Scores = styled.div`
  display:flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 6px solid #24252a;
`;

const Score = styled.div`
  font-family: 'Joystix';
  font-size: 40px;
  font-weight: 900;
  margin-bottom: 10px;
`;

const ScoreLeft = styled(Score)`
  padding-left: 15px;
`;

const ScoreRight = styled(Score)`
  padding-right: 15px;
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
            <Scores>
              <ScoreLeft>15</ScoreLeft>
              <ScoreRight>10</ScoreRight>
            </Scores>

            <PlayingArea/>
          </Fullscreen>
        </div>
      </GameWrap>
    )
  }
}

export default App