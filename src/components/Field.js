import React, { Component } from 'react'
import styled from 'styled-components'

const FieldWrap = styled.div`
  width: 800px;
  height: 500px;
  position: relative;
`;

class Field extends Component {
  render() {
    return (
        <FieldWrap>
          <h1>let's play</h1>
        </FieldWrap>
    )
  }
}

export default Field