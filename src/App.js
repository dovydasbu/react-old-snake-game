import React, { Component } from 'react'
import styled from 'styled-components'
import PlayingArea from './components/PlayingArea'

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
  render() {
    return (
      <GameWrap>
        <div>
          <Scores>
            <ScoreLeft>15</ScoreLeft>
            <ScoreRight>10</ScoreRight>
          </Scores>

          <PlayingArea/>
        </div>
      </GameWrap>
    )
  }
}

export default App