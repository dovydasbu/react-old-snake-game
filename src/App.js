import React, { Component } from 'react'
import styled from 'styled-components'
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import Fullscreen from "react-full-screen";

import PlayingArea from './components/PlayingArea'
import Button from './components/Button'
import Sidebar from './components/Sidebar'

const GameWrap = styled.div`;
  height: inherit;
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
`

const HamburgerBtn = styled(Button)`
  background: #dfdfdf;
  margin: 0 auto;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 99;
  font-weight: 700;
`

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
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && this.state.isSidebarOpen) {
        this.toggleSidebar()
      }
    })
  }

  toggleFullScreen() {
    this.setState({ isFullScreen: ! this.state.isFullScreen });
  }

  toggleSidebar() {
    this.setState({ isSidebarOpen: ! this.state.isSidebarOpen });
  }

  render() {
    const { isSidebarOpen } = this.state
    
    return (
      <GameWrap>
        <div>
          <HamburgerBtn onClick={this.toggleSidebar} text="?" type="hamburger" />

          <FullscreenBtn onClick={this.toggleFullScreen} text="Fullscreen" type="fullscreen" />
          
          <Sidebar isOpen={isSidebarOpen}/>

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