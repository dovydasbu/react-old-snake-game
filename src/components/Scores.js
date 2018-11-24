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
  padding-right: 15px;
  
  ${props => props.isBlinking ? `
    animation: blinker 0.3333333s linear infinite;
  ` : ''}
`;

const TimeLeft = styled(Score)`
  padding-right: 0px;
  padding-left: 15px;
`;

export const Scores = ({ timeLeft, score, isTimeBlinking, isScoreBlinking }) => (
  <ScoresWrap>
    <TimeLeft isBlinking={isTimeBlinking}>{ timeLeft }</TimeLeft>
    <Score isBlinking={isScoreBlinking}>{ score }</Score>
  </ScoresWrap>
);

export default Scores