function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import styled from 'styled-components';
import GameTitle from './GameTitle';
import Button from './Button';
const Message = styled.div`
  z-index: 9;
`;
export const GameMessage = ({
  title,
  btnClick,
  btnText,
  ...rest
}) => /*#__PURE__*/React.createElement(Message, null, /*#__PURE__*/React.createElement(GameTitle, {
  title: title
}), btnClick && btnText && /*#__PURE__*/React.createElement(Button, _extends({
  onClick: btnClick,
  text: btnText
}, rest)));
export default GameMessage;