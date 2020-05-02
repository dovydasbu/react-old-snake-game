import React from 'react';
import styled from 'styled-components';
const SidebarWrap = styled.div`
  font-family: 'Joystix';
  position: absolute;
  left: -100%;
  top: 0;
  height: 100vh;
  width: 350px;
  background: #37dc65;
  box-shadow: 0 11px 70px rgba(0,0,0,0.515);
  border-right: 6px solid #24252a;
  z-index: 9;
  transition: left .2s;
  z-index: 99999;
  
  &.is-open {
    left: 0;
    transition: left .2s;
  }
`;
const Inner = styled.div`
  padding: 70px 20px 20px;
  
  @media(max-width: 1000px) {
    font-size: 20px;
  }
  
  @media(max-width: 710px) {
    font-size: 30px;
  }
`;
const ListStyled = styled.ul`
  ${props => props.hiddenOnPhone && `
    @media (hover: none) {
      display: none;
    }
  `}
`;

const Sidebar = ({
  isOpen
}) => /*#__PURE__*/React.createElement(SidebarWrap, {
  className: isOpen ? 'is-open' : ''
}, /*#__PURE__*/React.createElement(Inner, null, /*#__PURE__*/React.createElement("h2", null, "Controls"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "With arrow keys")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "w goes \u2191"), /*#__PURE__*/React.createElement("li", null, "d goes \u2192"), /*#__PURE__*/React.createElement("li", null, "s goes \u2193"), /*#__PURE__*/React.createElement("li", null, "a goes \u2190")), /*#__PURE__*/React.createElement(ListStyled, {
  hiddenOnPhone: true
}, /*#__PURE__*/React.createElement("li", null, "P for pause"))));

export default Sidebar;