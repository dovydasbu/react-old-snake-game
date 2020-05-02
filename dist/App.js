import React, { Component } from 'react';
import styled from 'styled-components';
import Fullscreen from "react-full-screen";
import PlayingArea from './components/PlayingArea';
import Button from './components/Button';
import Sidebar from './components/Sidebar';
const GameWrap = styled.div`;
  height: inherit;
  min-height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
const FullscreenBtn = styled(Button)`
  background: #dfdfdf;
  margin: 0 auto;
  position: absolute;
  top: 20px;
  right: 20px;
  
  @media(max-width: 1900px) {
    display: none;
  }
`;
const HamburgerBtn = styled(Button)`
  background: #dfdfdf;
  margin: 0 auto;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 99;
  font-weight: 700;
  z-index: 999999;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false,
      isSidebarOpen: false
    };
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && this.state.isSidebarOpen) {
        this.toggleSidebar();
      }
    });
  }

  toggleFullScreen() {
    this.setState(prevState => ({
      isFullScreen: !prevState.isFullScreen
    }));
  }

  toggleSidebar() {
    this.setState(prevState => ({
      isSidebarOpen: !prevState.isSidebarOpen
    }));
  }

  render() {
    const {
      isSidebarOpen
    } = this.state;
    return /*#__PURE__*/React.createElement(GameWrap, null, /*#__PURE__*/React.createElement("div", null, isSidebarOpen ? /*#__PURE__*/React.createElement(HamburgerBtn, {
      onClick: this.toggleSidebar,
      text: "X",
      type: "hamburger"
    }) : /*#__PURE__*/React.createElement(HamburgerBtn, {
      onClick: this.toggleSidebar,
      text: "?",
      type: "hamburger"
    }), /*#__PURE__*/React.createElement(FullscreenBtn, {
      onClick: this.toggleFullScreen,
      text: "Fullscreen",
      type: "fullscreen"
    }), /*#__PURE__*/React.createElement(Sidebar, {
      isOpen: isSidebarOpen
    }), /*#__PURE__*/React.createElement(Fullscreen, {
      enabled: this.state.isFullScreen,
      onChange: isFullScreen => this.setState({
        isFullScreen
      })
    }, /*#__PURE__*/React.createElement(PlayingArea, null))));
  }

}

export default App;