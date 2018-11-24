import React from 'react'
import styled from 'styled-components'

const ScoresWrap = styled.div`
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

export const Scores = ({ timeLeft, score }) => (
  <ScoresWrap>
    <ScoreLeft>{ timeLeft }</ScoreLeft>
    <ScoreRight>{ score }</ScoreRight>
  </ScoresWrap>
);

export default Scores