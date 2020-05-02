import React from 'react';
import styled from 'styled-components';
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
export const Scores = ({
  timeLeft,
  score,
  isTimeBlinking,
  isScoreBlinking
}) => /*#__PURE__*/React.createElement(ScoresWrap, null, /*#__PURE__*/React.createElement(TimeLeft, {
  isBlinking: isTimeBlinking
}, timeLeft), /*#__PURE__*/React.createElement(Score, {
  isBlinking: isScoreBlinking
}, score));
export default Scores;