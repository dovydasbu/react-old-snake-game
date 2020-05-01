import React  from 'react'
import styled from 'styled-components'

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
`

const Inner = styled.div`
  padding: 70px 20px 20px;
  
  @media(max-width: 1000px) {
    font-size: 20px;
  }
  
  @media(max-width: 710px) {
    font-size: 30px;
  }
`

const ListStyled = styled.ul`
  ${props => props.hiddenOnPhone && `
    @media (hover: none) {
      display: none;
    }
  `}
`

const Sidebar = ({ isOpen }) => (
  <SidebarWrap className={isOpen ? 'is-open' : ''}>
    <Inner>
      <h2>Controls</h2>
      <ul>
        <li>With arrow keys</li>
      </ul>
      
      <ul>
        <li>w goes &uarr;</li>
        <li>d goes &rarr;</li>
        <li>s goes &darr;</li>
        <li>a goes &larr;</li>
      </ul>
      
      <ListStyled hiddenOnPhone>
        <li>P for pause</li>
      </ListStyled>
    </Inner>
  </SidebarWrap>
)

export default Sidebar